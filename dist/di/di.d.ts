import { IAuthServices, IProfileService, IOrganizationServices, BranchServices, UserBranchServices, IMachineService } from "@/model";
import { Context } from "hono";
export type Variables = {
    authService: IAuthServices;
    profileService: IProfileService;
    organizationService: IOrganizationServices;
    branchService: BranchServices;
    userBranchService: UserBranchServices;
    machineService: IMachineService;
};
export declare const containerMiddleware: (c: Context, next: Function) => Promise<void>;
//# sourceMappingURL=di.d.ts.map