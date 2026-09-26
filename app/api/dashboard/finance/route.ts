import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/dashboardDb";

export async function POST(request: NextRequest) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid transaction." }, { status: 400 });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ error: "Enter a valid transaction." }, { status: 400 });
  }

  const fields = input as Record<string, unknown>;
  const type = fields.type;
  const date = fields.date;
  const amount = fields.amount;
  const category = typeof fields.category === "string" ? fields.category.trim() : "";
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const merchant = typeof fields.merchant === "string" ? fields.merchant.trim() : "";
  const notes = typeof fields.notes === "string" ? fields.notes.trim() : "";

  if (type !== "Income" && type !== "Expense") {
    return NextResponse.json({ error: "Choose income or expense." }, { status: 400 });
  }
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ||
      new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    return NextResponse.json({ error: "Enter a valid date." }, { status: 400 });
  }
  const amountText = typeof amount === "number" ? String(amount) : amount;
  if (typeof amountText !== "string" || !/^\d{1,10}(?:\.\d{1,2})?$/.test(amountText) ||
      Number(amountText) <= 0 || Number(amountText) > 9999999999.99) {
    return NextResponse.json({ error: "Enter a positive amount with up to two decimal places." }, { status: 400 });
  }
  if (!category || category.length > 100 || !name || name.length > 200 || merchant.length > 200 || notes.length > 2000) {
    return NextResponse.json({ error: "Enter a name and category within the allowed lengths." }, { status: 400 });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO transactions (id, date, type, category, merchant, name, amount, notes)
      VALUES (${crypto.randomUUID()}, ${date}, ${type}, ${category}, ${merchant || null}, ${name}, ${amountText}, ${notes || null})
      RETURNING id
    `;
    return NextResponse.json({ transaction: { id: rows[0].id, date, type, category, name, amount: Number(amountText) } }, { status: 201 });
  } catch (error) {
    console.error("Finance transaction save error:", error);
    return NextResponse.json({ error: "Could not save the transaction. Try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "summary";

    // The overview deliberately returns the whole ledger history. The dashboard
    // uses this to make the timeline and its drill-downs useful beyond the last
    // couple of months.
    if (view === "summary") {
      const yearly = await sql`
        SELECT 
          EXTRACT(YEAR FROM date)::int as year,
          SUM(amount) FILTER (WHERE type = 'Income') as income,
          SUM(amount) FILTER (WHERE type = 'Expense') as expenses,
          COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) - COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as net
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
          COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) - COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as net
        FROM transactions
        GROUP BY month, year, month_num
        ORDER BY month DESC
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

      const monthlyCategory = await sql`
        SELECT
          EXTRACT(YEAR FROM date)::int as year,
          EXTRACT(MONTH FROM date)::int as month_num,
          COALESCE(category, 'Uncategorised') as category,
          SUM(amount) as total
        FROM transactions
        WHERE type = 'Expense'
        GROUP BY year, month_num, category
        ORDER BY year DESC, month_num DESC, total DESC
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
        monthlyCategory: monthlyCategory || [],
        totals: {
          total_income: Number(totalsRow.total_income),
          total_expenses: Number(totalsRow.total_expenses),
          total_net: Number(totalsRow.total_net),
          total_tx: Number(totalsRow.total_tx),
        },
      });
    }

    // A focused period powers the expandable month detail. Returning it in one
    // response keeps the interaction quick even for a large overall ledger.
    if (view === "period") {
      const year = Number(searchParams.get("year"));
      const month = Number(searchParams.get("month"));
      if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
        return NextResponse.json({ error: "A valid year and month are required." }, { status: 400 });
      }

      const [summary, categories, transactions] = await Promise.all([
        sql`
          SELECT
            COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) as income,
            COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as expenses,
            COALESCE(SUM(amount) FILTER (WHERE type = 'Income'), 0) - COALESCE(SUM(amount) FILTER (WHERE type = 'Expense'), 0) as net,
            COUNT(*) as total_tx
          FROM transactions
          WHERE EXTRACT(YEAR FROM date)::int = ${year} AND EXTRACT(MONTH FROM date)::int = ${month}
        `,
        sql`
          SELECT
            COALESCE(category, 'Uncategorised') as category,
            SUM(amount) as total,
            COUNT(*) as count
          FROM transactions
          WHERE type = 'Expense' AND EXTRACT(YEAR FROM date)::int = ${year} AND EXTRACT(MONTH FROM date)::int = ${month}
          GROUP BY category
          ORDER BY total DESC
        `,
        sql`
          SELECT id, date, type, COALESCE(category, 'Uncategorised') as category, merchant, name, amount, notes
          FROM transactions
          WHERE EXTRACT(YEAR FROM date)::int = ${year} AND EXTRACT(MONTH FROM date)::int = ${month}
          ORDER BY date DESC, id DESC
        `,
      ]);

      const summaryRow = (summary as any[])[0] || {};
      return NextResponse.json({
        summary: {
          income: Number(summaryRow.income) || 0,
          expenses: Number(summaryRow.expenses) || 0,
          net: Number(summaryRow.net) || 0,
          total_tx: Number(summaryRow.total_tx) || 0,
        },
        categories: ((categories as any[]) || []).map((item: any) => ({ ...item, total: Number(item.total) || 0, count: Number(item.count) || 0 })),
        transactions: ((transactions as any[]) || []).map((item: any) => ({ ...item, amount: Number(item.amount) || 0 })),
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
