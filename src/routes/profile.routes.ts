import profileController from "@/controllers/profile.controller";
import { authMiddleware } from "@/middleware/auth.middlewre";
import { Hono } from "hono";

const profile = new Hono();

profile.use("*", authMiddleware);

profile
  .get("/", profileController.getProfile)
  .post("/", profileController.saveProfile)
  .put("/", profileController.updateProfile)
  .delete("/", profileController.deleteProfile);

export default profile;
