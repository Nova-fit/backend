import { Hono } from 'hono';
import { authMiddleware } from '@/middleware/auth.middlewre';
import { db } from '@/config/database';

const user = new Hono();

user.use('*', authMiddleware);

user.get('/me', async (c) => {
  const payload = c.get('jwtPayload');

  const user = await db.findUserById( payload.userId);
  if (!user) return c.json({ error: 'User not found' }, 404);
  
  const { password, ...safeUser } = user;
  return c.json(safeUser);
});

export default user;