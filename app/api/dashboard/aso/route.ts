import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/dashboardDb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    // Latest rankings per keyword
    const rankings = await sql`
      WITH latest AS (
        SELECT DISTINCT ON (r.keyword_id) 
          r.keyword_id, r.date, r.position, r.found
        FROM rankings r
        WHERE r.date >= CURRENT_DATE - ${days}::INTEGER
        ORDER BY r.keyword_id, r.date DESC
      ),
      prev AS (
        SELECT r.keyword_id, r.position as prev_position, r.found as prev_found
        FROM rankings r
        WHERE r.date = (CURRENT_DATE - INTERVAL '1 day')
      )
      SELECT 
        a.name as app,
        k.keyword,
        l.position,
        l.found,
        l.date,
        p.prev_position,
        p.prev_found
      FROM latest l
      JOIN keywords k ON l.keyword_id = k.id
      JOIN apps a ON k.app_id = a.id
      LEFT JOIN prev p ON l.keyword_id = p.keyword_id
      ORDER BY a.name, l.position NULLS LAST
    `;

    // Trend data: last 7 days per keyword with position changes
    const history = await sql`
      SELECT 
        a.name as app,
        k.keyword,
        r.date,
        r.position,
        r.found
      FROM rankings r
      JOIN keywords k ON r.keyword_id = k.id
      JOIN apps a ON k.app_id = a.id
      WHERE r.date >= CURRENT_DATE - 7
        AND r.found = TRUE
      ORDER BY a.name, k.keyword, r.date
    `;

    // Summary per app
    const summary = await sql`
      SELECT 
        a.name as app,
        COUNT(DISTINCT k.id) as total_keywords,
        COUNT(DISTINCT CASE WHEN r.found THEN k.id END) as ranking_keywords
      FROM apps a
      JOIN keywords k ON k.app_id = a.id
      LEFT JOIN rankings r ON r.keyword_id = k.id AND r.date = (SELECT MAX(date) FROM rankings)
      GROUP BY a.name
      ORDER BY a.name
    `;

    return NextResponse.json({
      rankings: rankings.rows || [],
      history: history.rows || [],
      summary: summary.rows || [],
    });
  } catch (error) {
    console.error("Dashboard ASO error:", error);
    return NextResponse.json({ error: "Failed to fetch ASO data" }, { status: 500 });
  }
}