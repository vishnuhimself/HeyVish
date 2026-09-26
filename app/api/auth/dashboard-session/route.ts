import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DASHBOARD_COOKIE, verifyDashboardToken } from "@/lib/dashboardAuth";

export async function GET() {
  const token = (await cookies()).get(DASHBOARD_COOKIE)?.value;
  const session = await verifyDashboardToken(token);
  return NextResponse.json(
    { authenticated: Boolean(session) },
    { headers: { "Cache-Control": "no-store" } }
  );
}
