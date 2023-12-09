import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const {
      userID,
      entryTimeStamp,
      stockname,
      price,
      quantity,
      type,
      searchID,
      symbol,
      logoUrl
    } = data;

    console.log(data);

    if (!data) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();

      const orderDetails = await db.collection("EquityOrders").insertOne({
        userID: userID,
        stockname: stockname,
        entryTimeStamp: entryTimeStamp,
        price: price,
        quantity: quantity,
        type: type,
        searchID: searchID,
        symbol:symbol,
        logoUrl:logoUrl
      });

      // add entry into investment table
      if (orderDetails) {
        const investmentDetails = await db
          .collection("UserEquityInvestements")
          .insertOne({
            userID: userID,
            searchID: searchID,
            orderID: orderDetails.insertedId,
            entryTimeStamp: entryTimeStamp,
            investedValue: price * quantity,
            isActiveInvestment: true,
            lastOrderPlacedOn: entryTimeStamp,
            LTP: price,
            perchasePrice: price,
            quantity: quantity,
            orderStatus: "Succefull",
            logoUrl:logoUrl,
            symbol:symbol
          });

        res.status(200).json({
          data: investmentDetails,
          message: "succesfull",
          errorState: false,
        });
      } else {
        res.status(200).json({
          data: "",
          message: "order cannot be placed",
          errorState: true,
        });
      }

      client.close();
    }
  }
}

export default handler;
