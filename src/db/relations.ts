import { relations } from 'drizzle-orm';
import { users, profiles, appRoles, organizations, branches, userBranches, sessions } from './schema';

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  sessions: many(sessions),
  memberships: many(userBranches),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const userBranchesRelations = relations(userBranches, ({ one }) => ({
  user: one(users, { fields: [userBranches.userId], references: [users.id] }),
  branch: one(branches, { fields: [userBranches.branchId], references: [branches.id] }),
  role: one(appRoles, { fields: [userBranches.roleId], references: [appRoles.id] }),
}));

export const organizationRelations = relations(organizations, ({ many }) => ({
  branches: many(branches),
}));

export const roleRelations = relations(appRoles, ({ many }) => ({
  members: many(userBranches),
}));