import type { User } from "./types";

export type UserCreateInput = Omit<User, "id">;
export type UserWithoutPassword = Omit<User, "password">;
