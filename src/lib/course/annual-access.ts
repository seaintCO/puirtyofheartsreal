import "server-only";
import Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";

export const COURSE_PRODUCT = "purity-course-annual";
export const COURSE_PRICE_CENTS = 20000;
export const COURSE_CURRENCY = "usd";
export const COURSE_ACCESS_MONTHS = 12;

type AnnualAccess = {
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  status: string;
  expires_at: string;
  last_verified_at: string | null;
};

export function courseStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function courseStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured.");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function getAnnualCourseAccess(supabase: SupabaseClient, userId: string): Promise<AnnualAccess | null> {
  const { data, error } = await supabase
    .from("annual_course_access")
    .select("stripe_session_id, stripe_payment_intent_id, status, expires_at, last_verified_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Unable to read annual course access.", error.message);
    return null;
  }

  return (data as AnnualAccess | null) ?? null;
}

export function annualAccessIsActive(access: AnnualAccess | null | undefined) {
  if (!access || access.status !== "active") return false;
  const expires = Date.parse(access.expires_at);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function reconcileAnnualCourseAccess(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  if (!courseStripeConfigured()) return;

  const internalSecret = process.env.COURSE_ACCESS_GRANT_SECRET;
  if (!internalSecret) return;

  const access = await getAnnualCourseAccess(supabase, userId);
  if (!annualAccessIsActive(access) || !access) return;

  const lastVerified = access.last_verified_at ? Date.parse(access.last_verified_at) : 0;
  if (Number.isFinite(lastVerified) && Date.now() - lastVerified < 12 * 60 * 60 * 1000) return;

  try {
    const stripe = courseStripeClient();
    const session = await stripe.checkout.sessions.retrieve(access.stripe_session_id, {
      expand: ["payment_intent.latest_charge"],
    });

    const payment = typeof session.payment_intent === "string" ? null : session.payment_intent;
    const charge = payment && typeof payment.latest_charge !== "string" ? payment.latest_charge : null;
    const revoked =
      session.payment_status !== "paid" ||
      Boolean(charge?.disputed) ||
      Boolean(charge?.refunded) ||
      (typeof charge?.amount_refunded === "number" && charge.amount_refunded >= COURSE_PRICE_CENTS);

    const { error } = await supabase.rpc("reconcile_annual_course_access", {
      p_internal_secret: internalSecret,
      p_status: revoked ? "revoked" : "active",
    });
    if (error) console.error("Course access reconciliation failed.", error.message);
  } catch (error) {
    console.error("Stripe course access verification failed.", error instanceof Error ? error.message : "Unknown");
  }
}
