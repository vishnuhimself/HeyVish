// Creates the Postgres schema for the gold portfolio.
// Run locally with:  node --env-file=.env.local scripts/db-migrate.mjs
// (safe to run repeatedly - uses IF NOT EXISTS)
import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error("❌ No DATABASE_URL / POSTGRES_URL found in environment.");
  process.exit(1);
}

const sql = neon(connectionString);

async function migrate() {
  console.log("🔧 Running migration...");

  await sql`
    CREATE TABLE IF NOT EXISTS gold_entries (
      id                        TEXT PRIMARY KEY,
      date                      DATE NOT NULL,
      price_per_gram            NUMERIC(14,4) NOT NULL,
      extra_charges_per_gram    NUMERIC(14,4) NOT NULL DEFAULT 0,
      effective_price_per_gram  NUMERIC(14,4) NOT NULL,
      total_grams               NUMERIC(14,4) NOT NULL,
      total_investment          NUMERIC(16,4) NOT NULL,
      notes                     TEXT,
      created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("✅ gold_entries ready");

  await sql`
    CREATE TABLE IF NOT EXISTS gold_meta (
      id                  INTEGER PRIMARY KEY DEFAULT 1,
      current_gold_price  NUMERIC(14,4) NOT NULL DEFAULT 0,
      last_updated        TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT gold_meta_single_row CHECK (id = 1)
    )
  `;
  // Ensure the single meta row exists.
  await sql`
    INSERT INTO gold_meta (id, current_gold_price)
    VALUES (1, 0)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("✅ gold_meta ready");

  await sql`
    CREATE TABLE IF NOT EXISTS gold_price_history (
      date       DATE PRIMARY KEY,
      price      NUMERIC(14,4) NOT NULL,
      timestamp  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("✅ gold_price_history ready");

  console.log("🎉 Migration complete");
}

migrate().catch((err) => {
  console.error("💥 Migration failed:", err);
  process.exit(1);
});
