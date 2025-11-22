import { Hono } from 'hono';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';

const router = new Hono();

router.route('/auth', authRoutes);
router.route('/users', userRoutes);
router.route('/profile', profileRoutes);

export default router;