import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const topic = String(body.topic ?? "").trim();
    const message = String(body.message ?? "").trim();
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();

    if (
      name.length < 2 ||
      name.length > 120 ||
      !emailPattern.test(email) ||
      topic.length < 2 ||
      topic.length > 120 ||
      message.length > 2000
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
    const { error } = await admin.from("consultation_requests").insert({
      user_id: user?.id ?? null,
      name,
      email,
      phone: phone.slice(0, 40) || null,
      topic,
      preferred_date: preferredDate || null,
      preferred_time: preferredTime.slice(0, 60) || null,
      message: message || null,
    });

    if (error) throw error;
    return NextResponse.json({ submitted: true });
  } catch (error) {
    console.error("Consultation request error:", error);
    return NextResponse.json(
      { error: "Your request could not be saved. Please try again." },
      { status: 500 },
    );
  }
}

