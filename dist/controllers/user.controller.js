"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("@/db/schema");
const me = async (c) => {
    const payload = c.get("jwtPayload");
    const [user] = await db_1.db
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, payload.userId));
    if (!user)
        return c.json({ error: "User not found" }, 404);
    const [profile] = await db_1.db
        .select()
        .from(schema_1.profiles)
        .where((0, drizzle_orm_1.eq)(schema_1.profiles.userId, user.id));
    if (!profile)
        return c.json({ error: "Profile not found" }, 404);
    const { passwordHash, ...safeUser } = user;
    return c.json({ safeUser, profile });
};
exports.default = {
    me,
};
//# sourceMappingURL=user.controller.js.map