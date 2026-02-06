"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRelations = exports.organizationRelations = exports.userBranchesRelations = exports.sessionRelations = exports.profileRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./schema");
exports.userRelations = (0, drizzle_orm_1.relations)(schema_1.users, ({ one, many }) => ({
    profile: one(schema_1.profiles),
    sessions: many(schema_1.sessions),
    memberships: many(schema_1.userBranches),
}));
exports.profileRelations = (0, drizzle_orm_1.relations)(schema_1.profiles, ({ one }) => ({
    user: one(schema_1.users, {
        fields: [schema_1.profiles.userId],
        references: [schema_1.users.id],
    }),
}));
exports.sessionRelations = (0, drizzle_orm_1.relations)(schema_1.sessions, ({ one }) => ({
    user: one(schema_1.users, {
        fields: [schema_1.sessions.userId],
        references: [schema_1.users.id],
    }),
}));
exports.userBranchesRelations = (0, drizzle_orm_1.relations)(schema_1.userBranches, ({ one }) => ({
    user: one(schema_1.users, { fields: [schema_1.userBranches.userId], references: [schema_1.users.id] }),
    branch: one(schema_1.branches, { fields: [schema_1.userBranches.branchId], references: [schema_1.branches.id] }),
    role: one(schema_1.appRoles, { fields: [schema_1.userBranches.roleId], references: [schema_1.appRoles.id] }),
}));
exports.organizationRelations = (0, drizzle_orm_1.relations)(schema_1.organizations, ({ many }) => ({
    branches: many(schema_1.branches),
}));
exports.roleRelations = (0, drizzle_orm_1.relations)(schema_1.appRoles, ({ many }) => ({
    members: many(schema_1.userBranches),
}));
//# sourceMappingURL=relations.js.map