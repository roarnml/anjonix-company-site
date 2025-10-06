import { Router } from "express";
import { 
  logActivity, listActivities, getUserActivity, getActivityById,
  deleteActivity, clearActivities, searchActivities,
  getOrgActivity, getAllActivity
} from "../controllers/activity.controller";
import { authenticateToken, requireRole } from "../middleware/auth";

const router = Router();

// ✅ Basic user activity
router.get("/user/:userId", authenticateToken, getUserActivity);
router.post("/", authenticateToken, logActivity);

// ✅ Admin-only full system view
router.get("/all", authenticateToken, requireRole("ADMIN"), getAllActivity);
router.delete("/clear", authenticateToken, requireRole("ADMIN"), clearActivities);

// ✅ Org activity - org manager or admin
router.get("/org/:orgId", authenticateToken, requireRole("ORG_MANAGER", "ADMIN"), getOrgActivity);

// ✅ General
router.get("/", authenticateToken, listActivities);
router.get("/search", authenticateToken, searchActivities);
router.get("/:id", authenticateToken, getActivityById);
router.delete("/:id", authenticateToken, requireRole("ADMIN"), deleteActivity);

export default router;
