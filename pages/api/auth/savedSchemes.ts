import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const userID = req.query.userID;
    const serachID = req.query.serachID;

    const db = client.db();
    const UserMFCartListsCollection = db.collection("UserMFCartLists");
    const isSavedToCart = await UserMFCartListsCollection.find({
      userID: userID,
      serachID: serachID,
    }).toArray();

    const UserMFWatchListsCollection = db.collection("UserMFWatchLists");
    const isSavedToWatchLists = await UserMFWatchListsCollection.find({
      userID: userID,
      serachID: serachID,
    }).toArray();

    let model = {
      isSavedToCart: isSavedToCart.length > 0 ? true : false,
      isSavedToWatchLists: isSavedToWatchLists.length > 0 ? true : false,
    };

    res.status(200).json(model);
    client.close();
  }
}

export default handler;
