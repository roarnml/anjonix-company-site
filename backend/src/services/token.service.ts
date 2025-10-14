import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant";

export function createAccessToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
}

export function createRefreshToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
