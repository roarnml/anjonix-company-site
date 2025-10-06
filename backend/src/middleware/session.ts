import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";

export async function sessionMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.headers['x-session-token'] as string;
  if (!token) return res.status(401).json({ error: "Missing session token" });

  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || !session.isActive) {
    return res.status(401).json({ error: "Invalid session" });
  }

  await prisma.session.update({
    where: { token },
    data: { lastActive: new Date() }
  });

  req.userId = session.userId;
  next();
}
