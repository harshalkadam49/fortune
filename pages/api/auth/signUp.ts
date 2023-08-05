import { hashPassword } from "../../../libs/auth";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { name, email, password, phonenumber, gender } = data;

    if (!name || !email || !password || !phonenumber || !gender) {
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

      const existingMobile = await db
        .collection("users")
        .findOne({ phonenumber: phonenumber });

      if (existingEmail && existingMobile) {
        res.status(422).json({
          message: "user already exists",
          errorState: true,
        });
        client.close();
      } else {
        const hashedPassword = await hashPassword(password);
        const result = await db.collection("users").insertOne({
          name: name,
          email: email,
          phonenumber: phonenumber,
          password: hashedPassword,
          gender: gender,
        });

        res.status(200).json({
          message: "succesfull",
          errorState: false,
        });
        client.close();
      }
    }
  }
}

export default handler;
