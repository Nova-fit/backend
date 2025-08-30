import userController from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth.middlewre';
import { Hono } from 'hono';

const user = new Hono();

user.use('*', authMiddleware);
user.get('/me', userController.me);

export default user;