import { Router } from "express";
import { createResource, listResources, getResource, updateResource, deleteResource, searchResources } from "../controllers/resource.controller";

const router = Router();

router.post("/", createResource);
router.get("/", listResources);
router.get("/search", searchResources);
router.get("/:id", getResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
