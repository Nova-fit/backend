"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const password_1 = require("@/utils/password");
const token_services_1 = require("./token.services");
const db_1 = require("@/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("@/db/schema");
class AuthServices {
    constructor() { }
    async register(input) {
        const hashedPassword = await (0, password_1.hashPassword)(input.password);
        try {
            const [newUser] = await db_1.db
                .insert(schema_1.users)
                .values({
                email: input.email,
                passwordHash: hashedPassword,
            })
                .returning({
                id: schema_1.users.id,
                email: schema_1.users.email,
                isActive: schema_1.users.isActive,
                createdAt: schema_1.users.createdAt,
                updatedAt: schema_1.users.updatedAt,
            });
            if (!newUser) {
                throw new Error("Error al crear el usuario");
            }
            const [newProfile] = await db_1.db
                .insert(schema_1.profiles)
                .values({
                userId: newUser.id,
            }).returning();
            if (!newProfile) {
                throw new Error("Error al crear el perfil");
            }
            return newUser;
        }
        catch (error) {
            throw new Error("Error al crear el usuario");
        }
    }
    async login(email, password, userAgent, ipAddress) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const isValidPassword = await (0, password_1.verifyPassword)(password, user.passwordHash);
        if (!isValidPassword) {
            throw new Error("Contraseña incorrecta");
        }
        const token = await token_services_1.TokenService.generateTokens(user.id, email, userAgent, ipAddress);
        const { passwordHash: _, ...userWithoutPassword } = user;
        return {
            tokens: token,
            user: userWithoutPassword,
            message: "Inicio de sesión exitoso",
        };
    }
    async logout(refreshToken) {
        await token_services_1.TokenService.revokeToken(refreshToken);
    }
    async refreshToken(token, userAgent, ipAddress) {
        const payload = await token_services_1.TokenService.verifyRefreshToken(token);
        await token_services_1.TokenService.revokeToken(token);
        const newTokens = await token_services_1.TokenService.generateTokens(payload.userId, payload.email, userAgent, ipAddress);
        return newTokens;
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth.services.js.map