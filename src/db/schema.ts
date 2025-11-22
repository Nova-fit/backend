
import { relations } from "drizzle-orm";
import {  pgTable, serial, text, timestamp, uuid, varchar, boolean, date, integer } from "drizzle-orm/pg-core";


// 1. Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// 2. Profiles Table (1:1)
export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().unique().references(() => users.id),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phoneNumber: varchar('phone_number', { length: 30 }),
  birthDate: date('birth_date'),
  gender: varchar('gender', { length: 20 }),
  address: text('address'),
});

// 3. Roles Table
export const appRoles = pgTable('app_roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique().notNull(),
});
// 4. Organizations Table
export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  address: text('address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// 5. User_Organizations Table
export const userOrganizations = pgTable('user_organizations', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  organizationId: integer('organization_id').notNull().references(() => organizations.id),
  roleId: integer('role_id').notNull().references(() => appRoles.id),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
});

// 6. Sessions Table
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  tokenHash: text('token_hash').notNull(),
  ipAddress: varchar('ip_address', { length: 100 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  isRevoked: boolean('is_revoked').default(false),
});


export const IProfile = profiles.$inferInsert;