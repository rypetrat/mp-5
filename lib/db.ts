import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGO_URI as string;
const options: MongoClientOptions = {};

const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;