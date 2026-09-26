import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  if (_sql) return _sql;
  const connectionString = process.env.DASHBOARD_DATABASE_URL;
  if (!connectionString) {
    throw new Error("DASHBOARD_DATABASE_URL not configured");
  }
  _sql = postgres(connectionString, { max: 5, idle_timeout: 20 });
  return _sql;
}
