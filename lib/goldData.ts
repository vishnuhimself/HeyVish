import { z } from "zod";
import { sql } from "@/lib/db";
import type { GoldEntry, GoldData, PriceHistoryEntry } from "@/lib/goldStorage";

// Shared server-side helpers for the gold data API.

export const entryInputSchema = z.object({
  date: z.string().min(1, "Date is required"),
  pricePerGram: z.number().positive("Price must be positive"),
  extraChargesPerGram: z.number().min(0, "Extra charges cannot be negative"),
  totalGrams: z.number().positive("Weight must be positive"),
  notes: z.string().optional(),
});

export type EntryInput = z.infer<typeof entryInputSchema>;

type EntryRow = {
  id: string;
  date: string;
  price_per_gram: string;
  extra_charges_per_gram: string;
  effective_price_per_gram: string;
  total_grams: string;
  total_investment: string;
  notes: string | null;
};

export function mapEntry(row: EntryRow): GoldEntry {
  return {
    id: row.id,
    // Postgres DATE comes back as YYYY-MM-DD (or a Date); normalize to string.
    date: typeof row.date === "string" ? row.date : String(row.date),
    pricePerGram: Number(row.price_per_gram),
    extraChargesPerGram: Number(row.extra_charges_per_gram),
    effectivePricePerGram: Number(row.effective_price_per_gram),
    totalGrams: Number(row.total_grams),
    totalInvestment: Number(row.total_investment),
    notes: row.notes ?? "",
  };
}

export function computeDerived(input: EntryInput) {
  const effectivePricePerGram = input.pricePerGram + input.extraChargesPerGram;
  const totalInvestment = effectivePricePerGram * input.totalGrams;
  return { effectivePricePerGram, totalInvestment };
}

export async function getGoldData(): Promise<GoldData> {
  const [entryRows, metaRows, historyRows] = await Promise.all([
    sql`
      SELECT
        id,
        TO_CHAR(date, 'YYYY-MM-DD') AS date,
        price_per_gram,
        extra_charges_per_gram,
        effective_price_per_gram,
        total_grams,
        total_investment,
        notes
      FROM gold_entries
      ORDER BY date DESC
    `,
    sql`SELECT current_gold_price, last_updated FROM gold_meta WHERE id = 1`,
    sql`
      SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, price, timestamp
      FROM gold_price_history
      ORDER BY date ASC
    `,
  ]);

  const meta = metaRows[0] as
    | { current_gold_price: string; last_updated: string }
    | undefined;

  const priceHistory: PriceHistoryEntry[] = (
    historyRows as { date: string; price: string; timestamp: string }[]
  ).map((r) => ({
    date: typeof r.date === "string" ? r.date : String(r.date),
    price: Number(r.price),
    timestamp:
      typeof r.timestamp === "string"
        ? r.timestamp
        : new Date(r.timestamp).toISOString(),
  }));

  return {
    entries: (entryRows as EntryRow[]).map(mapEntry),
    currentGoldPrice: meta ? Number(meta.current_gold_price) : 0,
    lastUpdated: meta
      ? typeof meta.last_updated === "string"
        ? meta.last_updated
        : new Date(meta.last_updated).toISOString()
      : new Date().toISOString(),
    priceHistory,
  };
}
