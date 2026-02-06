"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const auth_controller_1 = __importDefault(require("@/controllers/auth.controller"));
const zod_validator_1 = require("@hono/zod-validator");
const auth_validators_1 = require("@/middleware/auth.validators");
const auth = new hono_1.Hono();
auth.post("/register", (0, zod_validator_1.zValidator)("json", auth_validators_1.registerSchema), auth_controller_1.default.register)
    .post("/login", (0, zod_validator_1.zValidator)("json", auth_validators_1.loginSchema), auth_controller_1.default.login)
    .post("/logout", (0, zod_validator_1.zValidator)("json", auth_validators_1.refreshTokenSchema), auth_controller_1.default.logout)
    .post("/refresh", (0, zod_validator_1.zValidator)("json", auth_validators_1.refreshTokenSchema), auth_controller_1.default.refresh);
exports.default = auth;
//# sourceMappingURL=auth.routes.js.map