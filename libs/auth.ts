import { compare, hash } from "bcryptjs";

export async function hashPassword(password: any) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
}
