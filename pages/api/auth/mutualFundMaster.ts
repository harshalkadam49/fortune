import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const type = req.query.type;
    const fundname = req.query.fundName;

    const db = client.db();
    const collection = db.collection("MutualFundMaster");
    const data = await collection.find({}).toArray();
    const dataDetails = await collection
      .find({ fund_name: fundname })
      .toArray();

    let listData: any = [];
    for (let i = 0; i < data.length; i++) {
      listData.push({
        logoUrl: data[i].logo_url,
        fund_name: data[i].fund_name,
        risk: data[i].risk,
        return5y: data[i].return5y,
        groww_rating: data[i].groww_rating,
      });
    }

    if (type == "list") {
      res.status(200).json(listData);
    } else if (type == "details" && fundname != "") {
      res.status(200).json(dataDetails);
    }

    client.close();
  }
}

export default handler;
