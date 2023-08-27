import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const id = req.query.id;
    const db = client.db();
    const collection = db.collection("Users");
    const data = await collection.findOne({ _id: new ObjectId(id) });
    res.status(200).json({
      errorState: false,
      data: data,
    });
    client.close();
  }
}

export default handler;
