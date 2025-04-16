import { redirect } from 'next/navigation';
import clientPromise from '@/lib/db';

// defines the structure of the params object that is passed to the AliasPage function
interface Params {
  alias: string;
}

export default async function AliasPage({ params }: { params: Promise<Params> }) {
  // destructure the alias from the params object
  const { alias } = await params;
  let urlEntry;

  try {
    // connect to the MongoDB database and grab the URL-Shortener-Db database and URL-Shortener-Collection collection
    const client = await clientPromise;
    const db = client.db('URL-Shortener-Db');
    const collection = db.collection('URL-Shortener-Collection');
    // find the URL entry in the collection that matches the alias
    urlEntry = await collection.findOne({ alias });
  } catch (error) {
    console.error('Error fetching URL:', error);
  }
  if (urlEntry && urlEntry.originalUrl) {
    // redirect to the original URL if it exists
    redirect(urlEntry.originalUrl);
  } else {
    redirect('/');
  }
}