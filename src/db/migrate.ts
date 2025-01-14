import { loadEnvConfig } from '@next/env';
import { migrate } from 'drizzle-orm/node-postgres/migrator'; 
import { db }  from '@/db/index';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  console.log('⏳ Running migrations...');

  const start = Date.now();

  // Run migrations from the specified folder
  await migrate(db, { migrationsFolder: 'src/db/migrations' });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`); 

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});