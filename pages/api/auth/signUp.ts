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
      });
      return;
    } else {
      const db = client.db();

      const existingUser = await db
        .collection("users")
        .findOne({ email: email, phonenumber: phonenumber });

      if (existingUser) {
        res.status(422).json({ message: "user already exists" });
        client.close();
      }
      const hashedPassword = await hashPassword(password);
      const result = await db.collection("users").insertOne({
        name: name,
        email: email,
        phonenumber: phonenumber,
        password: hashedPassword,
        gender: gender,
      });
      console.log(result);

      res.status(201).json({ message: "user created succesfully" });
      client.close();
    }
  }
}

export default handler;
