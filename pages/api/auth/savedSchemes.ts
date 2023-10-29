import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const userID = req.query.userID;
    const searchID = req.query.searchID;

    console.log(userID, searchID);

    const db = client.db();
    const UserMFCartListsCollection = db.collection("UserMFCartLists");
    const isSavedToCart = await UserMFCartListsCollection.find({
      $and: [{ userID: userID }, { searchID: searchID }],
    }).toArray();

    const UserMFWatchListsCollection = db.collection("UserMFWatchLists");
    const isSavedToWatchLists = await UserMFWatchListsCollection.find({
      $and: [{ userID: userID }, { searchID: searchID }],
    }).toArray();

    let model = {
      isSavedToCart: isSavedToCart,
      isSavedToWatchLists: isSavedToWatchLists,
    };

    res.status(200).json(model);
    client.close();
  }
}

export default handler;
