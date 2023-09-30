import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const fundname = req.query.fundName;

    const db = client.db();
    const collection = db.collection("MutualFundMaster");
    const data = await collection.findOne({ search_id: fundname });

    var modal = {
      errorState:false,
      data:data
    }

    res.status(200).json(modal);
    client.close();
  }
}

export default handler;
