import { AuthResponse } from "@/model/types";
import { UserWithoutPassword } from "../user.model";

export interface IAuthServices {
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (input: {
    email: string;
    password: string;
  }) => Promise<UserWithoutPassword>;
}
