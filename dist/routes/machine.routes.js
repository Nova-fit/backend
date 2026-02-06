"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const machine_controller_1 = __importDefault(require("@/controllers/machine.controller"));
const machineRoutes = new hono_1.Hono();
machineRoutes.post("/", machine_controller_1.default.create);
machineRoutes.get("/", machine_controller_1.default.findAll);
machineRoutes.get("/:id", machine_controller_1.default.findById);
machineRoutes.put("/:id", machine_controller_1.default.update);
machineRoutes.delete("/:id", machine_controller_1.default.remove);
exports.default = machineRoutes;
//# sourceMappingURL=machine.routes.js.map