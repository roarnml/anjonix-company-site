import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
}

export function generateVerificationToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}
