"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class OrganizationService {
    async createOrganization({ newOrganization, userId, }) {
        if (!newOrganization) {
            throw new Error("Organization ID is required");
        }
        const existingOrganization = await db_1.db.select().from(schema_1.organizations);
        if (existingOrganization.length === 1) {
            throw new Error("Organization already exists");
        }
        newOrganization.userId = userId;
        console.log("newOrganization", newOrganization);
        const [organization] = await db_1.db
            .insert(schema_1.organizations)
            .values(newOrganization)
            .returning();
        if (!organization) {
            throw new Error("Failed to create organization");
        }
        return organization;
    }
    async updateOrganization({ id }) {
        const existingOrganization = await this.validateById(id);
        if (!existingOrganization) {
            throw new Error("Organization not found");
        }
        const [updatedOrganization] = await db_1.db
            .update(schema_1.organizations)
            .set(existingOrganization)
            .where((0, drizzle_orm_1.eq)(schema_1.organizations.id, existingOrganization.id))
            .returning();
        if (!updatedOrganization) {
            throw new Error("Failed to update organization");
        }
        return updatedOrganization;
    }
    async deleteOrganization({ id }) {
        const existingOrganization = await this.validateById(id);
        if (!existingOrganization) {
            throw new Error("Organization not found");
        }
        await db_1.db
            .delete(schema_1.organizations)
            .where((0, drizzle_orm_1.eq)(schema_1.organizations.id, existingOrganization.id))
            .execute();
    }
    async getOrganization({ payload, }) {
        const { userId } = payload;
        const [existingOrganization] = await db_1.db
            .select()
            .from(schema_1.organizations)
            .where((0, drizzle_orm_1.eq)(schema_1.organizations.userId, userId))
            .execute();
        if (!existingOrganization) {
            return null;
        }
        return existingOrganization;
    }
    async validateById(id) {
        const [existingOrganization] = await db_1.db
            .select()
            .from(schema_1.organizations)
            .where((0, drizzle_orm_1.eq)(schema_1.organizations.id, id))
            .execute();
        if (!existingOrganization) {
            return null;
        }
        return existingOrganization;
    }
}
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.services.js.map