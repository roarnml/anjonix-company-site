import { Request, Response } from "express";
import prisma from "../../prisma/client";

// ✅ List all sessions (with filters)
export const listSessions = async (req: Request, res: Response) => {
  try {
    const { userId, active } = req.query;
    const filters: any = {};

    if (userId) filters.userId = String(userId);
    if (active !== undefined) filters.isActive = active === "true";

    const sessions = await prisma.session.findMany({
      where: filters,
      include: {
        user: { select: { id: true, email: true, role: true, orgName: true } },
      },
      orderBy: { lastActive: "desc" },
    });

    return res.json(sessions);
  } catch (err) {
    console.error("listSessions error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get a single session by ID
export const getSession = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, role: true } },
      },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json(session);
  } catch (err) {
    console.error("getSession error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Terminate a single session (soft end)
export const terminateSession = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.session.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (!existing.isActive) {
      return res.status(400).json({ error: "Session already inactive" });
    }

    const updated = await prisma.session.update({
      where: { id },
      data: { isActive: false },
    });

    return res.json({ message: "Session terminated", session: updated });
  } catch (err) {
    console.error("terminateSession error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Terminate all sessions for a user (logout everywhere)
export const terminateAllSessions = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);

    const result = await prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    return res.json({ message: "All sessions terminated", count: result.count });
  } catch (err) {
    console.error("terminateAllSessions error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
