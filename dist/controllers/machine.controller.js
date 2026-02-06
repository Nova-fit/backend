"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getServices_1 = require("@/utils/getServices");
const getMachineService = (c) => (0, getServices_1.getService)(c, getServices_1.KEY_MACHINE_SERVICE);
const create = async (c) => {
    const dto = await c.req.json();
    const result = await getMachineService(c).create(dto);
    return c.json(result, 201);
};
const findAll = async (c) => {
    const filters = c.req.query();
    const result = await getMachineService(c).findAll(filters);
    return c.json(result);
};
const findById = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const result = await getMachineService(c).findById(id);
    if (!result)
        return c.json({ message: "Machine not found" }, 404);
    return c.json(result);
};
const update = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const dto = await c.req.json();
    const result = await getMachineService(c).update(id, dto);
    return c.json(result);
};
const remove = async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    await getMachineService(c).delete(id);
    return c.json({ message: "Machine deleted successfully" }, 201);
};
exports.default = {
    create,
    findAll,
    findById,
    update,
    remove,
};
//# sourceMappingURL=machine.controller.js.map