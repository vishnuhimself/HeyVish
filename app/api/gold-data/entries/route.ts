import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sql } from "@/lib/db";
import { computeDerived, entryInputSchema, mapEntry } from "@/lib/goldData";

export const runtime = "nodejs";

// POST /api/gold-data/entries -> create a new entry
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = entryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const { effectivePricePerGram, totalInvestment } = computeDerived(input);
  const id = randomUUID();

  try {
    const rows = await sql`
      INSERT INTO gold_entries (
        id, date, price_per_gram, extra_charges_per_gram,
        effective_price_per_gram, total_grams, total_investment, notes
      ) VALUES (
        ${id}, ${input.date}, ${input.pricePerGram}, ${input.extraChargesPerGram},
        ${effectivePricePerGram}, ${input.totalGrams}, ${totalInvestment},
        ${input.notes ?? ""}
      )
      RETURNING
        id,
        TO_CHAR(date, 'YYYY-MM-DD') AS date,
        price_per_gram,
        extra_charges_per_gram,
        effective_price_per_gram,
        total_grams,
        total_investment,
        notes
    `;
    return NextResponse.json(mapEntry(rows[0] as never), { status: 201 });
  } catch (error) {
    console.error("Failed to create entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
