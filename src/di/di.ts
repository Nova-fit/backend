import {
  IAuthServices,
  IProfileService,
  IOrganizationServices,
  BranchServices,
} from "@/model";
import {
  AuthServices,
  ProfileService,
  OrganizationService,
  BranchServiceImpl,
} from "@/services";
import { Context } from "hono";

export type Variables = {
  authService: IAuthServices;
  profileService: IProfileService;
  organizationService: IOrganizationServices;
  branchService: BranchServices;
};

export const containerMiddleware = async (c: Context, next: Function) => {
  c.set("authService", new AuthServices());
  c.set("profileService", new ProfileService());
  c.set("organizationService", new OrganizationService());
  c.set("branchService", new BranchServiceImpl());
  await next();
};
