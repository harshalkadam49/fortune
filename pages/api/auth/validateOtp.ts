import { hashPassword, verifyPassword } from "@/libs/auth";
import { connectToDataBase } from "@/libs/db";
import { compare, hash } from "bcryptjs";

async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectToDataBase();
    const { otp, encryptedOtp } = data;

    // const isValidPassword = await verifyPassword(otp, encryptedOtp);
    const hashedOtp: any = hash(`${otp}`, 12);
    const hashedEncryptedOtp: any = hash(`${encryptedOtp}`, 12);

    if (otp == encryptedOtp) {
      res.status(200).json({
        message: "otp verified",
        errorState: false,
      });
    } else {
      res.status(422).json({
        message: "not verified",
        errorState: true,
      });
    }
  }
}

export default handler;
