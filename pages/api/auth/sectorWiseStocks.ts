import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const sectorName = req.query.sectorName;

    const db = client.db();
    const collection = db.collection("IndianEquityDetails");
    const data = await collection.findOne({
      "header.industryName": "Oil, Gas & Fuels",
    });

    var modal = {
      errorState: false,
      data: data,
    };

    res.status(200).json(modal);
    client.close();
  }
}

export default handler;
