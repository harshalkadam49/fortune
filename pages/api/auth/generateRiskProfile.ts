import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const model = data;
    const db = client.db();

    if (!model) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      var total = 0;
      total = total + model.reduce((a: any, v: any) => (a = a + v.score), 0);

      // balanced
      if (total >= 30 && total <= 60) {
        let newmodel = {
          userID: model[0].userID,
          entryTimeStamp: new Date(),
          riskprofile: "Balanced",
          score: total,
        };

        const result = await db
          .collection("UsersRiskProfile")
          .insertOne(newmodel);

        const UsersRiskProfileCollection = db.collection("UsersRiskProfile");

        const UsersRiskProfileData = await UsersRiskProfileCollection.findOne({
          userID: newmodel.userID,
        });

        res.status(200).json({
          message: "riskprofile generated",
          errorState: false,
          data: UsersRiskProfileData,
        });
      }

      // Modrate
      if (total >= 61 && total <= 90) {
        let newmodel = {
          userID: model[0].userID,
          entryTimeStamp: new Date(),
          riskprofile: "Modrate",
          score: total,
        };

        const result = await db
          .collection("UsersRiskProfile")
          .insertOne(newmodel);

        const UsersRiskProfileCollection = db.collection("UsersRiskProfile");

        const UsersRiskProfileData = await UsersRiskProfileCollection.findOne({
          userID: newmodel.userID,
        });

        res.status(200).json({
          message: "riskprofile generated",
          errorState: false,
          data: UsersRiskProfileData,
        });
      }

      // Aggressive
      if (total >= 91 && total <= 120) {
        let newmodel = {
          userID: model[0].userID,
          entryTimeStamp: new Date(),
          riskprofile: "Aggressive",
          score: total,
        };

        const result = await db
          .collection("UsersRiskProfile")
          .insertOne(newmodel);

        const UsersRiskProfileCollection = db.collection("UsersRiskProfile");

        const UsersRiskProfileData = await UsersRiskProfileCollection.findOne({
          userID: newmodel.userID,
        });

        res.status(200).json({
          message: "riskprofile generated",
          errorState: false,
          data: UsersRiskProfileData,
        });
      }

      client.close();
    }
  }
}

export default handler;
