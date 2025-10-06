// routes/organization.routes.ts
import { Router } from "express";
import { createOrg, listOrgs, getOrg, updateOrg, deleteOrg } from "../controllers/organization.controller";

const router = Router();

router.post("/", createOrg);
router.get("/", listOrgs);
router.get("/:id", getOrg);
router.put("/:id", updateOrg);
router.delete("/:id", deleteOrg);

export default router;
