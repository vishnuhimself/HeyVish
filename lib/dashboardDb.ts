import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DASHBOARD_DATABASE_URL;

if (!connectionString) {
  throw new Error("DASHBOARD_DATABASE_URL not configured");
}

export const sql = neon(connectionString);