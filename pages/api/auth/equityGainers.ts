import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("IndianEquityTopGainers");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  }
}

export default handler;
