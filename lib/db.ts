import postgres from "postgres";

// Server-only PostgreSQL client. The connection string is never exposed to the browser.
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
export const sql = postgres(connectionString, { max: 5, idle_timeout: 20 });
