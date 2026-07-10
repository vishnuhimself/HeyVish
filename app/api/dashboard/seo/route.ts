import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/dashboardDb";

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const downloadId = searchParams.get("download");

    // Download mode: return raw markdown
    if (downloadId) {
      const result = await sql`
        SELECT report_date, markdown FROM seo_reports WHERE id = ${parseInt(downloadId)}
      `;
      const rows = result as any[];
      if (!rows || rows.length === 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      const row = rows[0];
      const markdown = String(row.markdown || "");
      const date = String(row.report_date || "").slice(0, 10);
      
      return new Response(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": `attachment; filename="seo-report-${date}.md"`,
        },
      });
    }

    // List mode
    const reports = await sql`
      SELECT id, report_date, sites, summary, created_at
      FROM seo_reports
      ORDER BY report_date DESC
      LIMIT 4
    `;

    const enriched = ((reports || []) as any[]).map((r: any) => ({
      id: r.id,
      date: r.report_date,
      sites: Array.isArray(r.sites) ? r.sites : [],
      summary: r.summary || {},
      created_at: r.created_at,
    }));

    return NextResponse.json({ reports: enriched });
  } catch (error) {
    console.error("SEO API error:", error);
    return NextResponse.json({ error: "Failed", details: String(error) }, { status: 500 });
  }
}