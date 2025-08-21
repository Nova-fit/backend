import { Hono } from 'hono';
import { authMiddleware } from '@/middleware/auth.middlewre';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { profiles, users } from '@/db/schema';

const user = new Hono();

user.use('*', authMiddleware);

user.get('/me', async (c) => {
  const payload = c.get('jwtPayload');

  const [user] = await db.select().from(users).where(eq(users.id, payload.userId));
  if (!user) return c.json({ error: 'User not found' }, 404);

  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, user.id));
  if (!profile) return c.json({ error: 'Profile not found' }, 404);
  
  const { passwordHash, ...safeUser } = user;

  return c.json({safeUser, profile});

});

export default user;