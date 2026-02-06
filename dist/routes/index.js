"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const profile_routes_1 = __importDefault(require("./profile.routes"));
const organization_routes_1 = __importDefault(require("./organization.routes"));
const branch_routes_1 = __importDefault(require("./branch.routes"));
const user_branch_routes_1 = __importDefault(require("./user-branch.routes"));
const machine_routes_1 = __importDefault(require("./machine.routes"));
const router = new hono_1.Hono();
router.route("/auth", auth_routes_1.default);
router.route("/users", user_routes_1.default);
router.route("/profile", profile_routes_1.default);
router.route("/organizations", organization_routes_1.default);
router.route("/branches", branch_routes_1.default);
router.route("/user-branches", user_branch_routes_1.default);
router.route("/machines", machine_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map