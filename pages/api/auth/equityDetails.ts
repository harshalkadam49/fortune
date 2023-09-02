import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const CompanyName = req.query.CompanyName;

    const db = client.db();
    const collection = db.collection("IndianEquity");
    const usersCollection = db.collection("Users");

    const data = await collection.findOne({ CompanyName: CompanyName });
    res.status(200).json({
      errorState: false,
      data: data,
    });
    client.close();
  }
}

export default handler;
