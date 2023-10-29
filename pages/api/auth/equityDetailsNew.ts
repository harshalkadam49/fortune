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
    res.status(200).json({
      errorState: false,
      data: model,
    });
    client.close();
  }
}

export default handler;
