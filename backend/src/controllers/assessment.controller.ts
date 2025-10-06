import { Request, Response } from "express";
import prisma from "../../prisma/client";

export async function createAssessment(req: Request, res: Response) {
  try {
    const { title, description, organizationId } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const assessment = await prisma.assessment.create({
      data: { title, description, organizationId },
    });

    res.status(201).json(assessment);
  } catch (err) {
    console.error("createAssessment error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listAssessments(req: Request, res: Response) {
  try {
    const assessments = await prisma.assessment.findMany();
    res.json(assessments);
  } catch (err) {
    console.error("listAssessments error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAssessment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const assessment = await prisma.assessment.findUnique({ where: { id } });
    if (!assessment) return res.status(404).json({ error: "Not found" });
    res.json(assessment);
  } catch (err) {
    console.error("getAssessment error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function submitAssessment(req: Request, res: Response) {
  try {
    const { assessmentId, userId, answers } = req.body;
    const submission = await prisma.submission.create({
      data: { assessmentId, userId, answers },
    });
    res.status(201).json(submission);
  } catch (err) {
    console.error("submitAssessment error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
