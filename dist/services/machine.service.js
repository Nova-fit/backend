"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineService = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class MachineService {
    async create(data) {
        const [created] = await db_1.db.insert(schema_1.machines).values(data).returning();
        return created;
    }
    async findAll(filters = {}) {
        return db_1.db
            .select()
            .from(schema_1.machines)
            .where((0, drizzle_orm_1.or)(filters.id ? (0, drizzle_orm_1.eq)(schema_1.machines.id, filters.id) : undefined, filters.branchId ? (0, drizzle_orm_1.eq)(schema_1.machines.branchId, filters.branchId) : undefined, filters.name ? (0, drizzle_orm_1.eq)(schema_1.machines.name, filters.name) : undefined, filters.serialNumber ? (0, drizzle_orm_1.eq)(schema_1.machines.serialNumber, filters.serialNumber) : undefined, filters.brand ? (0, drizzle_orm_1.eq)(schema_1.machines.brand, filters.brand) : undefined, filters.model ? (0, drizzle_orm_1.eq)(schema_1.machines.model, filters.model) : undefined, filters.category ? (0, drizzle_orm_1.eq)(schema_1.machines.category, filters.category) : undefined, filters.status ? (0, drizzle_orm_1.eq)(schema_1.machines.status, filters.status) : undefined));
    }
    async findById(id) {
        const result = await db_1.db
            .select()
            .from(schema_1.machines)
            .where((0, drizzle_orm_1.eq)(schema_1.machines.id, id))
            .limit(1);
        return result[0] || null;
    }
    async update(id, data) {
        const [updated] = await db_1.db
            .update(schema_1.machines)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.machines.id, id))
            .returning();
        return updated;
    }
    async delete(id) {
        await db_1.db.delete(schema_1.machines).where((0, drizzle_orm_1.eq)(schema_1.machines.id, id));
    }
}
exports.MachineService = MachineService;
//# sourceMappingURL=machine.service.js.map