import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new organization
export const createOrg = async (req: Request, res: Response) => {
  try {
    const { name, allowedDomain, address, contactEmail, contactPhone, website, description } = req.body;

    const existing = await prisma.organization.findUnique({ where: { allowedDomain } });
    if (existing) return res.status(400).json({ error: "Organization with this domain already exists." });

    const org = await prisma.organization.create({
      data: { name, allowedDomain, address, contactEmail, contactPhone, website, description },
    });

    return res.status(201).json(org);
  } catch (error: any) {
    console.error("Create org error:", error);
    return res.status(500).json({ error: "Failed to create organization." });
  }
};

// List all organizations (excluding soft-deleted ones)
export const listOrgs = async (_req: Request, res: Response) => {
  try {
    const orgs = await prisma.organization.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return res.json(orgs);
  } catch (error) {
    console.error("List orgs error:", error);
    return res.status(500).json({ error: "Failed to fetch organizations." });
  }
};

// Get single organization
export const getOrg = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log("Fetching org with ID:", id);
    const org = await prisma.organization.findFirst({
      where: { id, deletedAt: null },
      include: {
        users: true,
        forumThreads: true,
        forumPosts: true,
        bookings: true,
      },
    });
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    if (!org) return res.status(404).json({ error: "Organization not found." });
    return res.json(org);
  } catch (error) {
    console.error("Get org error:", error);
    return res.status(500).json({ error: "Failed to fetch organization." });
  }
};

// Update organization
export const updateOrg = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const org = await prisma.organization.update({
      where: { id: Number(id) },
      data,
    });

    return res.json(org);
  } catch (error: any) {
    console.error("Update org error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Organization not found." });
    }
    return res.status(500).json({ error: "Failed to update organization." });
  }
};

// Soft delete (admin-level)
export const softDeleteOrg = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const org = await prisma.organization.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return res.json({ message: "Organization soft-deleted.", org });
  } catch (error) {
    console.error("Soft delete error:", error);
    return res.status(500).json({ error: "Failed to soft-delete organization." });
  }
};

// Hard delete (super-admin only)
export const deleteOrg = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.organization.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Organization permanently deleted." });
  } catch (error: any) {
    console.error("Hard delete error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Organization not found." });
    }
    return res.status(500).json({ error: "Failed to delete organization." });
  }
};
