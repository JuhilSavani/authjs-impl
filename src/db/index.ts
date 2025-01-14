// database connection

import { loadEnvConfig } from '@next/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

export const db = drizzle({ client: pool });
