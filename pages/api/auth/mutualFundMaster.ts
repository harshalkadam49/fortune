import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("MutualFundMaster");
    const data = await collection.find({}).toArray();

    let listData: any = [];
    for (let i = 0; i < data.length; i++) {
      listData.push({
        logoUrl: data[i].logo_url,
        search_id: data[i].search_id,
        meta_title: data[i].meta_title,
        risk: data[i].risk,
        return3y: data[i].sip_return.return3y,
        groww_rating: data[i].groww_rating,
      });
    }

    res.status(200).json(listData);
    client.close();
  }
}

export default handler;
