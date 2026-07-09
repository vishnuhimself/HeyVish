import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (_sql) return _sql;
  const connectionString = process.env.DASHBOARD_DATABASE_URL;
  if (!connectionString) {
    throw new Error("DASHBOARD_DATABASE_URL not configured");
  }
  _sql = neon(connectionString);
  return _sql;
}