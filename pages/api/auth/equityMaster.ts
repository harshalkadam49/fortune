import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const toLimit = req.query.toLimit;
    const toLimitNumber = parseInt(toLimit);

    const db = client.db();
    const collection = db.collection("IndianEquity");
    const data = await collection.find({}).limit(toLimitNumber).toArray();
    res.status(200).json(data);
    client.close();
  }
}

export default handler;
