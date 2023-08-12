import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("IndianEquitySectors");
    const data = await collection.find({}).limit(10).toArray();
    res.status(200).json(data);
  }
}

export default handler;
