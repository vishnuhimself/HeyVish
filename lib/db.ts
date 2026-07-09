import { neon } from "@neondatabase/serverless";

// Server-only Neon client. The connection string is read from the environment
// (injected by the Vercel Neon integration in production, and from .env.local
// during local dev). It is NEVER exposed to the browser.
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error(
    "No Postgres connection string found. Set DATABASE_URL or POSTGRES_URL."
  );
}

// `sql` is a tagged-template query function that safely parameterizes inputs.
export const sql = neon(connectionString);
