import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();
    if (!email || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const { error } = await admin
      .from("newsletter_subscribers")
      .upsert(
        { email, status: "subscribed", updated_at: new Date().toISOString() },
        { onConflict: "email" },
      );
    if (error) throw error;

    return NextResponse.json({ subscribed: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "We could not save your email. Please try again." },
      { status: 500 },
    );
  }
}

