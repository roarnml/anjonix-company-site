import { Router } from "express";
import { createBooking, listBookings, getBooking, updateBooking, cancelBooking } from "../controllers/booking.controller";

const router = Router();

router.post("/", createBooking);
router.get("/", listBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.post("/:id/cancel", cancelBooking); // pragmatic route

export default router;
