// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10, // max 10 attempts per IP
  message: { error: "Too many login attempts. Try again later." },
});
