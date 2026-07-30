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
    const businessName = clean(body.businessName, 160);
    const website = clean(body.website, 300);
    const industry = clean(body.industry, 120);
    const businessStage = clean(body.businessStage, 120);
    const teamSize = clean(body.teamSize, 80);
    const revenueRange = clean(body.revenueRange, 80);
    const primaryChallenge = clean(body.primaryChallenge, 2500);
    const desiredOutcome = clean(body.desiredOutcome, 2500);
    const whySusan = clean(body.whySusan, 1800);

    if (
      name.length < 2 ||
      !emailPattern.test(email) ||
      businessName.length < 2 ||
      industry.length < 2 ||
      businessStage.length < 2 ||
      primaryChallenge.length < 10 ||
      desiredOutcome.length < 10
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
    const { error } = await admin.from("advisory_clients").insert({
      user_id: user?.id ?? null,
      name,
      email,
      phone: phone || null,
      business_name: businessName,
      website: website || null,
      industry,
      business_stage: businessStage,
      team_size: teamSize || null,
      revenue_range: revenueRange || null,
      primary_challenge: primaryChallenge,
      desired_outcome: desiredOutcome,
      why_susan: whySusan || null,
      stage: "applied",
      investment_amount: 0,
      source: "website",
    });

    if (error) throw error;
    return NextResponse.json({ submitted: true });
  } catch (error) {
    console.error("Advisory application error:", error);
    return NextResponse.json(
      { error: "Your application could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
