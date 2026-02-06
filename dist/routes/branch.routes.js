"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const branch_controller_1 = __importDefault(require("@/controllers/branch.controller"));
const hono_1 = require("hono");
const branchRouter = new hono_1.Hono();
branchRouter.get("/", branch_controller_1.default.findAll);
branchRouter.get("/:id", branch_controller_1.default.findById);
branchRouter.post("/", branch_controller_1.default.create);
branchRouter.put("/:id", branch_controller_1.default.update);
branchRouter.delete("/:id", branch_controller_1.default.remove);
branchRouter.post("/schedule", branch_controller_1.default.createSchedule);
branchRouter.get("/:id/schedule", branch_controller_1.default.getSchedule);
branchRouter.put("/schedule/:id", branch_controller_1.default.updateSchedule);
branchRouter.delete("/schedule/:id", branch_controller_1.default.deleteSchedule);
exports.default = branchRouter;
//# sourceMappingURL=branch.routes.js.map