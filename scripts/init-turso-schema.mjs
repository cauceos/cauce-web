import { createClient } from '@libsql/client';
import 'dotenv/config';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function init() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      locale TEXT NOT NULL CHECK (locale IN ('en', 'es')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      ip_hash TEXT,
      user_agent TEXT,
      source TEXT,
      confirmed INTEGER DEFAULT 0,
      unsubscribed INTEGER DEFAULT 0
    );
  `);

  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_waitlist_email
    ON waitlist(email);
  `);

  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_waitlist_created_at
    ON waitlist(created_at DESC);
  `);

  console.log('✓ Schema initialized');

  // Show current count
  const count = await client.execute('SELECT COUNT(*) as n FROM waitlist');
  console.log(`✓ Current waitlist count: ${count.rows[0].n}`);
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
