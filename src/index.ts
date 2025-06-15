import { serve } from '@hono/node-server';
import app from '@/app';
import { config } from '@/config/env';

serve({
  fetch: app.fetch,
  port: Number(config.PORT)
}, () => {
  console.log(`Server running on port ${config.PORT}`);
});