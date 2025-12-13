import { UserBranchServices } from "@/model";
import { getService, KEY_USER_BRANCH_SERVICE } from "@/utils/getServices";
import { Context } from "hono";

const getUserBranchService = (c: Context) =>
  getService<UserBranchServices>(c, KEY_USER_BRANCH_SERVICE);

const assign = async (c: Context) => {
  const { userId, branchId, roleId } = await c.req.json();
  const result = await getUserBranchService(c).assignUserToBranch(
    userId,
    branchId,
    roleId,
  );
  return c.json(result, 201);
};

const transfer = async (c: Context) => {
  const { userId, toBranchId, transferredBy, reason } = await c.req.json();
  const result = await getUserBranchService(c).transferUser(
    userId,
    toBranchId,
    transferredBy, // This might come from auth context in a real app
    reason,
  );
  return c.json(result, 201);
};

const getBranchUsers = async (c: Context) => {
  const branchId = parseInt(c.req.param("branchId"), 10);
  const result = await getUserBranchService(c).getBranchUsers(branchId);
  return c.json(result);
};

const getUserHistory = async (c: Context) => {
  const userId = c.req.param("userId");
  const result = await getUserBranchService(c).getUserHistory(userId);
  return c.json(result);
};

const getCurrentBranch = async (c: Context) => {
  const userId = c.req.param("userId");
  const result = await getUserBranchService(c).getCurrentBranch(userId);
  if (!result) return c.json({ message: "User has no active branch" }, 404);
  return c.json(result);
};

export default {
  assign,
  transfer,
  getBranchUsers,
  getUserHistory,
  getCurrentBranch,
};
