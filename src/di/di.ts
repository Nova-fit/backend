import { IAuthServices, IProfileService } from "@/model";
import { AuthServices, ProfileService, OrganizationService } from "@/services";
import { Context } from "hono";

export type Variables = {
  authService: IAuthServices;
  profileService: IProfileService;
};

export const containerMiddleware = async (c: Context, next: Function) => {
  c.set("authService", new AuthServices());
  c.set("profileService", new ProfileService());
  c.set("organizationService", new OrganizationService());
  await next();
};
