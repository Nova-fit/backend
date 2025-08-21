import { Hono } from 'hono';
import { AuthServices } from '@/services/auth.services';

const auth = new Hono();

const authServices = new AuthServices();

auth.post('/register', async (c) => {
    const { email, password } = await c.req.json() as {
        email: string
        password: string;
    };
    
  try {
    const user = await authServices.registerUser({
    email,
    password,
    });

     return c.json({ message: 'User registered', userId: user.id }, 201);
  } catch (error) {
    return  c.json({ message: error }, 400);
     
  }


 
}).post('/login', async (c) => {
  const { email, password } = await c.req.json();
  const { user, tokens } = await authServices.loginUser(email, password);
  return c.json({ tokens, user }, 200);
});

export default auth;