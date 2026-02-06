"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchServiceImpl = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class BranchServiceImpl {
    async create(branch) {
        const [created] = await db_1.db.insert(schema_1.branches).values(branch).returning();
        return created;
    }
    async findAll(filters = {}) {
        return db_1.db
            .select()
            .from(schema_1.branches)
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.branches.id, filters?.id), (0, drizzle_orm_1.eq)(schema_1.branches.name, filters?.name), (0, drizzle_orm_1.eq)(schema_1.branches.address, filters?.address), (0, drizzle_orm_1.eq)(schema_1.branches.email, filters?.email), (0, drizzle_orm_1.eq)(schema_1.branches.createdAt, filters?.createdAt), (0, drizzle_orm_1.eq)(schema_1.branches.updatedAt, filters?.updatedAt)));
    }
    async findById(id) {
        const branch = await db_1.db
            .select()
            .from(schema_1.branches)
            .where((0, drizzle_orm_1.eq)(schema_1.branches.id, id))
            .limit(1)
            .execute();
        return branch[0] || null;
    }
    async update(id, data) {
        const [updated] = await db_1.db
            .update(schema_1.branches)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.branches.id, id))
            .returning();
        return updated;
    }
    async delete(id) {
        await db_1.db.delete(schema_1.branches).where((0, drizzle_orm_1.eq)(schema_1.branches.id, id));
    }
    async createBranchSchedule(data) {
        const [created] = await db_1.db.insert(schema_1.branchSchedules).values(data).returning();
        return created;
    }
    async getBranchSchedule(id) {
        const schedule = await db_1.db
            .select()
            .from(schema_1.branchSchedules)
            .where((0, drizzle_orm_1.eq)(schema_1.branchSchedules.branchId, id))
            .execute();
        return schedule[0] || null;
    }
    async updateBranchSchedule(id, data) {
        const [updated] = await db_1.db
            .update(schema_1.branchSchedules)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.branchSchedules.id, id))
            .returning();
        return updated;
    }
    async deleteBranchSchedule(id) {
        await db_1.db.delete(schema_1.branchSchedules).where((0, drizzle_orm_1.eq)(schema_1.branchSchedules.id, id));
    }
}
exports.BranchServiceImpl = BranchServiceImpl;
//# sourceMappingURL=branch.service.js.map