import { hashPassword } from "@/libs/auth";
import { connectToDataBase } from "@/libs/db";
import { hash } from "bcryptjs";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { phonenumber } = data;

    res.status(200).json({
      message: "otp sent succesfully",
      errorState: false,
      otp: 1970,
    });
    client.close();
  }
}

export default handler;
