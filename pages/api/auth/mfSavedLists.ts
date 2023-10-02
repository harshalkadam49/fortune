import { connectToDataBase } from "../../../libs/db";
import { ObjectId } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const userID = req.query.userID;
    const db = client.db();
    const collection = db.collection("UserMFWatchLists");
    const data: any = await collection.find({ userID: userID }).toArray();

    const mfDetails = db.collection("MutualFundMaster");

    let mfDetailsArray: any = [];
    for (let i = 0; i < data.length; i++) {
      const mfDetailsData: any = await mfDetails.findOne({
        search_id: data[i].searchID,
      });
      mfDetailsArray.push({
        search_id: mfDetailsData.search_id,
        scheme_name: mfDetailsData.scheme_name,
        logo_url: mfDetailsData.logo_url,
        returns_3Y: mfDetailsData.stats[0].stat_3y,
      });
    }

    res.status(200).json(mfDetailsArray);
    client.close();
  }
}

export default handler;
