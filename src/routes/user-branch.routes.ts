import userBranchController from "@/controllers/user-branch.controller";
import { Hono } from "hono";

const userBranchRouter = new Hono();

userBranchRouter.post("/assign", userBranchController.assign);
userBranchRouter.post("/transfer", userBranchController.transfer);
userBranchRouter.get("/branch/:branchId", userBranchController.getBranchUsers);
userBranchRouter.get("/user/:userId/history", userBranchController.getUserHistory);
userBranchRouter.get("/user/:userId/current", userBranchController.getCurrentBranch);

export default userBranchRouter;
