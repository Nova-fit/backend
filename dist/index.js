"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const app_1 = __importDefault(require("@/app"));
const env_1 = require("@/config/env");
(0, node_server_1.serve)({
    fetch: app_1.default.fetch,
    port: Number(env_1.config.PORT)
}, () => {
    console.log(`Server running on port ${env_1.config.PORT}`);
});
//# sourceMappingURL=index.js.map