import { ObjectId } from "mongodb";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { userID, searchID } = data;

    if (!userID || !searchID) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();

      const result = await db.collection("UserMFCartLists").insertOne({
        userID: userID,
        searchID: searchID,
        entryTimeStamp: new Date(),
      });

      res.status(200).json({
        data: result,
        message: "succesfull",
        errorState: false,
      });

      client.close();
    }
  }
}

export default handler;
