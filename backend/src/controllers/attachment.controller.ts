import { Request, Response } from "express";
import { prisma } from "../lib/prisma"; // assuming prisma is exported from lib/prisma
import { v4 as uuidv4 } from "uuid";

/**
 * Upload or create a new attachment
 */
export const uploadAttachment = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { ownerId } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required." });
    }

    // Simulated storage key (in production, upload to S3 or similar)
    const storageKey = `attachments/${uuidv4()}-${file.originalname}`;

    const attachment = await prisma.attachment.create({
      data: {
        ownerId,
        storageKey,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    res.status(201).json({
      message: "Attachment uploaded successfully.",
      data: attachment,
    });
  } catch (error) {
    console.error("Error uploading attachment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * List attachments (optionally filter by ownerId)
 */
export const listAttachments = async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.query;

    const attachments = await prisma.attachment.findMany({
      where: ownerId ? { ownerId: String(ownerId) } : undefined,
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(attachments);
  } catch (error) {
    console.error("Error fetching attachments:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get details of a specific attachment
 */
export const getAttachment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const attachment = await prisma.attachment.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found." });
    }

    res.status(200).json(attachment);
  } catch (error) {
    console.error("Error fetching attachment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Delete an attachment (also remove from storage if applicable)
 */
export const deleteAttachment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.attachment.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Attachment not found." });
    }

    // TODO: optionally remove file from storage provider here

    await prisma.attachment.delete({ where: { id } });

    res.status(200).json({ message: "Attachment deleted successfully." });
  } catch (error) {
    console.error("Error deleting attachment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
