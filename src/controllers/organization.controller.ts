import { NewOrganization } from "@/db/schema";
import { IOrganizationServices } from "@/model";
import { getService, KEY_ORGANIZATION_SERVICE } from "@/utils/getServices";
import { parseId } from "@/utils/validateRequest";
import { Context } from "hono";

const getOrganization = async (c: Context) => {
  const organizationService = getService<IOrganizationServices>(
    c,
    KEY_ORGANIZATION_SERVICE,
  );

  const id = parseId(c.req.param("id"));

  if (!id) {
    return c.json({ error: "Organization id is required" }, 400);
  }

  try {
    const organization = await organizationService.getOrganization({
      id,
    });

    if (!organization) return c.json({ error: "Organization not found" }, 404);

    return c.json(organization, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

const createOrganization = async (c: Context) => {
  const organizationService = getService<IOrganizationServices>(
    c,
    KEY_ORGANIZATION_SERVICE,
  );
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
  const organizationService = getService<IOrganizationServices>(
    c,
    KEY_ORGANIZATION_SERVICE,
  );

  try {
    const id = parseId(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Organization id is required" }, 400);
    }

    const organization = await organizationService.updateOrganization({
      id,
    });

    return c.json(organization, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

const deleteOrganization = async (c: Context) => {
  const organizationService = getService<IOrganizationServices>(
    c,
    KEY_ORGANIZATION_SERVICE,
  );

  try {
    const id = parseId(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Organization id is required" }, 400);
    }

    await organizationService.deleteOrganization({
      id,
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
