import { Hono } from 'hono';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = new Hono();

router.route('/auth', authRoutes);
router.route('/users', userRoutes);

export default router;