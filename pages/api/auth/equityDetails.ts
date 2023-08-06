import { connectToDataBase } from "../../../libs/db";
const mongoose = require("mongoose");

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const data = await db.collection("IndianEquity").findOne({});

    res.status(200).json(data);
  }
}

export default handler;
