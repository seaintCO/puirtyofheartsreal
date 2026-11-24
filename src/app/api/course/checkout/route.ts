import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  COURSE_CURRENCY,
  COURSE_PRICE_CENTS,
  COURSE_PRODUCT,
  annualAccessIsActive,
  courseStripeClient,
  getAnnualCourseAccess,
} from "@/lib/course/annual-access";
import { getTrustedSiteUrl, rejectUntrustedOrigin } from "@/lib/security/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Course checkout is being connected. Please book a consultation with Susan for enrollment help." },
      { status: 503 },
    );
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Please create an account or sign in before purchasing." }, { status: 401 });
    }

    const existing = await getAnnualCourseAccess(supabase, user.id);
    if (annualAccessIsActive(existing)) {
      return NextResponse.json({ url: getTrustedSiteUrl(request) + "/dashboard/courses" });
    }

    const stripe = courseStripeClient();
    const siteUrl = getTrustedSiteUrl(request);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email ?? undefined,
      client_reference_id: user.id,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: COURSE_CURRENCY,
          unit_amount: COURSE_PRICE_CENTS,
          product_data: {
            name: "Purity of Hearts Educational Platform — 12 Month Access",
            description: "32 business and leadership lessons, study tools, saved progress, resources, and certificate tracking for 12 months.",
          },
        },
      }],
      metadata: {
        access_product: COURSE_PRODUCT,
        supabase_user_id: user.id,
        access_months: "12",
      },
      payment_intent_data: {
        metadata: {
          access_product: COURSE_PRODUCT,
          supabase_user_id: user.id,
        },
      },
      success_url: siteUrl + "/course/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: siteUrl + "/course?checkout=canceled",
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Course checkout failed:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json({ error: "Unable to start secure checkout. Please try again." }, { status: 503 });
  }
}
