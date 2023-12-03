import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();
    const searchId = req.query.searchId;

    const db = client.db();
    const collection = db.collection("IndianEquityDetails");
    const usersCollection = db.collection("Users");

    const data: any = await collection.findOne({ "header.searchId": searchId });

    const model = {
      searchId: data.header.searchId,
      industryName: data.header.industryName,
      displayName: data.header.displayName,
      shortName: data.header.shortName,
      nseScriptCode: data.header.nseScriptCode,
      type: data.header.type,
      logoUrl: data.header.logoUrl,
      floatingShares: data.header.floatingShares,
      parentCompany: data.details.parentCompany,
      headquarters: data.details.headquarters,
      ceo: data.details.ceo,
      managingDirector: data.details.managingDirector,
      foundedYear: data.details.foundedYear,
      businessSummary: data.details.businessSummary,
      websiteUrl: data.details.websiteUrl,
      stats: data.stats,
      fundamentals: data.fundamentals,
      shareHoldingPattern: data.shareHoldingPattern,
      priceData: data.priceData,
      financialStatement: data.financialStatement,
      expertRating: data.expertRating,
    };

    const livePriceCollection = db.collection("EquityLivePrices");
    const livePriceData: any = await livePriceCollection.findOne({
      symbol: data.header.nseScriptCode,
    });

    let priceModel = {
      dayChange: livePriceData.dayChange,
      dayChangePerc: livePriceData.dayChangePerc,
      high: livePriceData.high,
      low: livePriceData.low,
      open: livePriceData.open,
      close: livePriceData.close,
      ltp: livePriceData.ltp,
      volume: livePriceData.volume,
      symbol: livePriceData.symbol,
    };

    res.status(200).json({
      errorState: false,
      data: model,
      livePriceData: priceModel,
    });
    client.close();
  }
}

export default handler;
