import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/models.ts',
  dialect: 'postgresql',
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true
});
