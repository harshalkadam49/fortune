import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method == "GET") {

      const client = await connectToDataBase();
      const id = req.query.id;
      const db = client.db();
      const collection = db.collection("Users");
      const data: any = await collection.findOne({ _id: new ObjectId(id) });
      const saveList: any = data.saveList;

      const idArray: any = [];
      for (let i = 0; i < saveList.length; i++) {
        idArray.push(new ObjectId(saveList[i]));
      }

      const equityCollection = db.collection("IndianEquity");
      const equityWatchListsData = await equityCollection
        .find({ _id: { $in: idArray } })
        .toArray();

      res.status(200).json({
        errorState: false,
        saveList: equityWatchListsData,
      });
      client.close();
    }
}

export default handler;
