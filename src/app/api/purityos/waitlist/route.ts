import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rejectUntrustedOrigin } from "@/lib/security/request";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = String(body.email ?? "").trim().toLowerCase();
    const honeypot = String(body.companyWebsite ?? "").trim();

    if (honeypot) return NextResponse.json({ submitted: true });

    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const { error } = await admin.from("product_waitlist").upsert(
      {
        email,
        product_slug: "purityos-mobile-app",
      },
      { onConflict: "email,product_slug", ignoreDuplicates: true },
    );

    if (error) throw error;
    return NextResponse.json({ submitted: true });
  } catch (error) {
    console.error("PurityOS waitlist error:", error);
    return NextResponse.json(
      { error: "Your email could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
