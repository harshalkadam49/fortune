import { hashPassword } from "../../../libs/auth";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { email } = data;

    if (!email) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();

      const existingEmail = await db
        .collection("users")
        .findOne({ email: email });

      if (existingEmail) {
        res.status(422).json({
          message: "Email already exists",
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
