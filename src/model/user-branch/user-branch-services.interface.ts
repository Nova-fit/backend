import { BranchTransfer, NewBranchTransfer, UserBranch } from "@/db/schema";

export interface UserBranchServices {
  assignUserToBranch(userId: string, branchId: number, roleId: number): Promise<UserBranch>;
  transferUser(
    userId: string,
    toBranchId: number,
    transferredBy: string,
    reason?: string
  ): Promise<BranchTransfer>;
  getBranchUsers(branchId: number): Promise<UserBranch[]>;
  getUserHistory(userId: string): Promise<BranchTransfer[]>;
  getCurrentBranch(userId: string): Promise<UserBranch | null>;
}
