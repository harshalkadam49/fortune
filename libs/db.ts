import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://fortune:letsbuildfortune@fortune.alrip3a.mongodb.net/users?retryWrites=true&w=majority"
  );

  return client;
}

