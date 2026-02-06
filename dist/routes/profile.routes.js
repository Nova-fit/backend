"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_controller_1 = __importDefault(require("@/controllers/profile.controller"));
const auth_middlewre_1 = require("@/middleware/auth.middlewre");
const hono_1 = require("hono");
const profile = new hono_1.Hono();
profile.use("*", auth_middlewre_1.authMiddleware);
profile
    .get("/", profile_controller_1.default.getProfile)
    .post("/", profile_controller_1.default.saveProfile)
    .put("/", profile_controller_1.default.updateProfile)
    .delete("/", profile_controller_1.default.deleteProfile);
exports.default = profile;
//# sourceMappingURL=profile.routes.js.map