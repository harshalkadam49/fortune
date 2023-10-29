import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("IndianEquityDetails");
    const data: any = await collection.find({}).toArray();

    let model: any = [];
    for (let i = 0; i < data.length; i++) {
      model.push(data[i].header);
    }
    res.status(200).json(model);
    client.close();
  }
}

export default handler;
