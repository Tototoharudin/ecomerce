import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_DB Connection is not provided");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//To Export db and db.getCollection()
export const db = client.db("gc2w2");

export const getCollection = (collectionName: string) => {
  return db.collection(collectionName);
};
