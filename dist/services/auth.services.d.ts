import { UserWithoutPassword } from "@/model/user.model";
import { IAuthServices } from "@/model/auth/auth-services.interface";
import { AuthResponse, AuthTokens } from "@/model/types";
export declare class AuthServices implements IAuthServices {
    constructor();
    register(input: {
        email: string;
        password: string;
    }): Promise<UserWithoutPassword>;
    login(email: string, password: string, userAgent?: string, ipAddress?: string): Promise<AuthResponse>;
    logout(refreshToken: string): Promise<void>;
    refreshToken(token: string, userAgent?: string, ipAddress?: string): Promise<AuthTokens>;
}
//# sourceMappingURL=auth.services.d.ts.map