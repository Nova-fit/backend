import { sign, verify } from 'hono/jwt'
import { config } from '@/config/env'
import { db } from '@/config/database'
import type { AuthTokens, JWTPayload } from '@/types'

export class TokenService {
  /**
   * Genera un par de tokens (access + refresh) para un usuario
   */
  static async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const now = Math.floor(Date.now() / 1000)
    
    // Access Token (corta duración)
    const accessToken = await sign({
      userId,
      email,
      type: 'access',
      exp: now + config.ACCESS_TOKEN_EXPIRES_IN,
      iat: now
    }, config.JWT_SECRET)
    
    // Refresh Token (larga duración)
    const refreshToken = await sign({
      userId,
      email,
      type: 'refresh',
      exp: now + config.REFRESH_TOKEN_EXPIRES_IN,
      iat: now
    }, config.JWT_SECRET)
    
    // Guardar refresh token en la base de datos
    await db.saveRefreshToken(refreshToken)
    
    return { accessToken, refreshToken }
  }

  /**
   * Verifica y decodifica un token JWT
   */
  static async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const payload = await verify(token, config.JWT_SECRET) as unknown as JWTPayload
      return payload
    } catch (error) {
      throw new Error('Token inválido o expirado')
    }
  }

  /**
   * Verifica un access token específicamente
   */
  static async verifyAccessToken(token: string): Promise<JWTPayload> {
    const payload = await this.verifyToken(token)
    
    if (payload.type !== 'access') {
      throw new Error('Tipo de token inválido')
    }
    
    return payload as JWTPayload
  }

  /**
   * Verifica un refresh token específicamente
   */
  static async verifyRefreshToken(token: string): Promise<JWTPayload> {
    const payload = await this.verifyToken(token)
    
    if (payload.type !== 'refresh') {
      throw new Error('Tipo de token inválido')
    }
    
    // Verificar que el refresh token esté en nuestra lista válida
    const isValid = await db.isRefreshTokenValid(token)
    if (!isValid) {
      throw new Error('Token inválido o expirado')
    }

    return payload
  }
}