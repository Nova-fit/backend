import branchController from "@/controllers/branch.controller";
import { Hono } from "hono";

const branchRouter = new Hono();

branchRouter.get("/", branchController.findAll);
branchRouter.get("/:id", branchController.findById);
branchRouter.post("/", branchController.create);
branchRouter.put("/:id", branchController.update);
branchRouter.delete("/:id", branchController.remove);

export default branchRouter;
