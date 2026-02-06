"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_MACHINE_SERVICE = exports.KEY_USER_BRANCH_SERVICE = exports.KEY_BRANCH_SERVICE = exports.KEY_ORGANIZATION_SERVICE = exports.getService = void 0;
const KEY_ORGANIZATION_SERVICE = "organizationService";
exports.KEY_ORGANIZATION_SERVICE = KEY_ORGANIZATION_SERVICE;
const KEY_BRANCH_SERVICE = "branchService";
exports.KEY_BRANCH_SERVICE = KEY_BRANCH_SERVICE;
const KEY_USER_BRANCH_SERVICE = "userBranchService";
exports.KEY_USER_BRANCH_SERVICE = KEY_USER_BRANCH_SERVICE;
const KEY_MACHINE_SERVICE = "machineService";
exports.KEY_MACHINE_SERVICE = KEY_MACHINE_SERVICE;
const getService = (c, key) => {
    return c.get(key);
};
exports.getService = getService;
//# sourceMappingURL=getServices.js.map