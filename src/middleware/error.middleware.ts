import { Context } from 'hono';

export const errorMiddleware = async (c: Context, next: Function) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    const status = (error as any).status || 500;
    return c.json({ error: (error as Error).message }, status);
  }
};