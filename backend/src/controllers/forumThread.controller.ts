import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ────────────────────────────────
   CREATE a new thread
──────────────────────────────── */
export const createThread = async (req: Request, res: Response) => {
  try {
    const { courseId, authorId, title, content, tags, organizationId, userId } = req.body;

    const thread = await prisma.forumThread.create({
      data: {
        courseId: Number(courseId),
        authorId,
        title,
        content,
        tags,
        organizationId: Number(organizationId),
        userId,
      },
      include: { author: true, course: true, organization: true },
    });

    res.status(201).json(thread);
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error: "Failed to create thread." });
  }
};

/* ────────────────────────────────
   LIST all threads (filter by course/org)
──────────────────────────────── */
export const listThreads = async (req: Request, res: Response) => {
  try {
    const { courseId, organizationId } = req.query;

    const threads = await prisma.forumThread.findMany({
      where: {
        ...(courseId && { courseId: Number(courseId) }),
        ...(organizationId && { organizationId: Number(organizationId) }),
      },
      include: {
        author: true,
        course: true,
        organization: true,
        posts: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(threads);
  } catch (error) {
    console.error("Error listing threads:", error);
    res.status(500).json({ error: "Failed to fetch threads." });
  }
};

/* ────────────────────────────────
   GET a single thread
──────────────────────────────── */
export const getThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const thread = await prisma.forumThread.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        course: true,
        posts: {
          include: {
            author: true,
            user: true,
            comments: { include: { user: true } },
          },
        },
      },
    });

    if (!thread) return res.status(404).json({ error: "Thread not found." });
    res.json(thread);
  } catch (error) {
    console.error("Error getting thread:", error);
    res.status(500).json({ error: "Failed to fetch thread." });
  }
};

/* ────────────────────────────────
   UPDATE a thread
──────────────────────────────── */
export const updateThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const thread = await prisma.forumThread.update({
      where: { id: Number(id) },
      data,
    });

    res.json(thread);
  } catch (error: any) {
    console.error("Error updating thread:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Thread not found." });
    res.status(500).json({ error: "Failed to update thread." });
  }
};

/* ────────────────────────────────
   DELETE a thread (admin/mod only)
──────────────────────────────── */
export const deleteThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.forumThread.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Thread deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting thread:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Thread not found." });
    res.status(500).json({ error: "Failed to delete thread." });
  }
};

export const acceptAnswer = async (req: Request, res: Response) => {
  try {
    const { threadId, postId } = req.params;
    const userId = req.user?.id; // assumes auth middleware populates req.user

    // Validate inputs
    const thread = await prisma.forumThread.findUnique({
      where: { id: Number(threadId) },
      include: { author: true },
    });
    if (!thread) return res.status(404).json({ error: "Thread not found." });

    const post = await prisma.forumPost.findUnique({
      where: { id: Number(postId) },
      include: { author: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found." });

    // Authorization check — only thread author or admin can accept
    const isAdmin = req.user?.role === "admin";
    if (thread.authorId !== userId && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized to accept answer for this thread." });
    }

    // Update the thread
    const updatedThread = await prisma.forumThread.update({
      where: { id: Number(threadId) },
      data: { acceptedAnswerId: Number(postId) },
      include: { posts: true },
    });

    // Reward the post author
    if (post.authorId) {
      await updateUserReputation(post.authorId.toString(), REPUTATION_RULES.ACCEPTED_ANSWER);
    }

    // Notify the author of the accepted post
    await sendNotification({
      userId: post.authorId.toString(),
      type: "ANSWER_ACCEPTED",
      message: `Your answer in thread "${thread.title}" was accepted!`,
      relatedPostId: post.id,
      relatedThreadId: thread.id,
      relatedUserId: userId,
    });

    res.json({
      message: "Answer accepted, author rewarded and notified.",
      thread: updatedThread,
    });
  } catch (error: any) {
    console.error("Error accepting answer:", error);
    res.status(500).json({ error: "Failed to set accepted answer.", details: error.message });
  }
};