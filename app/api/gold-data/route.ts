import { NextResponse } from "next/server";
import { getGoldData } from "@/lib/goldData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/gold-data -> full portfolio (entries + current price + history)
export async function GET() {
  try {
    const data = await getGoldData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load gold data:", error);
    return NextResponse.json(
      { error: "Failed to load gold data" },
      { status: 500 }
    );
  }
}
