import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getTrustedSiteUrl, rejectUntrustedOrigin } from "@/lib/security/request";

export async function POST(request: Request) {
  const originError = rejectUntrustedOrigin(request);
  if (originError) return originError;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = getTrustedSiteUrl(request);

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Billing is not configured." },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data } = await supabase
    .from("purityos_subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No PurityOS billing account was found." },
      { status: 404 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: `${siteUrl}/purityos/chat`,
  });

  return NextResponse.json({ url: session.url });
}
