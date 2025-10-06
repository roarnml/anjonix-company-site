import { Request, Response } from "express";
import prisma from "../../prisma/client";

// ✅ List all users (admin view)
export async function listUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        verified: true,
        blocked: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(users);
  } catch (err) {
    console.error("listUsers error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Get one user by ID
export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } }); // id is UUID string now
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("getUser error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Block user
export async function blockUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id },
      data: { blocked: true },
    });

    res.json({ message: `User ${user.email} blocked` });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "User not found" });
    console.error("blockUser error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Unblock user
export async function unblockUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id },
      data: { blocked: false },
    });

    res.json({ message: `User ${user.email} unblocked` });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "User not found" });
    console.error("unblockUser error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Dashboard stats
export async function getStats(req: Request, res: Response) {
  try {
    const [userCount, orgCount] = await Promise.all([
      prisma.user.count(),
      prisma.organization.count(),
    ]);

    res.json({ userCount, orgCount });
  } catch (err) {
    console.error("getStats error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
