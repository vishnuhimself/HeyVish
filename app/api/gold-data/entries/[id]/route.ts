import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { computeDerived, entryInputSchema, mapEntry } from "@/lib/goldData";

export const runtime = "nodejs";

// PUT /api/gold-data/entries/[id] -> update an existing entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

  try {
    const rows = await sql`
      UPDATE gold_entries SET
        date = ${input.date},
        price_per_gram = ${input.pricePerGram},
        extra_charges_per_gram = ${input.extraChargesPerGram},
        effective_price_per_gram = ${effectivePricePerGram},
        total_grams = ${input.totalGrams},
        total_investment = ${totalInvestment},
        notes = ${input.notes ?? ""},
        updated_at = now()
      WHERE id = ${id}
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
    if (rows.length === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    return NextResponse.json(mapEntry(rows[0] as never));
  } catch (error) {
    console.error("Failed to update entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

// DELETE /api/gold-data/entries/[id] -> remove an entry
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const rows = await sql`
      DELETE FROM gold_entries WHERE id = ${id} RETURNING id
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
