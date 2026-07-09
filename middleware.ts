import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { DASHBOARD_COOKIE, verifyDashboardToken } from "@/lib/dashboardAuth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Dashboard API protection
  if (path.startsWith("/api/dashboard/")) {
    const token = request.cookies.get(DASHBOARD_COOKIE)?.value;
    const session = await verifyDashboardToken(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Gold API protection (existing)
  if (path.startsWith("/api/gold-data/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/dashboard/:path*", "/api/gold-data/:path*"],
};