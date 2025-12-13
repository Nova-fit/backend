import branchController from "@/controllers/branch.controller";
import { Hono } from "hono";

const branchRouter = new Hono();

branchRouter.get("/", branchController.findAll);
branchRouter.get("/:id", branchController.findById);
branchRouter.post("/", branchController.create);
branchRouter.put("/:id", branchController.update);
branchRouter.delete("/:id", branchController.remove);

// Schedule routes
branchRouter.post("/schedule", branchController.createSchedule);
branchRouter.get("/:id/schedule", branchController.getSchedule);
branchRouter.put("/schedule/:id", branchController.updateSchedule);
branchRouter.delete("/schedule/:id", branchController.deleteSchedule);

export default branchRouter;
