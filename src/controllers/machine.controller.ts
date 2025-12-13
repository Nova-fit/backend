import { NewMachine, Machine } from "@/db/schema";
import { IMachineService } from "@/model";
import { getService, KEY_MACHINE_SERVICE } from "@/utils/getServices";
import { Context } from "hono";

const getMachineService = (c: Context) =>
  getService<IMachineService>(c, KEY_MACHINE_SERVICE);

const create = async (c: Context) => {
  const dto: NewMachine = await c.req.json();
  const result = await getMachineService(c).create(dto);
  return c.json(result, 201);
};

const findAll = async (c: Context) => {
  const filters = c.req.query();
  const result = await getMachineService(c).findAll(filters);
  return c.json(result);
};

const findById = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const result = await getMachineService(c).findById(id);
  if (!result) return c.json({ message: "Machine not found" }, 404);
  return c.json(result);
};

const update = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const dto: Partial<Machine> = await c.req.json();
  const result = await getMachineService(c).update(id, dto);
  return c.json(result);
};

const remove = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  await getMachineService(c).delete(id);
  return c.json({ message: "Machine deleted successfully" }, 201);
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};
