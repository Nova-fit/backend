import { UserWithoutPassword } from "@/model/user.model";
import { AuthResponse } from "@/types";
import { hashPassword, verifyPassword } from "@/utils/password";
import { TokenService } from "./token.services";
import { db } from "@/db";
import { eq } from "drizzle-orm";

import { users, profiles } from "@/db/schema";
import { IAuthServices } from "@/model/auth/auth-services.interface";


export class AuthServices implements IAuthServices {
  constructor() {}

  async register(input: {
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

      if (!newUser) {
        throw new Error("Error al crear el usuario");
      }

      const [newProfile] = await db
      .insert(profiles)
      .values({
        userId: newUser.id,
      }).returning();


      if (!newProfile) {
        throw new Error("Error al crear el perfil");
      }

    return newUser;
    } catch (error) {
      throw new Error("Error al crear el usuario");
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
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