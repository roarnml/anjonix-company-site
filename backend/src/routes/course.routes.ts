import { Router } from "express";
import {
  createCourse,
  listCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  assignCollaborator,
  removeCollaborator,
  listCourseRoles,
  listCourseResources,
  listCourseBookings,
  listCourseAssessments,
  listCourseForumThreads,
  listCourseLogs,
  sendCourseNotification,
  listCourseAttachments
} from "../controllers/course.controller";

const router = Router();

// Core CRUD
router.post("/", createCourse);
router.get("/", listCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Course roles
router.get("/:id/roles", listCourseRoles);
router.post("/:id/collaborators", assignCollaborator);
router.delete("/:id/collaborators/:userId", removeCollaborator);

// Course contents
router.get("/:id/resources", listCourseResources);
router.get("/:id/bookings", listCourseBookings);
router.get("/:id/assessments", listCourseAssessments);
router.get("/:id/forum", listCourseForumThreads);
router.get("/:id/logs", listCourseLogs);
router.get("/:id/attachments", listCourseAttachments);

// Course-wide notifications
router.post("/:id/notify", sendCourseNotification);

export default router;
