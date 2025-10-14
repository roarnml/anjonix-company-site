import { Router } from "express";
import multer from "multer";
import {
  uploadAttachment,
  listAttachments,
  getAttachment,
  deleteAttachment,
} from "../controllers/attachment.controller";

const router = Router();

// File upload middleware
const upload = multer({ storage: multer.memoryStorage() }); // memory storage for simplicity

// Create/upload attachment
router.post("/", upload.single("file"), uploadAttachment);

// List all attachments (optionally filter by owner)
router.get("/", listAttachments);

// Get a single attachment by ID
router.get("/:id", getAttachment);

// Delete an attachment
router.delete("/:id", deleteAttachment);

export default router;
