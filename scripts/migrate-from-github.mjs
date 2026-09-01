// One-off migration: decrypt the old gold-data blob and load it into Postgres.
//
// Usage:
//   1) Save the raw blob to /tmp/gold-blob.txt (done via gh api)
//   2) node --env-file=.env.local scripts/migrate-from-github.mjs
//
// Safe to re-run: entries upsert by id.
import { readFileSync } from "fs";
import CryptoJS from "crypto-js";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

const KEY = process.env.MIGRATE_KEY || "vishnu0923";
const BLOB_PATH = process.env.BLOB_PATH || "/tmp/gold-blob.txt";

const raw = readFileSync(BLOB_PATH, "utf8").trim();

function tryDecrypt(cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, KEY);
    const text = bytes.toString(CryptoJS.enc.Utf8);
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// The blob may be the raw CryptoJS string, or base64-wrapped. Try both.
let data = tryDecrypt(raw);
if (!data) {
  try {
    const unwrapped = Buffer.from(raw, "base64").toString("utf8");
    data = tryDecrypt(unwrapped);
  } catch {
    /* ignore */
  }
}

if (!data) {
  console.error(
    "❌ Could not decrypt the blob with the provided key. " +
      "Check MIGRATE_KEY or the blob file."
  );
  process.exit(1);
}

const entries = Array.isArray(data.entries) ? data.entries : [];
const priceHistory = Array.isArray(data.priceHistory) ? data.priceHistory : [];

console.log("✅ Decrypted successfully.");
console.log(`   entries:        ${entries.length}`);
console.log(`   currentGoldPrice: ${data.currentGoldPrice}`);
console.log(`   lastUpdated:    ${data.lastUpdated}`);
console.log(`   priceHistory:   ${priceHistory.length} points`);
console.log("--- entries preview ---");
for (const e of entries) {
  console.log(
    `   ${e.date}  ${e.totalGrams}g  @₹${e.pricePerGram}  invest ₹${e.totalInvestment}  ${e.notes || ""}`
  );
}

if (process.env.DRY_RUN === "1") {
  console.log("\n(DRY_RUN=1 set — not writing to the database.)");
  process.exit(0);
}

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error("❌ No DATABASE_URL / POSTGRES_URL in environment.");
  process.exit(1);
}

const sql = neon(connectionString);

function normalizeDate(d) {
  // Accept YYYY-MM-DD or anything Date can parse; store as YYYY-MM-DD.
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

let inserted = 0;
for (const e of entries) {
  const id = e.id || randomUUID();
  const date = normalizeDate(e.date);
  if (!date) {
    console.warn(`   ⚠️  skipping entry with unparseable date: ${e.date}`);
    continue;
  }
  const pricePerGram = Number(e.pricePerGram) || 0;
  const extra = Number(e.extraChargesPerGram) || 0;
  const effective =
    Number(e.effectivePricePerGram) || pricePerGram + extra;
  const totalGrams = Number(e.totalGrams) || 0;
  const totalInvestment =
    Number(e.totalInvestment) || effective * totalGrams;

  await sql`
    INSERT INTO gold_entries (
      id, date, price_per_gram, extra_charges_per_gram,
      effective_price_per_gram, total_grams, total_investment, notes
    ) VALUES (
      ${id}, ${date}, ${pricePerGram}, ${extra},
      ${effective}, ${totalGrams}, ${totalInvestment}, ${e.notes || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      date = EXCLUDED.date,
      price_per_gram = EXCLUDED.price_per_gram,
      extra_charges_per_gram = EXCLUDED.extra_charges_per_gram,
      effective_price_per_gram = EXCLUDED.effective_price_per_gram,
      total_grams = EXCLUDED.total_grams,
      total_investment = EXCLUDED.total_investment,
      notes = EXCLUDED.notes,
      updated_at = now()
  `;
  inserted += 1;
}

// Restore price history (one row per day).
let historyInserted = 0;
for (const h of priceHistory) {
  const date = normalizeDate(h.date);
  const price = Number(h.price);
  if (!date || !price) continue;
  const ts = h.timestamp || new Date().toISOString();
  await sql`
    INSERT INTO gold_price_history (date, price, timestamp)
    VALUES (${date}, ${price}, ${ts})
    ON CONFLICT (date) DO UPDATE
    SET price = EXCLUDED.price, timestamp = EXCLUDED.timestamp
  `;
  historyInserted += 1;
}

console.log(
  `\n🎉 Migration done: ${inserted} entries, ${historyInserted} history points upserted.`
);
console.log(
  "   (Left the current gold price as-is; the scraper keeps it fresh.)"
);
