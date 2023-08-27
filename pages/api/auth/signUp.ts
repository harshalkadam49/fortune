import { hashPassword } from "../../../libs/auth";
import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const {
      name,
      email,
      password,
      phonenumber,
      gender,
      isEmailVerified,
      isPhoneVerified,
    } = data;

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
        .collection("Users")
        .findOne({ phonenumber: phonenumber });

      if (existingEmail && existingMobile) {
        res.status(422).json({
          message: "user already exists",
          errorState: true,
        });
        client.close();
      } else {
        const hashedPassword = await hashPassword(password);
        const result = await db.collection("Users").insertOne({
          name: name,
          email: email,
          phonenumber: phonenumber,
          password: hashedPassword,
          gender: gender,
          isEmailVerified: isEmailVerified == null ? false : isEmailVerified,
          isPhoneVerified: isPhoneVerified == null ? false : isPhoneVerified,
        });

        res.status(200).json({
          message: "Registration Done",
          errorState: false,
          data: result,
        });

        
        client.close();
      }
    }
  }
}

export default handler;
