"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const schema_1 = require("./schema");
const bcrypt_1 = require("bcrypt");
const drizzle_orm_1 = require("drizzle-orm");
async function main() {
    console.log("🌱 Starting seed...");
    try {
        const passwordHash = await (0, bcrypt_1.hash)("password123", 10);
        console.log("Creating users...");
        let [adminUser] = await index_1.db
            .insert(schema_1.users)
            .values({
            email: "admin@novafit.com",
            passwordHash,
            userType: "admin",
            isActive: true,
        })
            .onConflictDoUpdate({
            target: schema_1.users.email,
            set: { passwordHash },
        })
            .returning();
        if (!adminUser) {
            const found = await index_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, "admin@novafit.com"));
            adminUser = found[0];
        }
        if (adminUser) {
            await index_1.db.insert(schema_1.profiles).values({
                userId: adminUser.id,
                firstName: "Admin",
                lastName: "User",
            }).onConflictDoNothing();
        }
        let [employeeUser] = await index_1.db
            .insert(schema_1.users)
            .values({
            email: "employee@novafit.com",
            passwordHash,
            userType: "employee",
            isActive: true,
        })
            .onConflictDoUpdate({
            target: schema_1.users.email,
            set: { passwordHash },
        })
            .returning();
        if (!employeeUser) {
            const found = await index_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, "employee@novafit.com"));
            employeeUser = found[0];
        }
        if (employeeUser) {
            await index_1.db.insert(schema_1.profiles).values({
                userId: employeeUser.id,
                firstName: "Employee",
                lastName: "User",
            }).onConflictDoNothing();
        }
        let [clientUser] = await index_1.db
            .insert(schema_1.users)
            .values({
            email: "client@novafit.com",
            passwordHash,
            userType: "client",
            isActive: true,
        })
            .onConflictDoUpdate({
            target: schema_1.users.email,
            set: { passwordHash },
        })
            .returning();
        if (!clientUser) {
            const found = await index_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, "client@novafit.com"));
            clientUser = found[0];
        }
        if (clientUser) {
            await index_1.db.insert(schema_1.profiles).values({
                userId: clientUser.id,
                firstName: "Client",
                lastName: "User",
            }).onConflictDoNothing();
        }
        console.log("Creating organization...");
        if (!adminUser) {
            throw new Error("Admin user could not be created or found");
        }
        const [org] = await index_1.db
            .insert(schema_1.organizations)
            .values({
            name: "Nova Fit HQ",
            description: "Headquarters",
            email: "hq@novafit.com",
            userId: adminUser.id,
        })
            .onConflictDoNothing()
            .returning();
        const finalOrg = org ||
            (await index_1.db.select().from(schema_1.organizations).where((0, drizzle_orm_1.eq)(schema_1.organizations.name, "Nova Fit HQ")))[0];
        if (!finalOrg) {
            throw new Error("Organization 'Nova Fit HQ' could not be created or found");
        }
        console.log("Creating branch...");
        const [branch] = await index_1.db
            .insert(schema_1.branches)
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
            (await index_1.db.select().from(schema_1.branches).where((0, drizzle_orm_1.eq)(schema_1.branches.code, "B001")))[0];
        console.log("Creating app roles...");
        const roles = ["Manager", "Trainer", "Receptionist", "Member"];
        const roleMap = new Map();
        for (const roleName of roles) {
            const [role] = await index_1.db
                .insert(schema_1.appRoles)
                .values({
                name: roleName,
                description: `Role for ${roleName}`,
            })
                .onConflictDoNothing()
                .returning();
            const finalRole = role ||
                (await index_1.db.select().from(schema_1.appRoles).where((0, drizzle_orm_1.eq)(schema_1.appRoles.name, roleName)))[0];
            roleMap.set(roleName, finalRole);
        }
        console.log("Assigning user branches...");
        if (employeeUser && finalBranch && roleMap.get("Trainer")) {
            await index_1.db.delete(schema_1.userBranches).where((0, drizzle_orm_1.eq)(schema_1.userBranches.userId, employeeUser.id));
            await index_1.db.insert(schema_1.userBranches).values({
                userId: employeeUser.id,
                branchId: finalBranch.id,
                roleId: roleMap.get("Trainer").id,
                isCurrentBranch: true,
            });
        }
        if (clientUser && finalBranch && roleMap.get("Member")) {
            await index_1.db.delete(schema_1.userBranches).where((0, drizzle_orm_1.eq)(schema_1.userBranches.userId, clientUser.id));
            await index_1.db.insert(schema_1.userBranches).values({
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
    }
    catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
    finally {
        process.exit(0);
    }
}
main();
//# sourceMappingURL=seed.js.map