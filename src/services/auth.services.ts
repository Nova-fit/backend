import { UserWithoutPassword } from "@/model/user.model";
import { AuthResponse } from "@/types";
import { hashPassword, verifyPassword } from "@/utils/password";
import { TokenService } from "./token.services";
import { db } from "@/db";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";

export class AuthServices {
  constructor() {}

  async registerUser(input: {
    email: string;
    password: string;
  }): Promise<UserWithoutPassword> {
    const hashedPassword = await hashPassword(input.password);

    try {
        const [newUser] = await db
      .insert(users)
      .values({
        email: input.email,
        passwordHash: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return newUser!;
    } catch (error) {
      throw new Error("Error al crear el usuario");
    }
  }

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    const [user] = (await db.select().from(users).where(eq(users.email, email)));
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isValidPassword = await verifyPassword(password, user!.passwordHash);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = await TokenService.generateTokens(user.id, email);

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      tokens: token,
      user: userWithoutPassword,
      message: "Inicio de sesión exitoso",
    };
  }
}
