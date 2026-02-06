"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const auth_middlewre_1 = require("@/middleware/auth.middlewre");
const hono_1 = require("hono");
const user = new hono_1.Hono();
user.use('*', auth_middlewre_1.authMiddleware);
user.get('/me', user_controller_1.default.me);
exports.default = user;
//# sourceMappingURL=user.routes.js.map