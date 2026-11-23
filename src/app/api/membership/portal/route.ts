import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionForUser } from "@/lib/membership/access";
import { stripeClient } from "@/lib/membership/stripe";
import { getTrustedSiteUrl, rejectUntrustedOrigin } from "@/lib/security/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    const subscription = await getSubscriptionForUser(supabase, user.id);
    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: "No membership billing account was found." }, { status: 404 });
    }
    const stripe = stripeClient();
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: getTrustedSiteUrl(request) + "/membership/manage",
    });
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Billing portal unavailable:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Billing management is temporarily unavailable. Please contact Susan." }, { status: 503 });
  }
}
