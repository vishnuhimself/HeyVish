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
      const row = (result as any[])[0];
      if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return new NextResponse(row.markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": `attachment; filename="seo-report-${(row.report_date as string).slice(0, 10)}.md"`,
        },
      });
    }

    // List mode: return all reports
    const reports = await sql`
      SELECT id, report_date, sites, summary, created_at
      FROM seo_reports
      ORDER BY report_date DESC
      LIMIT 4
    `;

    // For each report, extract key stats from the markdown
    const enriched = ((reports || []) as any[]).map((r: any) => {
      const md = ""; // We don't send full markdown in list view
      return {
        id: r.id,
        date: r.report_date,
        sites: r.sites,
        summary: r.summary,
        created_at: r.created_at,
      };
    });

    return NextResponse.json({ reports: enriched });
  } catch (error) {
    console.error("SEO API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}