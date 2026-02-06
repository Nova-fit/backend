"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBranchServiceImpl = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class UserBranchServiceImpl {
    async assignUserToBranch(userId, branchId, roleId) {
        const [assigned] = await db_1.db
            .insert(schema_1.userBranches)
            .values({
            userId,
            branchId,
            roleId,
            isCurrentBranch: true,
        })
            .returning();
        if (!assigned)
            throw new Error("Failed to assign user to branch");
        return assigned;
    }
    async transferUser(userId, toBranchId, transferredBy, reason) {
        return await db_1.db.transaction(async (tx) => {
            const currentBranch = await tx.query.userBranches.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userBranches.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userBranches.isCurrentBranch, true)),
            });
            if (!currentBranch) {
                throw new Error("User has no active branch assignment");
            }
            await tx
                .update(schema_1.userBranches)
                .set({
                isCurrentBranch: false,
                leftAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.userBranches.id, currentBranch.id));
            await tx.insert(schema_1.userBranches).values({
                userId,
                branchId: toBranchId,
                roleId: currentBranch.roleId,
                isCurrentBranch: true,
            });
            const [transfer] = await tx
                .insert(schema_1.branchTransfers)
                .values({
                userId,
                fromBranchId: currentBranch.branchId,
                toBranchId,
                transferredBy,
                reason,
            })
                .returning();
            if (!transfer)
                throw new Error("Failed to record transfer");
            return transfer;
        });
    }
    async getBranchUsers(branchId) {
        return db_1.db
            .select()
            .from(schema_1.userBranches)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userBranches.branchId, branchId), (0, drizzle_orm_1.eq)(schema_1.userBranches.isCurrentBranch, true)));
    }
    async getUserHistory(userId) {
        return db_1.db
            .select()
            .from(schema_1.branchTransfers)
            .where((0, drizzle_orm_1.eq)(schema_1.branchTransfers.userId, userId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.branchTransfers.transferredAt));
    }
    async getCurrentBranch(userId) {
        const result = await db_1.db.query.userBranches.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userBranches.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userBranches.isCurrentBranch, true)),
        });
        return result || null;
    }
}
exports.UserBranchServiceImpl = UserBranchServiceImpl;
//# sourceMappingURL=user-branch.service.js.map