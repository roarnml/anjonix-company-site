import { Router } from "express";
import {
  createThread,
  listThreads,
  getThread,
  updateThread,
  deleteThread,
} from "../controllers/forumThread.controller";
import { authorize } from "../middleware/authorize";
import { acceptAnswer } from "../controllers/forumThread.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authorize(["admin", "teacher", "moderator"]), createThread);
router.get("/", listThreads);
router.get("/:id", getThread);
router.put("/:id", authorize(["admin", "teacher", "moderator"]), updateThread);
router.delete("/:id", authorize(["admin", "superadmin"]), deleteThread);
router.patch(
  "/:threadId/accept/:postId",
  authorize(["admin", "teacher", "moderator"]),
  acceptAnswer
);
router.patch("/:threadId/accept/:postId", authMiddleware, acceptAnswer);


export default router;
