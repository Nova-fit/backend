"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerMiddleware = void 0;
const services_1 = require("@/services");
const containerMiddleware = async (c, next) => {
    c.set("authService", new services_1.AuthServices());
    c.set("profileService", new services_1.ProfileService());
    c.set("organizationService", new services_1.OrganizationService());
    c.set("branchService", new services_1.BranchServiceImpl());
    c.set("userBranchService", new services_1.UserBranchServiceImpl());
    c.set("machineService", new services_1.MachineService());
    await next();
};
exports.containerMiddleware = containerMiddleware;
//# sourceMappingURL=di.js.map