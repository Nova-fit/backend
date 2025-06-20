import { Hono } from 'hono';
import { AuthServices } from '@/services/auth.services';

const auth = new Hono();

const authServices = new AuthServices();

auth.post('/register', async (c) => {
    const { email, password } = await c.req.json() as {
        username: string
        email: string
        password: string;
    };
    const user = await authServices.registerUser({
    email,
    password,
  });
  return c.json({ message: 'User registered', userId: user.id }, 201);
}).post('/login', async (c) => {
  const { email, password } = await c.req.json();
  const { user, tokens } = await authServices.loginUser(email, password);
  return c.json({ tokens, user });
});

export default auth;