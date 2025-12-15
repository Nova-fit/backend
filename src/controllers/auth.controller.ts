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
  
  const userAgent = c.req.header('user-agent');
  const ipAddress = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip'); // Basic IP detection

  const { user, tokens } = await authService.login(email, password, userAgent, ipAddress);
  return c.json({ tokens, user }, 200);
};

export const logout = async (c: Context) => {
  try {
    const { refreshToken } = await c.req.json();
    if (!refreshToken) {
        return c.json({ message: "Refresh token requerido" }, 400);
    }
    
    const authService = c.get('authService');
    await authService.logout(refreshToken);
    
    return c.json({ message: "Sesión cerrada exitosamente" }, 200);
  } catch (error) {
    return c.json({ message: "Error al cerrar sesión" }, 500);
  }
}

export default {
  register,
  login,
  logout
};
