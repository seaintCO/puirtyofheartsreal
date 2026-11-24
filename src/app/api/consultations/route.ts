import { NextResponse } from "next/server";
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
    if (clean(body.companyWebsiteField, 100)) return NextResponse.json({ submitted: true });

    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const topic = clean(body.topic, 120);
    const message = clean(body.message, 2000);
    const preferredDate = clean(body.preferredDate, 20);
    const preferredTime = clean(body.preferredTime, 60);
    const businessName = clean(body.businessName, 160);
    const businessStage = clean(body.businessStage, 120);

    if (name.length < 2 || !emailPattern.test(email) || topic.length < 2 || message.length < 10) {
      return NextResponse.json({ error: "Please complete the required fields correctly." }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.rpc("submit_consultation_request", {
      p_name: name,
      p_email: email,
      p_phone: phone || null,
      p_topic: topic,
      p_message: message,
      p_preferred_date: preferredDate || null,
      p_preferred_time: preferredTime || null,
      p_business_name: businessName || null,
      p_business_stage: businessStage || null,
    });

    if (error) throw error;
    return NextResponse.json({ submitted: true });
  } catch (error) {
    console.error("Consultation request error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Your request could not be saved. Please try again." }, { status: 500 });
  }
}
