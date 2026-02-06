"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getServices_1 = require("@/utils/getServices");
const getBranchService = (c) => (0, getServices_1.getService)(c, getServices_1.KEY_BRANCH_SERVICE);
const create = async (c) => {
    const dto = await c.req.json();
    const result = await getBranchService(c).create(dto);
    return c.json(result, 201);
};
const findAll = async (c) => {
    const filters = c.req.query();
    const result = await getBranchService(c).findAll(filters);
    return c.json(result);
};
const findById = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const result = await getBranchService(c).findById(id);
    if (!result)
        return c.json({ message: "Branch not found" }, 404);
    return c.json(result);
};
const update = async (c) => {
    const branchService = getBranchService(c);
    const id = parseInt(c.req.param("id"), 10);
    const dto = await c.req.json();
    const result = await branchService.update(id, dto);
    return c.json(result);
};
const remove = async (c) => {
    const branchService = getBranchService(c);
    const id = parseInt(c.req.param("id"), 10);
    await branchService.delete(id);
    return c.json({ message: "Branch deleted successfully" }, 201);
};
const createSchedule = async (c) => {
    const dto = await c.req.json();
    const result = await getBranchService(c).createBranchSchedule(dto);
    return c.json(result, 201);
};
const getSchedule = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const result = await getBranchService(c).getBranchSchedule(id);
    if (!result)
        return c.json({ message: "Schedule not found" }, 404);
    return c.json(result);
};
const updateSchedule = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const dto = await c.req.json();
    const result = await getBranchService(c).updateBranchSchedule(id, dto);
    return c.json(result);
};
const deleteSchedule = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    await getBranchService(c).deleteBranchSchedule(id);
    return c.json({ message: "Schedule deleted successfully" }, 201);
};
exports.default = {
    create,
    findAll,
    findById,
    update,
    remove,
    createSchedule,
    getSchedule,
    updateSchedule,
    deleteSchedule,
};
//# sourceMappingURL=branch.controller.js.map