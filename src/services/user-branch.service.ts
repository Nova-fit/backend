import { db } from "@/db";
import {
  branchTransfers,
  userBranches,
  UserBranch,
  BranchTransfer,
} from "@/db/schema";
import { UserBranchServices } from "@/model/user-branch/user-branch-services.interface";
import { eq, and, desc } from "drizzle-orm";

export class UserBranchServiceImpl implements UserBranchServices {
  async assignUserToBranch(
    userId: string,
    branchId: number,
    roleId: number,
  ): Promise<UserBranch> {
    const [assigned] = await db
      .insert(userBranches)
      .values({
        userId,
        branchId,
        roleId,
        isCurrentBranch: true,
      })
      .returning();
    
    if (!assigned) throw new Error("Failed to assign user to branch");
    return assigned;
  }

  async transferUser(
    userId: string,
    toBranchId: number,
    transferredBy: string,
    reason?: string,
  ): Promise<BranchTransfer> {
    return await db.transaction(async (tx) => {
      // 1. Find current active branch
      const currentBranch = await tx.query.userBranches.findFirst({
        where: and(
          eq(userBranches.userId, userId),
          eq(userBranches.isCurrentBranch, true),
        ),
      });

      if (!currentBranch) {
        throw new Error("User has no active branch assignment");
      }

      // 2. Deactivate current branch
      await tx
        .update(userBranches)
        .set({
          isCurrentBranch: false,
          leftAt: new Date(),
        })
        .where(eq(userBranches.id, currentBranch.id));

      // 3. Create new assignment
      await tx.insert(userBranches).values({
        userId,
        branchId: toBranchId,
        roleId: currentBranch.roleId, // Maintain same role or pass as param? Assuming same for now.
        isCurrentBranch: true,
      });

      // 4. Record transfer
      const [transfer] = await tx
        .insert(branchTransfers)
        .values({
          userId,
          fromBranchId: currentBranch.branchId,
          toBranchId,
          transferredBy,
          reason,
        })
        .returning();

      if (!transfer) throw new Error("Failed to record transfer");
      return transfer;
    });
  }

  async getBranchUsers(branchId: number): Promise<UserBranch[]> {
    return db
      .select()
      .from(userBranches)
      .where(
        and(
          eq(userBranches.branchId, branchId),
          eq(userBranches.isCurrentBranch, true),
        ),
      );
  }

  async getUserHistory(userId: string): Promise<BranchTransfer[]> {
    return db
      .select()
      .from(branchTransfers)
      .where(eq(branchTransfers.userId, userId))
      .orderBy(desc(branchTransfers.transferredAt));
  }

  async getCurrentBranch(userId: string): Promise<UserBranch | null> {
    const result = await db.query.userBranches.findFirst({
      where: and(
        eq(userBranches.userId, userId),
        eq(userBranches.isCurrentBranch, true),
      ),
    });
    return result || null;
  }
}
