import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/dashboardDb";

// Resend sends this secret header to verify webhook authenticity
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    // If webhook secret is configured, verify the signature
    if (WEBHOOK_SECRET) {
      const body = await request.text();
      // Basic verification — in production use svix package for full verification
      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json({ error: "Missing signature headers" }, { status: 401 });
      }
      // Re-parse for processing
      const event = JSON.parse(body);
      await processEvent(event);
    } else {
      const event = await request.json();
      await processEvent(event);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Inbound email error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

async function processEvent(event: any) {
  if (event.type !== "email.received") return;

  const data = event.data || {};
  const from = data.from || "unknown";
  const subject = data.subject || "";
  const to = (data.to || []).join(", ");

  // Store in Neon
  try {
    const sql = getSql();
    await sql`
      INSERT INTO inbound_emails (email_id, from_address, to_address, subject, raw_event, created_at)
      VALUES (${data.email_id}, ${from}, ${to}, ${subject}, ${JSON.stringify(data)}, NOW())
    `;
    console.log(`📥 Received: ${subject} from ${from}`);
  } catch (e) {
    console.error("Failed to store email:", e);
  }
}