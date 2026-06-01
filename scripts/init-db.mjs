import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to initialize the database.');
}

const schemaPath = join(process.cwd(), 'packages/loveui-pro/pro-access-schema.sql');
const schema = await readFile(schemaPath, 'utf8');
const pool = new Pool({
  connectionString: databaseUrl,
  max: 1,
  ssl:
    process.env.DATABASE_SSL === 'true'
      ? {
          rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
        }
      : undefined,
});

try {
  await pool.query(schema);
  console.log('Initialized LoveUI Pro database schema.');
} finally {
  await pool.end();
}
