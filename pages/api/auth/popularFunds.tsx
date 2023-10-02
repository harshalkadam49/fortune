import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("MutualFundMaster");

    const data = await collection
      .find({ "stats.0.stat_1y": { $gt: 30 } }).limit(9)
      .toArray()
    let listData: any = [];
    for (let i = 0; i < data.length; i++) {
      listData.push({
        search_id: data[i].search_id,
        scheme_name: data[i].scheme_name,
        logo_url: data[i].logo_url,
        returns_1Y: data[i].stats[0].stat_1y,
      });
    }
    res.status(200).json(listData);
    client.close();
  }
}

export default handler;
