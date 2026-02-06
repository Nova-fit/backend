"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRelations = exports.machinesRelations = exports.branchTransfersRelations = exports.userBranchesRelations = exports.branchSchedulesRelations = exports.branchesRelations = exports.organizationsRelations = exports.rolePermissionsRelations = exports.permissionsRelations = exports.appRolesRelations = exports.profilesRelations = exports.usersRelations = exports.sessions = exports.machines = exports.branchTransfers = exports.userBranches = exports.branchSchedules = exports.branches = exports.organizations = exports.rolePermissions = exports.permissions = exports.appRoles = exports.profiles = exports.users = exports.dayOfWeekEnum = exports.machineStatusEnum = exports.genderEnum = exports.userTypeEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userTypeEnum = (0, pg_core_1.pgEnum)("user_type", [
    "admin",
    "employee",
    "client",
]);
exports.genderEnum = (0, pg_core_1.pgEnum)("gender", [
    "male",
    "female",
    "other",
    "prefer_not_to_say",
]);
exports.machineStatusEnum = (0, pg_core_1.pgEnum)("machine_status", [
    "available",
    "in_use",
    "maintenance",
    "out_of_service",
]);
exports.dayOfWeekEnum = (0, pg_core_1.pgEnum)("day_of_week", [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    passwordHash: (0, pg_core_1.text)("password_hash").notNull(),
    userType: (0, exports.userTypeEnum)("user_type").notNull().default("client"),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.profiles = (0, pg_core_1.pgTable)("profiles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .unique()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 100 }),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 100 }),
    phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 30 }),
    birthDate: (0, pg_core_1.date)("birth_date"),
    gender: (0, exports.genderEnum)("gender"),
    address: (0, pg_core_1.text)("address"),
    photoUrl: (0, pg_core_1.text)("photo_url"),
});
exports.appRoles = (0, pg_core_1.pgTable)("app_roles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }).unique().notNull(),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.permissions = (0, pg_core_1.pgTable)("permissions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).unique().notNull(),
    code: (0, pg_core_1.varchar)("code", { length: 50 }).unique().notNull(),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.rolePermissions = (0, pg_core_1.pgTable)("role_permissions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    roleId: (0, pg_core_1.integer)("role_id")
        .notNull()
        .references(() => exports.appRoles.id, { onDelete: "cascade" }),
    permissionId: (0, pg_core_1.integer)("permission_id")
        .notNull()
        .references(() => exports.permissions.id, { onDelete: "cascade" }),
});
exports.organizations = (0, pg_core_1.pgTable)("organizations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull().unique(),
    description: (0, pg_core_1.text)("description"),
    address: (0, pg_core_1.text)("address"),
    phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 30 }),
    email: (0, pg_core_1.varchar)("email", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
});
exports.branches = (0, pg_core_1.pgTable)("branches", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    organizationId: (0, pg_core_1.integer)("organization_id")
        .notNull()
        .references(() => exports.organizations.id, { onDelete: "cascade" }),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    code: (0, pg_core_1.varchar)("code", { length: 20 }).unique(),
    address: (0, pg_core_1.text)("address"),
    phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 30 }),
    email: (0, pg_core_1.varchar)("email", { length: 255 }),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.branchSchedules = (0, pg_core_1.pgTable)("branch_schedules", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    branchId: (0, pg_core_1.integer)("branch_id")
        .notNull()
        .references(() => exports.branches.id, { onDelete: "cascade" }),
    dayOfWeek: (0, exports.dayOfWeekEnum)("day_of_week").notNull(),
    openTime: (0, pg_core_1.varchar)("open_time", { length: 5 }).notNull(),
    closeTime: (0, pg_core_1.varchar)("close_time", { length: 5 }).notNull(),
    isClosed: (0, pg_core_1.boolean)("is_closed").default(false).notNull(),
});
exports.userBranches = (0, pg_core_1.pgTable)("user_branches", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    branchId: (0, pg_core_1.integer)("branch_id")
        .notNull()
        .references(() => exports.branches.id, { onDelete: "cascade" }),
    roleId: (0, pg_core_1.integer)("role_id")
        .notNull()
        .references(() => exports.appRoles.id),
    isCurrentBranch: (0, pg_core_1.boolean)("is_current_branch").default(true).notNull(),
    joinedAt: (0, pg_core_1.timestamp)("joined_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    leftAt: (0, pg_core_1.timestamp)("left_at", { withTimezone: true }),
});
exports.branchTransfers = (0, pg_core_1.pgTable)("branch_transfers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    fromBranchId: (0, pg_core_1.integer)("from_branch_id")
        .notNull()
        .references(() => exports.branches.id),
    toBranchId: (0, pg_core_1.integer)("to_branch_id")
        .notNull()
        .references(() => exports.branches.id),
    transferredBy: (0, pg_core_1.uuid)("transferred_by").references(() => exports.users.id),
    reason: (0, pg_core_1.text)("reason"),
    transferredAt: (0, pg_core_1.timestamp)("transferred_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.machines = (0, pg_core_1.pgTable)("machines", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    branchId: (0, pg_core_1.integer)("branch_id")
        .notNull()
        .references(() => exports.branches.id, { onDelete: "cascade" }),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    serialNumber: (0, pg_core_1.varchar)("serial_number", { length: 100 }).unique(),
    brand: (0, pg_core_1.varchar)("brand", { length: 100 }),
    model: (0, pg_core_1.varchar)("model", { length: 100 }),
    category: (0, pg_core_1.varchar)("category", { length: 50 }),
    status: (0, exports.machineStatusEnum)("status").default("available").notNull(),
    purchaseDate: (0, pg_core_1.date)("purchase_date"),
    warrantyExpiryDate: (0, pg_core_1.date)("warranty_expiry_date"),
    notes: (0, pg_core_1.text)("notes"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    tokenHash: (0, pg_core_1.text)("token_hash").notNull(),
    ipAddress: (0, pg_core_1.varchar)("ip_address", { length: 100 }),
    userAgent: (0, pg_core_1.text)("user_agent"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expires_at", { withTimezone: true }).notNull(),
    isRevoked: (0, pg_core_1.boolean)("is_revoked").default(false).notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one, many }) => ({
    profile: one(exports.profiles, {
        fields: [exports.users.id],
        references: [exports.profiles.userId],
    }),
    userBranches: many(exports.userBranches),
    sessions: many(exports.sessions),
    transfersFrom: many(exports.branchTransfers, { relationName: "transferredUser" }),
    transfersInitiated: many(exports.branchTransfers, {
        relationName: "transferInitiator",
    }),
}));
exports.profilesRelations = (0, drizzle_orm_1.relations)(exports.profiles, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.profiles.userId],
        references: [exports.users.id],
    }),
}));
exports.appRolesRelations = (0, drizzle_orm_1.relations)(exports.appRoles, ({ many }) => ({
    rolePermissions: many(exports.rolePermissions),
    userBranches: many(exports.userBranches),
}));
exports.permissionsRelations = (0, drizzle_orm_1.relations)(exports.permissions, ({ many }) => ({
    rolePermissions: many(exports.rolePermissions),
}));
exports.rolePermissionsRelations = (0, drizzle_orm_1.relations)(exports.rolePermissions, ({ one }) => ({
    role: one(exports.appRoles, {
        fields: [exports.rolePermissions.roleId],
        references: [exports.appRoles.id],
    }),
    permission: one(exports.permissions, {
        fields: [exports.rolePermissions.permissionId],
        references: [exports.permissions.id],
    }),
}));
exports.organizationsRelations = (0, drizzle_orm_1.relations)(exports.organizations, ({ many }) => ({
    branches: many(exports.branches),
    users: many(exports.users),
}));
exports.branchesRelations = (0, drizzle_orm_1.relations)(exports.branches, ({ one, many }) => ({
    organization: one(exports.organizations, {
        fields: [exports.branches.organizationId],
        references: [exports.organizations.id],
    }),
    schedules: many(exports.branchSchedules),
    userBranches: many(exports.userBranches),
    machines: many(exports.machines),
    transfersFrom: many(exports.branchTransfers, { relationName: "fromBranch" }),
    transfersTo: many(exports.branchTransfers, { relationName: "toBranch" }),
}));
exports.branchSchedulesRelations = (0, drizzle_orm_1.relations)(exports.branchSchedules, ({ one }) => ({
    branch: one(exports.branches, {
        fields: [exports.branchSchedules.branchId],
        references: [exports.branches.id],
    }),
}));
exports.userBranchesRelations = (0, drizzle_orm_1.relations)(exports.userBranches, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.userBranches.userId],
        references: [exports.users.id],
    }),
    branch: one(exports.branches, {
        fields: [exports.userBranches.branchId],
        references: [exports.branches.id],
    }),
    role: one(exports.appRoles, {
        fields: [exports.userBranches.roleId],
        references: [exports.appRoles.id],
    }),
}));
exports.branchTransfersRelations = (0, drizzle_orm_1.relations)(exports.branchTransfers, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.branchTransfers.userId],
        references: [exports.users.id],
        relationName: "transferredUser",
    }),
    fromBranch: one(exports.branches, {
        fields: [exports.branchTransfers.fromBranchId],
        references: [exports.branches.id],
        relationName: "fromBranch",
    }),
    toBranch: one(exports.branches, {
        fields: [exports.branchTransfers.toBranchId],
        references: [exports.branches.id],
        relationName: "toBranch",
    }),
    transferredByUser: one(exports.users, {
        fields: [exports.branchTransfers.transferredBy],
        references: [exports.users.id],
        relationName: "transferInitiator",
    }),
}));
exports.machinesRelations = (0, drizzle_orm_1.relations)(exports.machines, ({ one }) => ({
    branch: one(exports.branches, {
        fields: [exports.machines.branchId],
        references: [exports.branches.id],
    }),
}));
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.sessions.userId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=schema.js.map