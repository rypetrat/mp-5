import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // destructure the originalUrl and alias from the request JSON body
    const { originalUrl, alias } = await req.json();
    
    // check if the original URL and alias are valid or not
    if (!originalUrl || !alias) {
      return NextResponse.json({ message: 'Original URL and alias are required.' }, { status: 400 });
    }

    // checks if the original URL is valid using regex
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i'
    );
    if (!urlPattern.test(originalUrl)) {
      return NextResponse.json({ message: 'Invalid URL.' }, { status: 400 });
    }

    // connect to the MongoDB database and grab the URL-Shortener-Db database and URL-Shortener-Collection collection
    const client = await clientPromise;
    const db = client.db('URL-Shortener-Db'); 
    const collection = db.collection('URL-Shortener-Collection');

    // check if the alias already exists in the collection
    const exists = await collection.findOne({ alias });
    if (exists) {
      return NextResponse.json({ message: 'Alias already taken.' }, { status: 400 });
    }

    // insert the original URL and alias into the collection
    await collection.insertOne({ alias, originalUrl });

    // return a success message
    return NextResponse.json({ message: 'URL shortened successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}