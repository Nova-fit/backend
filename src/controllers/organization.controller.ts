import { NewOrganization } from "@/db/schema";
import { OrganizationService } from "@/services";
import { Context } from "hono";

const getOrganization = async (c: Context) => {
  const organizationService = c.get(
    "organizationService",
  ) as OrganizationService;

  const id = c.req.param("id");

  if (!id) {
    return c.json({ error: "Organization id is required" }, 400);
  }

  try {
    const organization = await organizationService.getOrganization({
      id: Number(id),
    });

    if (!organization) return c.json({ error: "Organization not found" }, 404);

    return c.json(organization, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

const createOrganization = async (c: Context) => {
  const organizationService = c.get(
    "organizationService",
  ) as OrganizationService;
  try {
    const newOrganization = (await c.req.json()) as NewOrganization;

    const organization = await organizationService.createOrganization({
      newOrganization,
    });

    return c.json(organization, 201);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

const updateOrganization = async (c: Context) => {
  const organizationService = c.get(
    "organizationService",
  ) as OrganizationService;

  try {
    const id = c.req.param("id");

    const organization = await organizationService.updateOrganization({
      id: Number(id),
    });

    return c.json(organization, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

const deleteOrganization = async (c: Context) => {
  const organizationService = c.get(
    "organizationService",
  ) as OrganizationService;

  try {
    const id = c.req.param("id");

    await organizationService.deleteOrganization({
      id: Number(id),
    });

    return c.json({}, 201);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

export default {
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
