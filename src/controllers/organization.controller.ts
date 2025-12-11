import { NewOrganization } from "@/db/schema";
import { OrganizationService } from "@/services";
import { Context } from "hono";

/**
 * Obtiene una instancia de OrganizationService del contexto.
 * Evita la repetición de código en cada handler.
 */
const getOrgService = (c: Context) =>
  c.get("organizationService") as OrganizationService;

/**
 * Valida que el parámetro id sea un entero positivo.
 */
const parseId = (id: string | undefined): number | null => {
  if (!id) return null;
  const parsed = Number(id);
  if (Number.isNaN(parsed) || parsed <= 0) return null;
  return parsed;
};

const getOrganization = async (c: Context) => {
  const organizationService = getOrgService(c);

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
  const organizationService = getOrgService(c);
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
  const organizationService = getOrgService(c);

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
  const organizationService = getOrgService(c);
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
