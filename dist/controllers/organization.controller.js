"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getServices_1 = require("@/utils/getServices");
const validateRequest_1 = require("@/utils/validateRequest");
const getOrganization = async (c) => {
    const organizationService = (0, getServices_1.getService)(c, getServices_1.KEY_ORGANIZATION_SERVICE);
    const payload = c.get("jwtPayload");
    if (!payload) {
        return c.json({ error: "Organization user is required" }, 400);
    }
    try {
        const organization = await organizationService.getOrganization({
            payload,
        });
        if (!organization)
            return c.json({ error: "Organization not found" }, 404);
        return c.json(organization, 200);
    }
    catch (error) {
        return c.json({ error: error }, 500);
    }
};
const createOrganization = async (c) => {
    const organizationService = (0, getServices_1.getService)(c, getServices_1.KEY_ORGANIZATION_SERVICE);
    try {
        const newOrganization = (await c.req.json());
        const payload = c.get("jwtPayload");
        if (!payload) {
            return c.json({ error: "Organization user is required" }, 400);
        }
        const organization = await organizationService.createOrganization({
            newOrganization,
            userId: payload.userId,
        });
        return c.json(organization, 201);
    }
    catch (error) {
        return c.json({ error }, 500);
    }
};
const updateOrganization = async (c) => {
    const organizationService = (0, getServices_1.getService)(c, getServices_1.KEY_ORGANIZATION_SERVICE);
    try {
        const id = (0, validateRequest_1.parseId)(c.req.param("id"));
        if (!id) {
            return c.json({ error: "Organization id is required" }, 400);
        }
        const organization = await organizationService.updateOrganization({
            id,
        });
        return c.json(organization, 200);
    }
    catch (error) {
        return c.json({ error: error }, 500);
    }
};
const deleteOrganization = async (c) => {
    const organizationService = (0, getServices_1.getService)(c, getServices_1.KEY_ORGANIZATION_SERVICE);
    try {
        const id = (0, validateRequest_1.parseId)(c.req.param("id"));
        if (!id) {
            return c.json({ error: "Organization id is required" }, 400);
        }
        await organizationService.deleteOrganization({
            id,
        });
        return c.json({}, 201);
    }
    catch (error) {
        return c.json({ error: error }, 500);
    }
};
exports.default = {
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,
};
//# sourceMappingURL=organization.controller.js.map