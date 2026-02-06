import { UserBranch, BranchTransfer } from "@/db/schema";
import { UserBranchServices } from "@/model/user-branch/user-branch-services.interface";
export declare class UserBranchServiceImpl implements UserBranchServices {
    assignUserToBranch(userId: string, branchId: number, roleId: number): Promise<UserBranch>;
    transferUser(userId: string, toBranchId: number, transferredBy: string, reason?: string): Promise<BranchTransfer>;
    getBranchUsers(branchId: number): Promise<UserBranch[]>;
    getUserHistory(userId: string): Promise<BranchTransfer[]>;
    getCurrentBranch(userId: string): Promise<UserBranch | null>;
}
//# sourceMappingURL=user-branch.service.d.ts.map