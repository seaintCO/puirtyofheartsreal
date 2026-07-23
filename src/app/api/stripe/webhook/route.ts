import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function subscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0];
  return item?.current_period_end
    ? new Date(item.current_period_end * 1000).toISOString()
    : null;
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!stripeSecretKey || !webhookSecret || !signature) {
    return NextResponse.json(
      { error: "Webhook configuration is incomplete." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  try {
    const supabaseAdmin = createAdminClient();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId =
        session.client_reference_id ??
        session.metadata?.supabase_user_id;

      if (!userId) {
        throw new Error("Checkout Session is missing the Supabase user ID.");
      }

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id ?? null;
      const product = session.metadata?.access_product;

      if (product === "purityos-gpt") {
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (!subscriptionId) {
          throw new Error("PurityOS checkout is missing its subscription.");
        }

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const { error } = await supabaseAdmin
          .from("purityos_subscriptions")
          .upsert(
            {
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              status: subscription.status,
              current_period_end: subscriptionPeriodEnd(subscription),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" },
          );

        if (error) throw error;
      } else {
        if (session.payment_status !== "paid") {
          throw new Error("Course checkout has not been paid.");
        }
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            paid: true,
            stripe_customer_id: customerId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
            paid_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) throw error;
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      const payload = {
        stripe_customer_id:
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: subscriptionPeriodEnd(subscription),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      };
      const query = userId
        ? supabaseAdmin
            .from("purityos_subscriptions")
            .upsert({ user_id: userId, ...payload }, { onConflict: "user_id" })
        : supabaseAdmin
            .from("purityos_subscriptions")
            .update(payload)
            .eq("stripe_subscription_id", subscription.id);
      const { error } = await query;

      if (error) throw error;
    }

    if (
      event.type === "charge.refunded" ||
      event.type === "charge.dispute.created"
    ) {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      if (paymentIntentId) {
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ paid: false, updated_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", paymentIntentId);
        if (error) throw error;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook fulfillment error:", error);

    return NextResponse.json(
      { error: "Webhook fulfillment failed." },
      { status: 500 },
    );
  }
}
