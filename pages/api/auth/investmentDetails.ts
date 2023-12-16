import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const userID = req.query.userID;

    const db = client.db();
    const UserEquityInvestements = db.collection("UserEquityInvestements");

    //  returns all the equity investments of the user
    const allEquityInvestments = await UserEquityInvestements.find({
      userID: userID,
    }).toArray();

    if (allEquityInvestments) {
      //  sum of invested value
      var sumOfInvestedValue = 0;
      sumOfInvestedValue =
        sumOfInvestedValue +
        allEquityInvestments.reduce(
          (a: any, v: any) => (a = a + v.investedValue),
          0
        );

      // array of invested schemes
      var investedSchemeIDs = [];
      for (let i = 0; i < allEquityInvestments.length; i++) {
        investedSchemeIDs.push(allEquityInvestments[i].symbol);
      }

      //  get live price from master table
      const EquityLivePrices = db.collection("EquityLivePrices");

      const investedSchemeLiveData = await EquityLivePrices.find({
        symbol: { $in: investedSchemeIDs },
      }).toArray();

      let investedSchemeWithLiveData = [...allEquityInvestments];
      let test: any = [];

      for (let i = 0; i < allEquityInvestments.length; i++) {
        const symbolToUpdate = allEquityInvestments[i].symbol;
        const priceToUpdateObject: any = await EquityLivePrices.findOne({
          symbol: symbolToUpdate,
        });

        const priceToUpdate = priceToUpdateObject.ltp;

        const updatedDocument = await UserEquityInvestements.findOneAndUpdate(
          { symbol: symbolToUpdate },
          { $set: { LTP: priceToUpdate } },
          { returnDocument: "after" }
        );
      }

      let avg: any = [];
      // check if investment exists and give avg
      for (let i = 0; i < allEquityInvestments.length; i++) {
        avg.push({
          key: allEquityInvestments[i].symbol,
          value: allEquityInvestments[i].perchasePrice,
        });
      }

      const sums: any = {};

      allEquityInvestments.forEach((entry: any) => {
        const key = entry.symbol
        const value = entry.perchasePrice
        if (!sums[key]) {
          sums[key] = value;
        } else {
          sums[key] += value/sums[key];
        }
      });

      var sumCurrentvalue = 0;
      sumCurrentvalue =
        sumCurrentvalue +
        investedSchemeWithLiveData.reduce(
          (a: any, v: any) => (a = a + v.LTP * v.quantity),
          0
        );

      // total returns
      var totalReturns = sumCurrentvalue - sumOfInvestedValue;
      var totalReturnsPer = (totalReturns / sumOfInvestedValue) * 100;

      let model = {
        investedValue: sumOfInvestedValue,
        currentvalue: sumCurrentvalue,
        totalReturns: totalReturns,
        totalReturnsPer: totalReturnsPer,
        investedSchemeWithLiveData: investedSchemeWithLiveData,
        allEquityInvestments: allEquityInvestments,
        sums: sums,
      };

      res.status(200).json({
        message: "succesfull",
        errorState: false,
        data: model,
      });
    } else {
      res.status(200).json({
        message: "succesfull",
        errorState: false,
      });
    }

    client.close();
  }
}

export default handler;
