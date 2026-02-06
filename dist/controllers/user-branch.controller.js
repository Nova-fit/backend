"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getServices_1 = require("@/utils/getServices");
const getUserBranchService = (c) => (0, getServices_1.getService)(c, getServices_1.KEY_USER_BRANCH_SERVICE);
const assign = async (c) => {
    const { userId, branchId, roleId } = await c.req.json();
    const result = await getUserBranchService(c).assignUserToBranch(userId, branchId, roleId);
    return c.json(result, 201);
};
const transfer = async (c) => {
    const { userId, toBranchId, transferredBy, reason } = await c.req.json();
    const result = await getUserBranchService(c).transferUser(userId, toBranchId, transferredBy, reason);
    return c.json(result, 201);
};
const getBranchUsers = async (c) => {
    const branchId = parseInt(c.req.param("branchId"), 10);
    const result = await getUserBranchService(c).getBranchUsers(branchId);
    return c.json(result);
};
const getUserHistory = async (c) => {
    const userId = c.req.param("userId");
    const result = await getUserBranchService(c).getUserHistory(userId);
    return c.json(result);
};
const getCurrentBranch = async (c) => {
    const userId = c.req.param("userId");
    const result = await getUserBranchService(c).getCurrentBranch(userId);
    if (!result)
        return c.json({ message: "User has no active branch" }, 404);
    return c.json(result);
};
exports.default = {
    assign,
    transfer,
    getBranchUsers,
    getUserHistory,
    getCurrentBranch,
};
//# sourceMappingURL=user-branch.controller.js.map