import { ObjectId } from "mongodb";
import { connectToDataBase } from "../../../libs/db";
import { verifyPassword } from "@/libs/auth";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { userName, password } = data;

    if (!userName || !password) {
      res.status(422).json({
        message: "invalid input entries",
        errorState: true,
      });
      return;
    } else {
      const db = client.db();
      const isUser: any = await db
        .collection("Users")
        .findOne({ email: userName });

      if (isUser) {
        const isValidPassword = await verifyPassword(password, isUser.password);
        if (isValidPassword) {
          res.status(200).json({
            data: isUser,
            message: "Login Succesfull",
            errorState: false,
          });
          client.close();
        } else {
          res.status(404).json({
            message: "Invalid Password",
            errorState: true,
          });
          client.close();
        }
      } else {
        res.status(404).json({
          message: "User not found",
          errorState: true,
        });
        client.close();
      }

      // if (isUser) {
      //   const isValidPassword = await verifyPassword(password, isUser.password);

      //   if (!isValidPassword) {
      //     client.close();
      //     throw new Error("Could not log you in");
      //   }

      //   res.status(200).json({
      //     data: isUser,
      //     message: "succesfull",
      //     errorState: false,
      //   });

      //   client.close();
      // }
    }
  }
}

export default handler;
