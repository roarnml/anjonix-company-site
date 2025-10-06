// middleware/audit.ts
import prisma from "../../prisma/client";
import { Request, Response, NextFunction } from "express";

export async function auditLog(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user) {
    await prisma.activity.create({
      data: {
        userId: user.id,
        action: `${req.method} ${req.originalUrl}`,
        metadata: JSON.stringify(req.body || {}),
      },
    });
  }
  next();
}


