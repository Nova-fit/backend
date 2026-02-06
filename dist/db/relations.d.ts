export declare const userRelations: import("drizzle-orm").Relations<"users", {
    profile: import("drizzle-orm").One<"profiles", false>;
    sessions: import("drizzle-orm").Many<"sessions">;
    memberships: import("drizzle-orm").Many<"user_branches">;
}>;
export declare const profileRelations: import("drizzle-orm").Relations<"profiles", {
    user: import("drizzle-orm").One<"users", true>;
}>;
export declare const sessionRelations: import("drizzle-orm").Relations<"sessions", {
    user: import("drizzle-orm").One<"users", true>;
}>;
export declare const userBranchesRelations: import("drizzle-orm").Relations<"user_branches", {
    user: import("drizzle-orm").One<"users", true>;
    branch: import("drizzle-orm").One<"branches", true>;
    role: import("drizzle-orm").One<"app_roles", true>;
}>;
export declare const organizationRelations: import("drizzle-orm").Relations<"organizations", {
    branches: import("drizzle-orm").Many<"branches">;
}>;
export declare const roleRelations: import("drizzle-orm").Relations<"app_roles", {
    members: import("drizzle-orm").Many<"user_branches">;
}>;
//# sourceMappingURL=relations.d.ts.map