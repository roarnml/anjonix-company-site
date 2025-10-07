import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client"; // your Prisma client instance

// Extend Express Request to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

// Verify JWT and attach user info to req.user
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided or invalid format." });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("❌ Missing JWT_SECRET in environment variables.");
      return res.status(500).json({ error: "Internal configuration error." });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };

    // Fetch user from database to ensure they're still valid
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ error: "User not found or no longer active." });

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
