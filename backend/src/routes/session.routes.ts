// for Admin's View only
import { Router } from "express";
import { listSessions, getSession, terminateSession, terminateAllSessions } from "../controllers/session.controller";

const router = Router();

// List all sessions (optional filters: userId, active)
router.get("/", listSessions);

// Get a specific session by ID
router.get("/:id", getSession);

// Terminate a specific session
router.post("/:id/terminate", terminateSession);

// Terminate all sessions for a given user
router.post("/terminate-all/:userId", terminateAllSessions);

export default router;
