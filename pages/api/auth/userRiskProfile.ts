import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const userID = req.query.userID;
    const db = client.db();
    const collection = db.collection("UsersRiskProfile");
    const data = await await collection
      .find({ userID: userID })
      .sort({ entryTimeStamp: -1 })
      .limit(1)
      .toArray();
    res.status(200).json({
      errorState: false,
      data: data,
    });
    client.close();
  }
}

export default handler;
