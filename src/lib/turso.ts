import { createClient } from '@libsql/client';

// Read from process.env first (populated at runtime on Vercel serverless),
// falling back to import.meta.env (available in the local dev server).
const url = process.env.TURSO_DATABASE_URL ?? import.meta.env.TURSO_DATABASE_URL;
const authToken =
  process.env.TURSO_AUTH_TOKEN ?? import.meta.env.TURSO_AUTH_TOKEN;

export const turso = createClient({
  url,
  authToken,
});
