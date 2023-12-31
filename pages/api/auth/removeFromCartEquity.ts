import { ObjectId } from "mongodb";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { userID, equityID } = data;

    if (!userID || !equityID) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();
      const filter = { _id: new ObjectId(userID) };
      const update: any = { $pull: { addToCartList: equityID } };
      const collection = db.collection("Users");

      const result = await collection.updateMany(filter, update);

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
