import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const symbol = req.query.symbol;
    const db = client.db();
    const collection = db.collection("EquityLivePrices");
    const data = await collection.findOne({ symbol: symbol });
    res.status(200).json(data);
    client.close();
  }
}

export default handler;
