import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new resource
 */
export const createResource = async (req: Request, res: Response) => {
  try {
    const { title, description, type, url } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const resource = await prisma.resource.create({
      data: { 
        title,
        description,
        type,
        // You’ll also need to provide all required relations:
        // These are REQUIRED according to your model:
        // courseId, uploaderId, storageKey, mimeType, visibility
        courseId: req.body.courseId,
        uploaderId: req.body.uploaderId,
        storageKey: req.body.storageKey,
        mimeType: req.body.mimeType,
        visibility: req.body.visibility,
      },
    });

    res.status(201).json({
      message: "Resource created successfully",
      data: resource,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create resource",
      error: error.message,
    });
  }
};


/**
 * Get all resources (optionally paginated)
 */
export const listResources = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req.query;

    const take = parseInt(limit as string);
    const skip = (parseInt(page as string) - 1) * take;

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.resource.count(),
    ]);

    res.status(200).json({
      message: "Resources fetched successfully",
      count: total,
      page: Number(page),
      totalPages: Math.ceil(total / take),
      data: resources,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch resources",
      error: error.message,
    });
  }
};

/**
 * Get a single resource by ID
 */
export const getResource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const resource = await prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({
      message: "Resource retrieved successfully",
      data: resource,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch resource",
      error: error.message,
    });
  }
};


/**
 * Update a resource
 */
export const updateResource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, type, previewUrl, visibility } = req.body;

    const existing = await prisma.resource.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const updated = await prisma.resource.update({
      where: { id },
      data: {
        title,
        description,
        type,
        previewUrl,
        visibility,
      },
    });

    res.status(200).json({
      message: "Resource updated successfully",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

/**
 * Delete a resource
 */
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.resource.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await prisma.resource.delete({ where: { id } });

    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};

/**
 * Search resources (by title or description)
 */
export const searchResources = async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";

    const results = await prisma.resource.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: "Search results",
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to search resources",
      error: error.message,
    });
  }
};
