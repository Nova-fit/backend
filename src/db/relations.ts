import { relations } from 'drizzle-orm';
import { users, profiles, appRoles, organizations, userOrganizations, sessions } from './schema';

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  sessions: many(sessions),
  memberships: many(userOrganizations),
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

export const userOrgRelations = relations(userOrganizations, ({ one }) => ({
  user: one(users, { fields: [userOrganizations.userId], references: [users.id] }),
  org: one(organizations, { fields: [userOrganizations.organizationId], references: [organizations.id] }),
  role: one(appRoles, { fields: [userOrganizations.roleId], references: [appRoles.id] }),
}));

export const organizationRelations = relations(organizations, ({ many }) => ({
  members: many(userOrganizations),
}));

export const roleRelations = relations(appRoles, ({ many }) => ({
  members: many(userOrganizations),
}));