"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_branch_controller_1 = __importDefault(require("@/controllers/user-branch.controller"));
const hono_1 = require("hono");
const userBranchRouter = new hono_1.Hono();
userBranchRouter.post("/assign", user_branch_controller_1.default.assign);
userBranchRouter.post("/transfer", user_branch_controller_1.default.transfer);
userBranchRouter.get("/branch/:branchId", user_branch_controller_1.default.getBranchUsers);
userBranchRouter.get("/user/:userId/history", user_branch_controller_1.default.getUserHistory);
userBranchRouter.get("/user/:userId/current", user_branch_controller_1.default.getCurrentBranch);
exports.default = userBranchRouter;
//# sourceMappingURL=user-branch.routes.js.map