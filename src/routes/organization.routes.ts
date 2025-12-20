import organizationsController from "@/controllers/organization.controller";

import { authMiddleware } from "@/middleware/auth.middlewre";
import { Hono } from "hono";

const organization = new Hono();

organization.use("*", authMiddleware);

organization.get("/", organizationsController.getOrganization);
organization.post("/", organizationsController.createOrganization);
organization.put("/:id", organizationsController.updateOrganization);
organization.delete("/:id", organizationsController.deleteOrganization);

export default organization;
