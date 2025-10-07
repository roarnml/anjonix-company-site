import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { updateUserReputation, sendNotification } from "../services/userActivity.service";
import { REPUTATION_RULES } from "../utils/reputationRules";


const prisma = new PrismaClient();

/* ──────────────────────────────────────────────
   CREATE a forum post
────────────────────────────────────────────── */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, threadId, authorId, userId, organizationId, parentPostId } = req.body;

    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        threadId: Number(threadId),
        authorId: Number(authorId),
        userId: Number(userId),
        organizationId: organizationId ? Number(organizationId) : null,
        parentPostId: parentPostId ? Number(parentPostId) : null,
      },
      include: { thread: true, author: true, organization: true },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

/* ──────────────────────────────────────────────
   LIST all posts (you can later scope by thread or org)
────────────────────────────────────────────── */
export const listPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.forumPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        user: true,
        thread: true,
        organization: true,
        comments: true,
        replies: true,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error listing posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

/* ──────────────────────────────────────────────
   GET a single post with comments and replies
────────────────────────────────────────────── */
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.forumPost.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        user: true,
        thread: true,
        organization: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: "asc" },
        },
        replies: {
          include: { author: true, user: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!post) return res.status(404).json({ error: "Post not found." });
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

/* ──────────────────────────────────────────────
   UPDATE a forum post
────────────────────────────────────────────── */
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const post = await prisma.forumPost.update({
      where: { id: Number(id) },
      data,
    });

    res.json(post);
  } catch (error: any) {
    console.error("Error updating post:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(500).json({ error: "Failed to update post." });
  }
};

/* ──────────────────────────────────────────────
   DELETE a forum post
────────────────────────────────────────────── */
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.forumPost.delete({ where: { id: Number(id) } });
    res.json({ message: "Post deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(500).json({ error: "Failed to delete post." });
  }
};

/* ──────────────────────────────────────────────
   ADD a comment to a post
────────────────────────────────────────────── */
export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // postId
    const { content, userId } = req.body;

    const post = await prisma.forumPost.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ error: "Post not found." });

    const comment = await prisma.forumComment.create({
      data: {
        content,
        postId: Number(id),
        userId,
      },
      include: { user: true, post: true },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment." });
  }
};

/* ──────────────────────────────────────────────
   LIST comments for a post
────────────────────────────────────────────── */
export const listComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // postId

    const comments = await prisma.forumComment.findMany({
      where: { postId: Number(id) },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    });

    res.json(comments);
  } catch (error) {
    console.error("Error listing comments:", error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};

/* ──────────────────────────────────────────────
   DELETE a comment
────────────────────────────────────────────── */
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // commentId
        await prisma.forumComment.delete({ where: { id } });
        res.json({ message: "Comment deleted successfully." });
    } catch (error: any) {
        console.error("Error deleting comment:", error);
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Comment not found." });
        }
        res.status(500).json({ error: "Failed to delete comment." });
    }   
};

// Increment views when someone reads a post
export const incrementViewCount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.forumPost.update({
      where: { id: Number(id) },
      data: { views: { increment: 1 } },
    });

    res.json(post);
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res.status(500).json({ error: "Failed to increment views." });
  }
};

// Upvote a post
export const upvotePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.forumPost.update({
      where: { id: Number(id) },
      data: { upvotes: { increment: 1 } },
      include: { author: true },
    });

    // reward author
    await updateUserReputation(post.author.id, REPUTATION_RULES.UPVOTE_GAIN);

    // notify author
    await sendNotification({
      userId: post.author.id,
      type: "UPVOTE",
      message: `Your post "${post.title}" got an upvote!`,
      relatedPostId: post.id,
    });

    res.json({ message: "Post upvoted and author rewarded.", upvotes: post.upvotes });
  } catch (error) {
    console.error("Error upvoting post:", error);
    res.status(500).json({ error: "Failed to upvote post." });
  }
};



// Soft delete post
export const softDeletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.forumPost.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    res.json({ message: "Post soft-deleted.", post });
  } catch (error) {
    console.error("Error soft-deleting post:", error);
    res.status(500).json({ error: "Failed to soft-delete post." });
  }
};

// Soft delete comment
export const softDeleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await prisma.forumComment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    res.json({ message: "Comment soft-deleted.", comment });
  } catch (error) {
    console.error("Error soft-deleting comment:", error);
    res.status(500).json({ error: "Failed to soft-delete comment." });
  }
};

