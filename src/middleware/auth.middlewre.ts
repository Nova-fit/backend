import { verifyPassword } from '@/utils/password';
import { Context } from 'hono';
import { TokenService } from '@/services/token.services';
import { JWTPayload } from '@/types';


export const authMiddleware = async (c: Context, next: Function) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payload = await TokenService.verifyAccessToken(token);
    c.set('jwtPayload', payload);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};