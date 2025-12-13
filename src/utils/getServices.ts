import { Context } from "hono";

const KEY_ORGANIZATION_SERVICE = "organizationService";
const KEY_BRANCH_SERVICE = "branchService";
const KEY_USER_BRANCH_SERVICE = "userBranchService";
const KEY_MACHINE_SERVICE = "machineService";

/**
 * Obtiene una instancia de OrganizationService del contexto.
 * Evita la repetición de código en cada handler.
 */
const getService = <T>(c: Context, key: string): T => {
  return c.get(key);
};

export {
  getService,
  KEY_ORGANIZATION_SERVICE,
  KEY_BRANCH_SERVICE,
  KEY_USER_BRANCH_SERVICE,
  KEY_MACHINE_SERVICE,
};
