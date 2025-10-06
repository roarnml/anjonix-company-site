import { Router } from "express";
import { listUsers, getUser, blockUser, unblockUser, getStats } from "../controllers/admin.controller";
import { authenticateToken } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { auditLog } from "../middleware/audit";

const router = Router();

router.use(authenticateToken, requireRole("ADMIN")); // applies to all

router.get("/users", listUsers);
router.get("/users/:id", getUser);
router.put("/users/:id/block", auditLog, blockUser);
router.put("/users/:id/unblock", auditLog, unblockUser);
router.get("/stats", getStats);

export default router;
