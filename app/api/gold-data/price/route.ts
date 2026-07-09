import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

const priceSchema = z.object({
  price: z.number().positive("Price must be positive"),
  recordHistory: z.boolean().optional(),
});

// PUT /api/gold-data/price -> update the current gold price (and optionally
// append a price-history point for the day).
export async function PUT(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = priceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { price, recordHistory } = parsed.data;
  const now = new Date();

  try {
    const rows = await sql`
      UPDATE gold_meta
      SET current_gold_price = ${price}, last_updated = ${now.toISOString()}
      WHERE id = 1
      RETURNING current_gold_price, last_updated
    `;

    if (recordHistory) {
      const day = now.toISOString().slice(0, 10);
      await sql`
        INSERT INTO gold_price_history (date, price, timestamp)
        VALUES (${day}, ${price}, ${now.toISOString()})
        ON CONFLICT (date) DO UPDATE
        SET price = EXCLUDED.price, timestamp = EXCLUDED.timestamp
      `;
    }

    const meta = rows[0] as { current_gold_price: string; last_updated: string };
    return NextResponse.json({
      currentGoldPrice: Number(meta.current_gold_price),
      lastUpdated:
        typeof meta.last_updated === "string"
          ? meta.last_updated
          : new Date(meta.last_updated).toISOString(),
    });
  } catch (error) {
    console.error("Failed to update price:", error);
    return NextResponse.json(
      { error: "Failed to update price" },
      { status: 500 }
    );
  }
}
