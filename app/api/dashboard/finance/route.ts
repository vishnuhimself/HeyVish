import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/dashboardDb";

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "summary";

    // Summary: totals by year/month
    if (view === "summary") {
      const yearly = await sql`
        SELECT 
          EXTRACT(YEAR FROM date)::int as year,
          SUM(amount) FILTER (WHERE type = 'Income') as income,
          SUM(amount) FILTER (WHERE type = 'Expense') as expenses,
          SUM(amount) FILTER (WHERE type = 'Income') - SUM(amount) FILTER (WHERE type = 'Expense') as net
        FROM transactions
        GROUP BY year
        ORDER BY year DESC
      `;

      const monthly = await sql`
        SELECT 
          TO_CHAR(date, 'YYYY-MM') as month,
          EXTRACT(YEAR FROM date)::int as year,
          EXTRACT(MONTH FROM date)::int as month_num,
          SUM(amount) FILTER (WHERE type = 'Income') as income,
          SUM(amount) FILTER (WHERE type = 'Expense') as expenses,
          SUM(amount) FILTER (WHERE type = 'Income') - SUM(amount) FILTER (WHERE type = 'Expense') as net
        FROM transactions
        GROUP BY month, year, month_num
        ORDER BY month DESC
        LIMIT 24
      `;

      const byCategory = await sql`
        SELECT 
          type,
          category,
          SUM(amount) as total,
          COUNT(*) as count
        FROM transactions
        GROUP BY type, category
        ORDER BY type, total DESC
      `;

      const totalsResult = await sql`
        SELECT 
          COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) as total_income,
          COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as total_expenses,
          COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) - COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as total_net,
          COUNT(*) as total_tx
        FROM transactions
      `;

      const totalsRow = (totalsResult as any[])[0] || { total_income: 0, total_expenses: 0, total_net: 0, total_tx: 0 };

      return NextResponse.json({
        yearly: yearly || [],
        monthly: monthly || [],
        byCategory: byCategory || [],
        totals: {
          total_income: Number(totalsRow.total_income),
          total_expenses: Number(totalsRow.total_expenses),
          total_net: Number(totalsRow.total_net),
          total_tx: Number(totalsRow.total_tx),
        },
      });
    }

    // Transactions list (paginated)
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const type = searchParams.get("type") || "";
    const year = searchParams.get("year") || "";

    const countResult = await sql`SELECT COUNT(*) as count FROM transactions`;
    const total = (countResult as any[])[0]?.count || 0;

    const transactions = await sql`
      SELECT id, date, type, category, merchant, name, amount, notes
      FROM transactions
      ORDER BY date DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `;

    return NextResponse.json({ transactions: transactions || [], total, page, limit });
  } catch (error) {
    console.error("Finance API error:", error);
    return NextResponse.json({ error: "Failed to fetch finance data" }, { status: 500 });
  }
}