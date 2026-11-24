import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  COURSE_CURRENCY,
  COURSE_PRICE_CENTS,
  COURSE_PRODUCT,
  courseStripeClient,
} from "@/lib/course/annual-access";
import { rejectUntrustedOrigin } from "@/lib/security/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  const internalSecret = process.env.COURSE_ACCESS_GRANT_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !internalSecret) {
    return NextResponse.json({ error: "Course activation is not configured." }, { status: 503 });
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as { session_id?: string };
    if (!body.session_id?.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid checkout session." }, { status: 400 });
    }

    const stripe = courseStripeClient();
    const session = await stripe.checkout.sessions.retrieve(body.session_id);

    if (
      session.mode !== "payment" ||
      session.payment_status !== "paid" ||
      session.metadata?.access_product !== COURSE_PRODUCT ||
      session.client_reference_id !== user.id ||
      session.metadata?.supabase_user_id !== user.id ||
      session.amount_total !== COURSE_PRICE_CENTS ||
      session.currency?.toLowerCase() !== COURSE_CURRENCY
    ) {
      return NextResponse.json({ error: "This payment could not be verified for course access." }, { status: 403 });
    }

    const paymentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent as Stripe.PaymentIntent | null)?.id ?? null;

    const { data: expiresAt, error } = await supabase.rpc("activate_annual_course_access", {
      p_internal_secret: internalSecret,
      p_stripe_session_id: session.id,
      p_stripe_payment_intent_id: paymentId,
      p_amount_cents: COURSE_PRICE_CENTS,
      p_currency: COURSE_CURRENCY,
    });

    if (error) throw error;
    return NextResponse.json({ activated: true, expires_at: expiresAt }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Course activation failed:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json({ error: "Payment was received, but access could not be activated automatically. Please contact Susan." }, { status: 500 });
  }
}
