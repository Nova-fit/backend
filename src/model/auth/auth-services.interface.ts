import { AuthResponse } from "@/model/types";
import { UserWithoutPassword } from "../user.model";

export interface IAuthServices {
  login: (email: string, password: string, userAgent?: string, ipAddress?: string) => Promise<AuthResponse>;
  logout: (refreshToken: string) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
  }) => Promise<UserWithoutPassword>;
}
