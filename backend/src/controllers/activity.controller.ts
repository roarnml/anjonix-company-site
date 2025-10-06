import { Request, Response } from "express";
import prisma from "../../prisma/client";

// ✅ Create / log new activity
export async function logActivity(req: Request, res: Response) {
  try {
    const { userId, action, targetType, targetId, metadata } = req.body;

    if (!userId || !action || !targetType || !targetId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const activity = await prisma.activityLog.create({
      data: { userId, action, targetType, targetId, metadata },
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error("logActivity error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ List all activities (latest first)
export async function listActivities(_req: Request, res: Response) {
  try {
    const activities = await prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(activities);
  } catch (err) {
    console.error("listActivities error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Get activity for a specific user
export async function getUserActivity(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const activities = await prisma.activityLog.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(activities);
  } catch (err) {
    console.error("getUserActivity error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Get activity by ID
export async function getActivityById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const activity = await prisma.activityLog.findUnique({
      where: { id: Number(id) },
    });
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  } catch (err) {
    console.error("getActivityById error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Delete single activity
export async function deleteActivity(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.activityLog.delete({ where: { id: Number(id) } });
    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("deleteActivity error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Clear all activities
export async function clearActivities(_req: Request, res: Response) {
  try {
    await prisma.activityLog.deleteMany({});
    res.json({ message: "All activities cleared" });
  } catch (err) {
    console.error("clearActivities error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Search activities by action or metadata
export async function searchActivities(req: Request, res: Response) {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const activities = await prisma.activityLog.findMany({
      where: {
        OR: [
          { action: { contains: query, mode: "insensitive" } },
          // metadata is JSON, you can only filter if it’s stored as stringifiable fields
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(activities);
  } catch (err) {
    console.error("searchActivities error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Org-wide activity (if ActivityLog has orgId field, else drop this)
export async function getOrgActivity(req: Request, res: Response) {
  try {
    const { orgId } = req.params;

    const activities = await prisma.activityLog.findMany({
      where: { targetType: "Organization", targetId: Number(orgId) },
      orderBy: { createdAt: "desc" },
    });

    res.json({ orgId, activities });
  } catch (err) {
    console.error("getOrgActivity error", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Admin view: all activities
export async function getAllActivity(_req: Request, res: Response) {
  try {
    const activities = await prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    res.json({ activities });
  } catch (err) {
    console.error("getAllActivity error", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
