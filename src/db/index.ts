import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '@/config/env'
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'] || config['DATABASE_URL']!,
});
export const db = drizzle(pool, { schema });


