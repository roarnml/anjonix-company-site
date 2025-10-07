import { Router } from "express";
import prisma from "../../prisma/client";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});

router.patch("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });
    res.json(notif);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read." });
  }
});

export default router;
