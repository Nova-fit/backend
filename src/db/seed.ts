import { db } from "./index";
import {
    appRoles,
    branches,
    organizations,
    profiles,
    userBranches,
    users,
} from "./schema";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";

async function main() {
    console.log("🌱 Starting seed...");

    try {
        const passwordHash = await hash("password123", 10);

        // 1. Create Users
        console.log("Creating users...");

        // Admin
        let [adminUser] = await db
            .insert(users)
            .values({
                email: "admin@novafit.com",
                passwordHash,
                userType: "admin",
                isActive: true,
            })
            .onConflictDoUpdate({
                target: users.email,
                set: { passwordHash },
            })
            .returning();

        if (!adminUser) {
            const found = await db.select().from(users).where(
                eq(users.email, "admin@novafit.com"),
            );
            adminUser = found[0];
        }

        if (adminUser) {
            await db.insert(profiles).values({
                userId: adminUser.id,
                firstName: "Admin",
                lastName: "User",
            }).onConflictDoNothing();
        }

        // Employee
        let [employeeUser] = await db
            .insert(users)
            .values({
                email: "employee@novafit.com",
                passwordHash,
                userType: "employee",
                isActive: true,
            })
            .onConflictDoUpdate({
                target: users.email,
                set: { passwordHash },
            })
            .returning();

        if (!employeeUser) {
            const found = await db.select().from(users).where(
                eq(users.email, "employee@novafit.com"),
            );
            employeeUser = found[0];
        }

        if (employeeUser) {
            await db.insert(profiles).values({
                userId: employeeUser.id,
                firstName: "Employee",
                lastName: "User",
            }).onConflictDoNothing();
        }

        // Client
        let [clientUser] = await db
            .insert(users)
            .values({
                email: "client@novafit.com",
                passwordHash,
                userType: "client",
                isActive: true,
            })
            .onConflictDoUpdate({
                target: users.email,
                set: { passwordHash },
            })
            .returning();

        if (!clientUser) {
            const found = await db.select().from(users).where(
                eq(users.email, "client@novafit.com"),
            );
            clientUser = found[0];
        }

        if (clientUser) {
            await db.insert(profiles).values({
                userId: clientUser.id,
                firstName: "Client",
                lastName: "User",
            }).onConflictDoNothing();
        }

        // 2. Create Organization (owned by Admin)
        console.log("Creating organization...");
        if (!adminUser) {
            throw new Error("Admin user could not be created or found");
        }

        const [org] = await db
            .insert(organizations)
            .values({
                name: "Nova Fit HQ",
                description: "Headquarters",
                email: "hq@novafit.com",
                userId: adminUser.id,
            })
            .onConflictDoNothing()
            .returning();

        // Fetch org if it wasn't created (duplicate)
        const finalOrg = org ||
            (await db.select().from(organizations).where(
                eq(organizations.name, "Nova Fit HQ"),
            ))[0];

        if (!finalOrg) {
            throw new Error(
                "Organization 'Nova Fit HQ' could not be created or found",
            );
        }

        // 3. Create Branch
        console.log("Creating branch...");
        const [branch] = await db
            .insert(branches)
            .values({
                organizationId: finalOrg.id,
                name: "Main Branch",
                code: "B001",
                address: "123 Fitness St",
                email: "main@novafit.com",
                isActive: true,
            })
            .onConflictDoNothing()
            .returning();

        const finalBranch = branch ||
            (await db.select().from(branches).where(eq(branches.code, "B001")))[
                0
            ];

        // 4. Create App Roles
        console.log("Creating app roles...");
        const roles = ["Manager", "Trainer", "Receptionist", "Member"];
        const roleMap = new Map();

        for (const roleName of roles) {
            const [role] = await db
                .insert(appRoles)
                .values({
                    name: roleName,
                    description: `Role for ${roleName}`,
                })
                .onConflictDoNothing()
                .returning();

            const finalRole = role ||
                (await db.select().from(appRoles).where(
                    eq(appRoles.name, roleName),
                ))[0];
            roleMap.set(roleName, finalRole);
        }

        // 5. Assign Branch Roles
        console.log("Assigning user branches...");

        if (employeeUser && finalBranch && roleMap.get("Trainer")) {
            // Manually check for duplicates since we lack a unique constraint or just delete first
            await db.delete(userBranches).where(
                eq(userBranches.userId, employeeUser.id),
            );
            await db.insert(userBranches).values({
                userId: employeeUser.id,
                branchId: finalBranch.id,
                roleId: roleMap.get("Trainer").id,
                isCurrentBranch: true,
            });
        }

        if (clientUser && finalBranch && roleMap.get("Member")) {
            await db.delete(userBranches).where(
                eq(userBranches.userId, clientUser.id),
            );
            await db.insert(userBranches).values({
                userId: clientUser.id,
                branchId: finalBranch.id,
                roleId: roleMap.get("Member").id,
                isCurrentBranch: true,
            });
        }

        console.log("✅ Seed completed successfully!");
        console.log("Credentials:");
        console.log("Admin: admin@novafit.com / password123");
        console.log("Employee: employee@novafit.com / password123");
        console.log("Client: client@novafit.com / password123");
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

main();
