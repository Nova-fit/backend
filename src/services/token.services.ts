import { sign, verify } from "hono/jwt";
import { config } from "@/config/env";
import { db } from "@/db";

import type { AuthTokens, JWTPayload } from "@/model/types";
import { sessions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export class TokenService {
  /**
   * Genera un par de tokens (access + refresh) para un usuario
   */
  static async generateTokens(
    userId: string,
    email: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<AuthTokens> {
    const now = Math.floor(Date.now() / 1000);

    // Access Token (corta duración)
    const accessToken = await sign(
      {
        userId,
        email,
        type: "access",
        exp: now + config.ACCESS_TOKEN_EXPIRES_IN,
        iat: now,
      },
      config.JWT_SECRET,
    );

    // Refresh Token (larga duración)
    const refreshToken = await sign(
      {
        userId,
        email,
        type: "refresh",
        exp: now + config.REFRESH_TOKEN_EXPIRES_IN,
        iat: now,
      },
      config.JWT_SECRET,
    );

    // Guardar refresh token en la base de datos
    await db.insert(sessions).values({
      expiresAt: new Date((now + config.REFRESH_TOKEN_EXPIRES_IN) * 1000),
      userId,
      tokenHash: refreshToken, // En producción idealmente hashearlo, pero por ahora guardamos el token
      userAgent: userAgent || "unknown",
      ipAddress: ipAddress || null,
      createdAt: new Date(),
      isRevoked: false,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verifica y decodifica un token JWT
   */
  static async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const payload = (await verify(
        token,
        config.JWT_SECRET,
      )) as unknown as JWTPayload;
      return payload;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  /**
   * Verifica un access token específicamente
   */
  static async verifyAccessToken(token: string): Promise<JWTPayload> {
    const payload = await this.verifyToken(token);

    if (payload.type !== "access") {
      throw new Error("Tipo de token inválido");
    }

    return payload as JWTPayload;
  }

  /**
   * Verifica un refresh token específicamente
   */
  static async verifyRefreshToken(token: string): Promise<JWTPayload> {
    const payload: JWTPayload = await this.verifyToken(token);

    if (payload.type !== "refresh") {
      throw new Error("Tipo de token inválido");
    }

    // Verificar que el refresh token esté en nuestra lista válida y no revocado
    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.tokenHash, token),
          eq(sessions.userId, payload.userId),
        ),
      );

    if (session && session.isRevoked) {
      // REUSE DETECTION: Si intentan usar un token ya revocado, es posible robo.
      // Invalidamos TODAS las sesiones del usuario por seguridad.
      await this.revokeAllUserSessions(payload.userId);
      throw new Error("Security Alert: Token reused. All sessions revoked.");
    }

    if (!session) {
      throw new Error("Token inválido");
    }

    // Verificar expiración de sesión explícitamente (aunque JWT lo hace, DB es fuente de verdad)
    if (new Date() > session.expiresAt) {
      throw new Error("Sesión expirada");
    }

    return payload;
  }

  /**
   * Revoca un refresh token
   */
  static async revokeToken(token: string): Promise<void> {
    await db
      .update(sessions)
      .set({ isRevoked: true })
      .where(eq(sessions.tokenHash, token));
  }

  /**
   * Revoca TODAS las sesiones de un usuario (Security fallback)
   */
  static async revokeAllUserSessions(userId: string): Promise<void> {
    await db
      .update(sessions)
      .set({ isRevoked: true })
      .where(eq(sessions.userId, userId));
  }
}
