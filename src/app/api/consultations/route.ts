import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { rejectUntrustedOrigin } from "@/lib/security/request";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const honeypot = clean(body.companyWebsiteField, 100);
    if (honeypot) return NextResponse.json({ submitted: true });

    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const topic = clean(body.topic, 120);
    const message = clean(body.message, 2000);
    const preferredDate = clean(body.preferredDate, 20);
    const preferredTime = clean(body.preferredTime, 60);
    const businessName = clean(body.businessName, 160);
    const businessStage = clean(body.businessStage, 120);

    if (
      name.length < 2 ||
      !emailPattern.test(email) ||
      topic.length < 2 ||
      message.length < 10
    ) {
      return NextResponse.json(
        { error: "Please complete the required fields correctly." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();
    const { error: consultationError } = await admin
      .from("consultation_requests")
      .insert({
        user_id: user?.id ?? null,
        name,
        email,
        phone: phone || null,
        topic,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        message,
      });

    if (consultationError) throw consultationError;

    // Mirror the request into Susan's private growth CRM. This keeps the public
    // call flow simple while giving Susan a complete business strategy record.
    const { error: crmError } = await admin.from("advisory_clients").insert({
      user_id: user?.id ?? null,
      name,
      email,
      phone: phone || null,
      business_name: businessName || "Business not provided",
      industry: topic,
      business_stage: businessStage || "Not provided",
      primary_challenge: message,
      desired_outcome: `Growth strategy call focused on: ${topic}`,
      source: "growth-strategy-call",
      stage: "applied",
      investment_amount: 0,
      next_session_at: null,
    });

    if (crmError) {
      console.error("Growth CRM sync error:", crmError);
    }

    return NextResponse.json({ submitted: true, crmSynced: !crmError });
  } catch (error) {
    console.error("Consultation request error:", error);
    return NextResponse.json(
      { error: "Your request could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
