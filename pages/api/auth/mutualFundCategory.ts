import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const type = req.query.type;

    const db = client.db();
    const collection = db.collection("MutualFundMaster");

    //  sip with 500
    if (type == "SIP500") {
      const data = await collection.find({ min_sip_investment: 500 }).toArray();

      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    } else if (type == "ELSS") {
      const data = await collection.find({ sub_category: "ELSS" }).toArray();
      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    } else if (type == "Large Cap") {
      const data = await collection
        .find({ sub_category: "Large Cap" })
        .toArray();
      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    } else if (type == "Mid Cap") {
      const data = await collection.find({ sub_category: "Mid Cap" }).toArray();
      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    } else if (type == "Small Cap") {
      const data = await collection
        .find({ sub_category: "Small Cap" })
        .toArray();
      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    } else if (type == "High returns") {
      const data = await collection
        .find({ "stats.0.stat_1y": { $gt: 30 } })
        .toArray();
      let listData: any = [];
      for (let i = 0; i < data.length; i++) {
        listData.push({
          search_id: data[i].search_id,
          scheme_name: data[i].scheme_name,
          logo_url: data[i].logo_url,
          groww_rating: data[i].groww_rating,
        });
      }
      res.status(200).json(listData);
    }

    client.close();
  }
}

export default handler;
