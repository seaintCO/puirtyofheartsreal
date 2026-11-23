import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionForUser, isActiveSubscription } from "@/lib/membership/access";
import { getMembershipOffer, MEMBERSHIP_PRODUCT, membershipConfigured, stripeClient } from "@/lib/membership/stripe";
import { getTrustedSiteUrl, rejectUntrustedOrigin } from "@/lib/security/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  if (!membershipConfigured()) {
    return NextResponse.json({ error: "Membership checkout is not available yet. Please contact Susan." }, { status: 503 });
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: "Please sign in or create an account first." }, { status: 401 });
    }

    const siteUrl = getTrustedSiteUrl(request);
    const existing = await getSubscriptionForUser(supabase, user.id);

    if (isActiveSubscription(existing)) return NextResponse.json({ url: siteUrl + "/dashboard" });

    if (existing?.stripe_subscription_id && ["past_due", "unpaid", "incomplete", "paused"].includes(existing.status)) {
      return NextResponse.json({ url: siteUrl + "/membership/manage" });
    }

    const [offer, stripe] = await Promise.all([getMembershipOffer(), Promise.resolve(stripeClient())]);
    if (!offer) return NextResponse.json({ error: "Membership pricing has not been configured." }, { status: 503 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(existing?.stripe_customer_id ? { customer: existing.stripe_customer_id } : { customer_email: user.email ?? undefined }),
      client_reference_id: user.id,
      line_items: [{ price: offer.id, quantity: 1 }],
      allow_promotion_codes: true,
      metadata: { supabase_user_id: user.id, access_product: MEMBERSHIP_PRODUCT },
      subscription_data: {
        metadata: { supabase_user_id: user.id, access_product: MEMBERSHIP_PRODUCT },
      },
      success_url: siteUrl + "/membership/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: siteUrl + "/membership?canceled=true",
    });

    if (!session.url) throw new Error("Stripe did not provide a secure checkout URL.");
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Membership checkout unavailable:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Unable to start checkout. Please try again or contact Susan." }, { status: 503 });
  }
}
