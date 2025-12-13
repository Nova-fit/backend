import {
  IAuthServices,
  IProfileService,
  IOrganizationServices,
  BranchServices,
  UserBranchServices,
} from "@/model";
import {
  AuthServices,
  ProfileService,
  OrganizationService,
  BranchServiceImpl,
  UserBranchServiceImpl,
} from "@/services";
import { Context } from "hono";

export type Variables = {
  authService: IAuthServices;
  profileService: IProfileService;
  organizationService: IOrganizationServices;
  branchService: BranchServices;
  userBranchService: UserBranchServices;
};

export const containerMiddleware = async (c: Context, next: Function) => {
  c.set("authService", new AuthServices());
  c.set("profileService", new ProfileService());
  c.set("organizationService", new OrganizationService());
  c.set("branchService", new BranchServiceImpl());
  c.set("userBranchService", new UserBranchServiceImpl());
  await next();
};
