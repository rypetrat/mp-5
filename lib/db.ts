import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGO_URI as string;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;