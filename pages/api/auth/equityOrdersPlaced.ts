import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";


async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const id = req.query.id;

    const db = client.db();
    const collection = db.collection("EquityOrders");
    const data = await collection.find({ userID: id }).toArray();
    res.status(200).json(data);
    client.close();
  }
}

export default handler;
