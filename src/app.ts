import { Hono } from 'hono';
import { errorMiddleware } from '@/middleware/error.middleware';
import router from './routes';


const app = new Hono();

app.use('*', errorMiddleware);
app.route('/', router);

export default app;