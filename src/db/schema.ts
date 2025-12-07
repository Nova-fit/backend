import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  date,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

// ==================== ENUMS ====================
export const userTypeEnum = pgEnum("user_type", [
  "admin",
  "employee",
  "client",
]);
export const genderEnum = pgEnum("gender", [
  "male",
  "female",
  "other",
  "prefer_not_to_say",
]);
export const machineStatusEnum = pgEnum("machine_status", [
  "available",
  "in_use",
  "maintenance",
  "out_of_service",
]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// ==================== 1. USERS TABLE ====================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  userType: userTypeEnum("user_type").notNull().default("client"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 2. PROFILES TABLE (1:1) ====================
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
  birthDate: date("birth_date"),
  gender: genderEnum("gender"),
  address: text("address"),
  photoUrl: text("photo_url"),
});

// ==================== 3. ROLES TABLE ====================
export const appRoles = pgTable("app_roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).unique().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 4. PERMISSIONS TABLE ====================
export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  code: varchar("code", { length: 50 }).unique().notNull(), // ej: 'create_users', 'edit_inventory'
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 5. ROLE_PERMISSIONS TABLE ====================
export const rolePermissions = pgTable("role_permissions", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id")
    .notNull()
    .references(() => appRoles.id, { onDelete: "cascade" }),
  permissionId: integer("permission_id")
    .notNull()
    .references(() => permissions.id, { onDelete: "cascade" }),
});

// ==================== 6. ORGANIZATIONS TABLE ====================
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  address: text("address"),
  phoneNumber: varchar("phone_number", { length: 30 }),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 7. BRANCHES TABLE (Sucursales) ====================
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).unique(), // Código único de sucursal
  address: text("address"),
  phoneNumber: varchar("phone_number", { length: 30 }),
  email: varchar("email", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 8. BRANCH_SCHEDULES TABLE ====================
export const branchSchedules = pgTable("branch_schedules", {
  id: serial("id").primaryKey(),
  branchId: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  openTime: varchar("open_time", { length: 5 }).notNull(), // formato HH:MM (ej: "09:00")
  closeTime: varchar("close_time", { length: 5 }).notNull(), // formato HH:MM (ej: "18:00")
  isClosed: boolean("is_closed").default(false).notNull(), // true si está cerrado ese día
});

// ==================== 9. USER_BRANCHES TABLE ====================
export const userBranches = pgTable("user_branches", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  branchId: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  roleId: integer("role_id")
    .notNull()
    .references(() => appRoles.id),
  isCurrentBranch: boolean("is_current_branch").default(true).notNull(), // Para clientes transferidos
  joinedAt: timestamp("joined_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  leftAt: timestamp("left_at", { withTimezone: true }), // Cuando se transfiere
});

// ==================== 10. BRANCH_TRANSFERS TABLE ====================
export const branchTransfers = pgTable("branch_transfers", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fromBranchId: integer("from_branch_id")
    .notNull()
    .references(() => branches.id),
  toBranchId: integer("to_branch_id")
    .notNull()
    .references(() => branches.id),
  transferredBy: uuid("transferred_by").references(() => users.id), // Usuario que hizo la transferencia
  reason: text("reason"),
  transferredAt: timestamp("transferred_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 11. MACHINES TABLE ====================
export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  branchId: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  serialNumber: varchar("serial_number", { length: 100 }).unique(),
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  category: varchar("category", { length: 50 }), // ej: 'cardio', 'strength', 'functional'
  status: machineStatusEnum("status").default("available").notNull(),
  purchaseDate: date("purchase_date"),
  warrantyExpiryDate: date("warranty_expiry_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== 12. SESSIONS TABLE ====================
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  isRevoked: boolean("is_revoked").default(false).notNull(),
});

// ==================== RELATIONS ====================

// Users relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  userBranches: many(userBranches),
  sessions: many(sessions),
  transfersFrom: many(branchTransfers, { relationName: "transferredUser" }),
  transfersInitiated: many(branchTransfers, {
    relationName: "transferInitiator",
  }),
}));

// Profiles relations
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

// Roles relations
export const appRolesRelations = relations(appRoles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userBranches: many(userBranches),
}));

// Permissions relations
export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

// Role Permissions relations
export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(appRoles, {
      fields: [rolePermissions.roleId],
      references: [appRoles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

// Organizations relations
export const organizationsRelations = relations(organizations, ({ many }) => ({
  branches: many(branches),
}));

// Branches relations
export const branchesRelations = relations(branches, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [branches.organizationId],
    references: [organizations.id],
  }),
  schedules: many(branchSchedules),
  userBranches: many(userBranches),
  machines: many(machines),
  transfersFrom: many(branchTransfers, { relationName: "fromBranch" }),
  transfersTo: many(branchTransfers, { relationName: "toBranch" }),
}));

// Branch Schedules relations
export const branchSchedulesRelations = relations(
  branchSchedules,
  ({ one }) => ({
    branch: one(branches, {
      fields: [branchSchedules.branchId],
      references: [branches.id],
    }),
  }),
);

// User Branches relations
export const userBranchesRelations = relations(userBranches, ({ one }) => ({
  user: one(users, {
    fields: [userBranches.userId],
    references: [users.id],
  }),
  branch: one(branches, {
    fields: [userBranches.branchId],
    references: [branches.id],
  }),
  role: one(appRoles, {
    fields: [userBranches.roleId],
    references: [appRoles.id],
  }),
}));

// Branch Transfers relations
export const branchTransfersRelations = relations(
  branchTransfers,
  ({ one }) => ({
    user: one(users, {
      fields: [branchTransfers.userId],
      references: [users.id],
      relationName: "transferredUser",
    }),
    fromBranch: one(branches, {
      fields: [branchTransfers.fromBranchId],
      references: [branches.id],
      relationName: "fromBranch",
    }),
    toBranch: one(branches, {
      fields: [branchTransfers.toBranchId],
      references: [branches.id],
      relationName: "toBranch",
    }),
    transferredByUser: one(users, {
      fields: [branchTransfers.transferredBy],
      references: [users.id],
      relationName: "transferInitiator",
    }),
  }),
);

// Machines relations
export const machinesRelations = relations(machines, ({ one }) => ({
  branch: one(branches, {
    fields: [machines.branchId],
    references: [branches.id],
  }),
}));

// Sessions relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// ==================== TYPES ====================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type AppRole = typeof appRoles.$inferSelect;
export type NewAppRole = typeof appRoles.$inferInsert;

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;

export type BranchSchedule = typeof branchSchedules.$inferSelect;
export type NewBranchSchedule = typeof branchSchedules.$inferInsert;

export type UserBranch = typeof userBranches.$inferSelect;
export type NewUserBranch = typeof userBranches.$inferInsert;

export type BranchTransfer = typeof branchTransfers.$inferSelect;
export type NewBranchTransfer = typeof branchTransfers.$inferInsert;

export type Machine = typeof machines.$inferSelect;
export type NewMachine = typeof machines.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
