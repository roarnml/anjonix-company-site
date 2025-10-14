import { Request, Response } from "express";
import prisma from "../../prisma/client";
import slugify from "slugify";

// --------------------- CORE CRUD ---------------------

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, visibility, ownerId, collaborators } = req.body;
    if (!title || !ownerId) return res.status(400).json({ error: "title and ownerId required" });

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) return res.status(400).json({ error: "Course with this title already exists" });

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        visibility,
        ownerId,
        collaborators: collaborators ? JSON.stringify(collaborators) : undefined,
      },
    });

    // Log the creation
    await prisma.activityLog.create({
      data: {
        userId: ownerId,
        action: "CREATE_COURSE",
        targetType: "Course",
        targetId: course.id,
        metadata: { title },
      },
    });

    return res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while creating course" });
  }
};

export const listCourses = async (req: Request, res: Response) => {
  try {
    const { orgId, q } = req.query;
    const where: any = {};
    if (orgId) where.organizationId = Number(orgId);
    if (q) where.title = { contains: String(q), mode: "insensitive" };

    const courses = await prisma.course.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, email: true } },
        courseRoles: true,
        //organization: true,
      },
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to list courses" });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        courseRoles: true,
        resources: true,
        forumThreads: true,
        bookings: true,
        assessment: true,
       // organization: true,
      },
    });

    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch {
    res.status(500).json({ error: "Error fetching course" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, visibility } = req.body;

    const updated = await prisma.course.update({
      where: { id },
      data: { title, description, visibility },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.body.userId,
        action: "UPDATE_COURSE",
        targetType: "Course",
        targetId: id,
        metadata: { title },
      },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.course.delete({ where: { id } });
    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting course" });
  }
};

// --------------------- RELATIONAL ROUTES ---------------------

export const listCourseResources = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const resources = await prisma.resource.findMany({
      where: { courseId: id },
      include: { uploader: { select: { id: true, name: true, email: true } } },
    });
    res.json(resources);
  } catch {
    res.status(500).json({ error: "Error fetching resources" });
  }
};

export const listCourseBookings = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const bookings = await prisma.booking.findMany({
      where: { courseId: id },
      include: {
        student: { select: { id: true, name: true } },
        instructor: { select: { id: true, name: true } },
      },
    });
    res.json(bookings);
  } catch {
    res.status(500).json({ error: "Error fetching bookings" });
  }
};

export const listCourseAssessments = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const assessments = await prisma.assessmentRecord.findMany({
      where: { courseId: id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(assessments);
  } catch {
    res.status(500).json({ error: "Error fetching assessments" });
  }
};

export const listCourseForumThreads = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const threads = await prisma.forumThread.findMany({
      where: { courseId: id },
      include: {
        author: { select: { id: true, name: true } },
        posts: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(threads);
  } catch {
    res.status(500).json({ error: "Error fetching forum threads" });
  }
};

export const listCourseLogs = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const logs = await prisma.activityLog.findMany({
      where: { targetType: "Course", targetId: id },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Error fetching logs" });
  }
};

export const listCourseAttachments = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const attachments = await prisma.attachment.findMany({
      where: { owner: { courses: { some: { id } } } },
    });
    res.json(attachments);
  } catch {
    res.status(500).json({ error: "Error fetching attachments" });
  }
};

// --------------------- ROLES & NOTIFICATIONS ---------------------

export const assignCollaborator = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const courseId = Number(req.params.id);

    const existing = await prisma.courseRole.findFirst({ where: { userId, courseId } });
    if (existing) return res.status(400).json({ error: "User already a collaborator" });

    const collaborator = await prisma.courseRole.create({
      data: { userId, courseId, role },
    });

    res.status(201).json(collaborator);
  } catch {
    res.status(500).json({ error: "Error assigning collaborator" });
  }
};

export const removeCollaborator = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    const userId = String(req.params.userId);

    await prisma.courseRole.deleteMany({ where: { courseId, userId } });
    res.json({ message: "Collaborator removed" });
  } catch {
    res.status(500).json({ error: "Error removing collaborator" });
  }
};

export const listCourseRoles = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const roles = await prisma.courseRole.findMany({
      where: { courseId: id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(roles);
  } catch {
    res.status(500).json({ error: "Error listing course roles" });
  }
};

export const sendCourseNotification = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    const { message, type } = req.body;

    const roles = await prisma.courseRole.findMany({
      where: { courseId },
      include: { user: true },
    });

    const notifications = await prisma.$transaction(
      roles.map((r) =>
        prisma.notification.create({
          data: {
            userId: r.userId,
            type: type || "COURSE_UPDATE",
            message,
            payload: { courseId },
          },
        })
      )
    );

    res.json({ message: "Notifications sent", count: notifications.length });
  } catch {
    res.status(500).json({ error: "Error sending notifications" });
  }
};
