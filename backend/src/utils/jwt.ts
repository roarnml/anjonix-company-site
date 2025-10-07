import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant";

export const generateToken = (userId: string, email: string, role: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ id: userId, email, role }, secret, { expiresIn: "7d" });
};

export function generateVerificationToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}
