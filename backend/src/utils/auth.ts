// src/utils/auth.ts
import jwt from "jsonwebtoken";

/**
 * Normalize role to lowercase, consistent values
 */
export function normalizeRole(role: string): string {
  return role.trim().toLowerCase();
}

/**
 * Generate a short-lived verification token for email verification
 */
export function generateVerificationToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d", // 1 day validity
  });
}
