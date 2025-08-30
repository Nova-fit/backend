import { AuthServices } from "@/services/auth.services";
import { Context } from "hono";

const authServices = new AuthServices();

export const register = async (c: Context) => {
  const { email, password } = (await c.req.json()) as {
    email: string;
    password: string;
  };

  try {
    const user = await authServices.registerUser({
      email,
      password,
    });

    return c.json({ message: "User registered", userId: user.id }, 201);
  } catch (error) {
    return c.json({ message: error }, 400);
  }
};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  const { user, tokens } = await authServices.loginUser(email, password);
  return c.json({ tokens, user }, 200);
};

export default {
  register,
  login,
};
