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

      const filter = { userID: userID, searchID: searchID };

      const result = await db.collection("UserMFCartLists").deleteOne(filter);

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