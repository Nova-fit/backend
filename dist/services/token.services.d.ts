import type { AuthTokens, JWTPayload } from "@/model/types";
export declare class TokenService {
    static generateTokens(userId: string, email: string, userAgent?: string, ipAddress?: string): Promise<AuthTokens>;
    static verifyToken(token: string): Promise<JWTPayload>;
    static verifyAccessToken(token: string): Promise<JWTPayload>;
    static verifyRefreshToken(token: string): Promise<JWTPayload>;
    static revokeToken(token: string): Promise<void>;
    static revokeAllUserSessions(userId: string): Promise<void>;
}
//# sourceMappingURL=token.services.d.ts.map