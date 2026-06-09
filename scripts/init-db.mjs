import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Pool } from 'pg';

await loadLocalEnv();

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

async function loadLocalEnv() {
  for (const fileName of ['.env.local', '.env']) {
    try {
      const content = await readFile(join(process.cwd(), fileName), 'utf8');

      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith('#')) continue;

        const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

        if (!match) continue;

        const [, key, rawValue] = match;

        if (process.env[key] !== undefined) continue;

        process.env[key] = parseEnvValue(rawValue);
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
}

function parseEnvValue(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}
