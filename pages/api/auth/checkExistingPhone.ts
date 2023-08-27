import { hashPassword } from "../../../libs/auth";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { phonenumber } = data;

    if (!phonenumber) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();

      const existingPhonenumber = await db
        .collection("users")
        .findOne({ phonenumber: phonenumber });

      if (existingPhonenumber) {
        res.status(422).json({
          message: "Phone already exists",
          errorState: true,
        });
        client.close();
      } else {
        res.status(200).json({
          errorState: false,
        });
        client.close();
      }
    }
  }
}

export default handler;
