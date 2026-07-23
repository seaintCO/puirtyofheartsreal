import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PURITYOS_PRICE_ID;
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

    if (!stripeSecretKey || !priceId) {
      return NextResponse.json(
        { error: "PurityOS billing is not configured yet." },
        { status: 503 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please create an account or log in first." },
        { status: 401 },
      );
    }

    const { data: subscription } = await supabase
      .from("purityos_subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (
      subscription?.status === "active" ||
      subscription?.status === "trialing"
    ) {
      return NextResponse.json({ url: `${siteUrl}/purityos/chat` });
    }

    const stripe = new Stripe(stripeSecretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email ?? undefined,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      metadata: {
        supabase_user_id: user.id,
        access_product: "purityos-gpt",
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          access_product: "purityos-gpt",
        },
      },
      success_url: `${siteUrl}/purityos/chat?subscribed=true`,
      cancel_url: `${siteUrl}/purityos?canceled=true`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("PurityOS checkout error:", error);
    return NextResponse.json(
      { error: "We could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}

