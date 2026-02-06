"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const error_middleware_1 = require("@/middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const di_1 = require("./di/di");
const app = new hono_1.Hono();
app.use((0, cors_1.cors)());
app.use("*", di_1.containerMiddleware);
app.use("*", error_middleware_1.errorMiddleware);
app.route("/", routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map