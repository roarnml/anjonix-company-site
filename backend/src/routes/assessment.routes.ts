import { Router } from "express";
import { createAssessment, submitAssessment, getAssessments, getAssessmentById, gradeAssessment } from "../controllers/assessment.controller";
import { authenticateToken } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validateBody } from "../middleware/validate";
import { auditLog } from "../middleware/audit";

const router = Router();

// Instructors/management create assessments
router.post(
  "/", 
  authenticateToken, 
  requireRole("instructor", "management"), 
  validateBody(["courseId", "title", "questions"]), 
  auditLog, 
  createAssessment
);

// Students submit
router.post(
  "/submit", 
  authenticateToken, 
  requireRole("student"), 
  validateBody(["assessmentId", "answers"]), 
  auditLog, 
  submitAssessment
);

// Anyone enrolled in course can fetch assessments
router.get("/", authenticateToken, getAssessments);
router.get("/:id", authenticateToken, getAssessmentById);

// Instructors/management grade
router.post(
  "/:id/grade", 
  authenticateToken, 
  requireRole("instructor", "management"), 
  validateBody(["marks"]), 
  auditLog, 
  gradeAssessment
);

export default router;
