import { Context } from "hono";

export const register = async (c: Context) => {
  const { email, password } = (await c.req.json()) as {
    email: string;
    password: string;
  };
  const authService = c.get('authService');

  try {
    const user = await authService.register({
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
  const authService = c.get('authService');
  const { user, tokens } = await authService.login(email, password);
  return c.json({ tokens, user }, 200);
};

export default {
  register,
  login,
};
