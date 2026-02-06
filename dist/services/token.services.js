"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jwt_1 = require("hono/jwt");
const env_1 = require("@/config/env");
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class TokenService {
    static async generateTokens(userId, email, userAgent, ipAddress) {
        const now = Math.floor(Date.now() / 1000);
        const accessToken = await (0, jwt_1.sign)({
            userId,
            email,
            type: "access",
            exp: now + env_1.config.ACCESS_TOKEN_EXPIRES_IN,
            iat: now,
        }, env_1.config.JWT_SECRET);
        const refreshToken = await (0, jwt_1.sign)({
            userId,
            email,
            type: "refresh",
            exp: now + env_1.config.REFRESH_TOKEN_EXPIRES_IN,
            iat: now,
        }, env_1.config.JWT_SECRET);
        await db_1.db.insert(schema_1.sessions).values({
            expiresAt: new Date((now + env_1.config.REFRESH_TOKEN_EXPIRES_IN) * 1000),
            userId,
            tokenHash: refreshToken,
            userAgent: userAgent || "unknown",
            ipAddress: ipAddress || null,
            createdAt: new Date(),
            isRevoked: false,
        });
        return { accessToken, refreshToken };
    }
    static async verifyToken(token) {
        try {
            const payload = (await (0, jwt_1.verify)(token, env_1.config.JWT_SECRET));
            return payload;
        }
        catch (error) {
            throw new Error("Token inválido o expirado");
        }
    }
    static async verifyAccessToken(token) {
        const payload = await this.verifyToken(token);
        if (payload.type !== "access") {
            throw new Error("Tipo de token inválido");
        }
        return payload;
    }
    static async verifyRefreshToken(token) {
        const payload = await this.verifyToken(token);
        if (payload.type !== "refresh") {
            throw new Error("Tipo de token inválido");
        }
        const [session] = await db_1.db
            .select()
            .from(schema_1.sessions)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.sessions.tokenHash, token), (0, drizzle_orm_1.eq)(schema_1.sessions.userId, payload.userId)));
        if (session && session.isRevoked) {
            await this.revokeAllUserSessions(payload.userId);
            throw new Error("Security Alert: Token reused. All sessions revoked.");
        }
        if (!session) {
            throw new Error("Token inválido");
        }
        if (new Date() > session.expiresAt) {
            throw new Error("Sesión expirada");
        }
        return payload;
    }
    static async revokeToken(token) {
        await db_1.db
            .update(schema_1.sessions)
            .set({ isRevoked: true })
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.tokenHash, token));
    }
    static async revokeAllUserSessions(userId) {
        await db_1.db
            .update(schema_1.sessions)
            .set({ isRevoked: true })
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.userId, userId));
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.services.js.map