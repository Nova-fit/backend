import { Branch, NewBranch, NewBranchSchedule } from "@/db/schema";
import { BranchServices } from "@/model";
import { getService, KEY_BRANCH_SERVICE } from "@/utils/getServices";
import { Context } from "hono";

const getBranchService = (c: Context) =>
  getService<BranchServices>(c, KEY_BRANCH_SERVICE);

const create = async (c: Context) => {
  const dto: NewBranch = await c.req.json();
  const result = await getBranchService(c).create(dto);
  return c.json(result, 201);
};

const findAll = async (c: Context) => {
  const filters = c.req.query();
  const result = await getBranchService(c).findAll(filters);
  return c.json(result);
};

const findById = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const result = await getBranchService(c).findById(id);
  if (!result) return c.json({ message: "Branch not found" }, 404);
  return c.json(result);
};

const update = async (c: Context) => {
  const branchService = getBranchService(c);

  const id = parseInt(c.req.param("id"), 10);
  const dto: Branch = await c.req.json();
  const result = await branchService.update(id, dto);
  return c.json(result);
};

const remove = async (c: Context) => {
  const branchService = getBranchService(c);

  const id = parseInt(c.req.param("id"), 10);
  await branchService.delete(id);
  return c.json({ message: "Branch deleted successfully" }, 201);
};

const createSchedule = async (c: Context) => {
  const dto: NewBranchSchedule = await c.req.json();
  const result = await getBranchService(c).createBranchSchedule(dto);
  return c.json(result, 201);
};

const getSchedule = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const result = await getBranchService(c).getBranchSchedule(id);
  if (!result) return c.json({ message: "Schedule not found" }, 404);
  return c.json(result);
};

const updateSchedule = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const dto: NewBranchSchedule = await c.req.json();
  const result = await getBranchService(c).updateBranchSchedule(id, dto);
  return c.json(result);
};

const deleteSchedule = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  await getBranchService(c).deleteBranchSchedule(id);
  return c.json({ message: "Schedule deleted successfully" }, 201);
};

export default {
  create,
  findAll,
  findById,
  update,
  remove, // kept for backward compatibility if needed, though delete is standard
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
