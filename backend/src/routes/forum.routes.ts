import { Router } from "express";
import { createPost, listPosts, getPost, updatePost, deletePost, addComment, listComments } from "../controllers/forum.controller";
import { upvotePost, incrementViewCount } from "../controllers/forum.controller";
import { softDeletePost, softDeleteComment } from "../controllers/forum.controller";
import { authorize } from "../middleware/authorize";

const router = Router();

// Posts
router.post("/", createPost);
router.get("/", listPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Comments (nested under post)
router.post("/:id/comments", addComment);
router.get("/:id/comments", listComments);

// Future routes for replies, upvotes, views can be added here
router.patch("/:id/view", incrementViewCount);
router.patch("/:id/upvote", upvotePost);

// Additional routes for comment management can be added here
router.patch("/:id/soft-delete", authorize(["admin", "moderator"]), softDeletePost);
router.patch("/comments/:id/soft-delete", authorize(["admin", "moderator"]), softDeleteComment);


export default router;
