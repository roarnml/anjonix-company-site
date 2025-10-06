import { Router } from "express";
import { createPost, listPosts, getPost, updatePost, deletePost, addComment, listComments } from "../controllers/forum.controller";

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

export default router;
