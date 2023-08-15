import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const {
      userid,
      investorid,
      portfolioid,
      orderid,
      timestamp,
      stockname,
      price,
      quantity,
      type,
    } = data;

    if (!stockname || !price || !quantity || !type) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();

      const result = await db.collection("EquityOrders").insertOne({
        userid: 1,
        investorid: 1,
        portfolioid: 1,
        orderid: 1,
        stockname: stockname,
        timestamp: new Date(),
        price: price,
        quantity: quantity,
        type: type,
      });

      res.status(200).json({
        message: "succesfull",
        errorState: false,
      });
      client.close();
    }
  }
}

export default handler;
