import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { BookingStatus } from "@prisma/client";

// ✅ Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { studentId, instructorId, courseId, slotStart, slotEnd, notes, organizationId } = req.body;

    if (!studentId || !instructorId || !courseId || !slotStart || !slotEnd || !organizationId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Validate student, instructor, and course
    const [student, instructor, course] = await Promise.all([
      prisma.user.findUnique({ where: { id: studentId } }),
      prisma.user.findUnique({ where: { id: instructorId } }),
      prisma.course.findUnique({ where: { id: courseId } }),
    ]);

    if (!student || !instructor || !course) {
      return res.status(404).json({ error: "Student, instructor, or course not found" });
    }

    // 2️⃣ Prevent double-booking conflicts
    const overlapping = await prisma.booking.findFirst({
      where: {
        instructorId,
        slotStart: { lt: new Date(slotEnd) },
        slotEnd: { gt: new Date(slotStart) },
        status: { in: ["requested", "accepted"] },
      },
    });

    if (overlapping) {
      return res.status(409).json({ error: "Time slot overlaps with another active booking" });
    }

    // 3️⃣ Create the booking
    const booking = await prisma.booking.create({
      data: {
        studentId,
        instructorId,
        courseId,
        organizationId,
        slotStart: new Date(slotStart),
        slotEnd: new Date(slotEnd),
        notes,
        status: BookingStatus.requested,
      },
      include: {
        student: { select: { id: true, email: true, name: true } },
        instructor: { select: { id: true, email: true, name: true } },
        course: { select: { id: true, title: true } },
      },
    });

    return res.status(201).json({
      message: "Booking request created successfully",
      booking,
    });
  } catch (err) {
    console.error("createBooking error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ List all bookings (with optional filters)
export const listBookings = async (req: Request, res: Response) => {
  try {
    const { studentId, instructorId, status } = req.query;

    const filters: any = {};
    if (studentId) filters.studentId = String(studentId);
    if (instructorId) filters.instructorId = String(instructorId);
    if (status) filters.status = status as BookingStatus;

    const bookings = await prisma.booking.findMany({
      where: filters,
      include: {
        student: { select: { id: true, email: true, name: true } },
        instructor: { select: { id: true, email: true, name: true } },
        course: { select: { id: true, title: true } },
        organization: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(bookings);
  } catch (err) {
    console.error("listBookings error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get booking by ID
export const getBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, email: true, name: true } },
        instructor: { select: { id: true, email: true, name: true } },
        course: { select: { id: true, title: true } },
        organization: { select: { id: true, name: true } },
      },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.json(booking);
  } catch (err) {
    console.error("getBooking error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update a booking (status, notes, time)
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { slotStart, slotEnd, status, notes } = req.body;

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Optional: Validate new slot overlap
    if (slotStart && slotEnd) {
      const overlapping = await prisma.booking.findFirst({
        where: {
          id: { not: id },
          instructorId: existing.instructorId,
          slotStart: { lt: new Date(slotEnd) },
          slotEnd: { gt: new Date(slotStart) },
          status: { in: ["requested", "accepted"] },
        },
      });
      if (overlapping) {
        return res.status(409).json({ error: "New time slot conflicts with another booking" });
      }
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        slotStart: slotStart ? new Date(slotStart) : undefined,
        slotEnd: slotEnd ? new Date(slotEnd) : undefined,
        status,
        notes,
      },
    });

    return res.json({ message: "Booking updated successfully", booking: updated });
  } catch (err) {
    console.error("updateBooking error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Cancel booking (soft cancel)
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (existing.status === "cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled" });
    }

    const cancelled = await prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.cancelled },
    });

    return res.json({ message: "Booking cancelled successfully", booking: cancelled });
  } catch (err) {
    console.error("cancelBooking error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
