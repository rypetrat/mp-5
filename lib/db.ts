import { MongoClient, MongoClientOptions } from 'mongodb';

// grab the enviroment variable from the .env file
const uri = process.env.MONGO_URI as string;
const options: MongoClientOptions = {};

// creates the MongoDB client and connects to the db
const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;