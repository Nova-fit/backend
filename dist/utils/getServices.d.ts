import { Context } from "hono";
declare const KEY_ORGANIZATION_SERVICE = "organizationService";
declare const KEY_BRANCH_SERVICE = "branchService";
declare const KEY_USER_BRANCH_SERVICE = "userBranchService";
declare const KEY_MACHINE_SERVICE = "machineService";
declare const getService: <T>(c: Context, key: string) => T;
export { getService, KEY_ORGANIZATION_SERVICE, KEY_BRANCH_SERVICE, KEY_USER_BRANCH_SERVICE, KEY_MACHINE_SERVICE, };
//# sourceMappingURL=getServices.d.ts.map