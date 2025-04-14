import { redirect } from 'next/navigation';
import clientPromise from '@/lib/db';

interface Params {
  alias: string;
}

export default async function AliasPage({ params }: { params: Promise<Params> }) {
  const { alias } = await params;
  let urlEntry;

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('URL-Shortener-Collection');

    urlEntry = await collection.findOne({ alias });
  } catch (error) {
    console.error('Error fetching URL:', error);
  }

  if (urlEntry && urlEntry.originalUrl) {
    redirect(urlEntry.originalUrl);
  } else {
    redirect('/');
  }
}