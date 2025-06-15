import { db } from "@/config/database";
import { UserCreateInput, UserWithoutPassword } from "@/model/user.model";
import { AuthResponse, AuthTokens, User } from "@/types";
import { hashPassword, verifyPassword } from "@/utils/password";
import { TokenService } from "./token.services";


export class AuthServices {
  constructor() {}

  async registerUser(input: { email: string, password: string}): Promise<UserWithoutPassword> {
    const hashedPassword = await hashPassword(input.password);
    const {password, ...rest} = await db.createUser({
      ...input,
      password: hashedPassword,
    });
    return  rest
    }
    
    async loginUser(email: string, password: string): Promise<AuthResponse> {
        const user = await db.findUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new Error('Contraseña incorrecta');
        }

        const token = await TokenService.generateTokens(user.id, email );

        const { password: _, ...userWithoutPassword } = user;
        return {
            tokens: token,
            user: userWithoutPassword,
            message: 'Inicio de sesión exitoso',
        };
    }
    
    
}