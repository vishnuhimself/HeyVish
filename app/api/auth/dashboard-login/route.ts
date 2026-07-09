import { NextRequest, NextResponse } from "next/server";
import { verifyDashboardPassword, createDashboardToken, DASHBOARD_COOKIE, SESSION_TTL } from "@/lib/dashboardAuth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (!verifyDashboardPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const { token, expiresAt } = await createDashboardToken();

    const response = NextResponse.json({ success: true, expiresAt });
    response.cookies.set(DASHBOARD_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_TTL,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}