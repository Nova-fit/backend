"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_controller_1 = __importDefault(require("@/controllers/organization.controller"));
const auth_middlewre_1 = require("@/middleware/auth.middlewre");
const hono_1 = require("hono");
const organization = new hono_1.Hono();
organization.use("*", auth_middlewre_1.authMiddleware);
organization.get("/", organization_controller_1.default.getOrganization);
organization.post("/", organization_controller_1.default.createOrganization);
organization.put("/:id", organization_controller_1.default.updateOrganization);
organization.delete("/:id", organization_controller_1.default.deleteOrganization);
exports.default = organization;
//# sourceMappingURL=organization.routes.js.map