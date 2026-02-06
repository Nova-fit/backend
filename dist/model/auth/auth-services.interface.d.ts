import { AuthResponse, AuthTokens } from "@/model/types";
import { UserWithoutPassword } from "../user.model";
export interface IAuthServices {
    login: (email: string, password: string, userAgent?: string, ipAddress?: string) => Promise<AuthResponse>;
    refreshToken: (token: string, userAgent?: string, ipAddress?: string) => Promise<AuthTokens>;
    logout: (refreshToken: string) => Promise<void>;
    register: (input: {
        email: string;
        password: string;
    }) => Promise<UserWithoutPassword>;
}
//# sourceMappingURL=auth-services.interface.d.ts.map