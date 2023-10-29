import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("IndianEquityTopLosersNew");
    const data = await collection.find({}).toArray();

    let model: any = [];
    for (let i = 0; i < data.length; i++) {
      model.push({
        companyName: data[i].company.companyName,
        searchId: data[i].company.searchId,
        logoUrl: data[i].company.logoUrl,
        ltp: data[i].stats.ltp,
        dayChange: data[i].stats.dayChange,
        dayChangePerc: data[i].stats.dayChangePerc,
      });
    }

    res.status(200).json(model);
    client.close();
  }
}

export default handler;
