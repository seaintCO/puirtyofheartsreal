import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { LEGACY_ALMA_PRODUCT, MEMBERSHIP_PRODUCT, stripeClient } from "@/lib/membership/stripe";

export const runtime = "nodejs";

type Admin = ReturnType<typeof createAdminClient>;
const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function periodEnd(subscription: Stripe.Subscription): string | null {
  const end = subscription.items.data[0]?.current_period_end;
  return end && Number.isFinite(end) ? new Date(end * 1000).toISOString() : null;
}

function customerId(value: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  return typeof value === "string" ? value : value?.id ?? null;
}

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const record = invoice as unknown as {
    subscription?: string | { id: string } | null;
    parent?: { subscription_details?: { subscription?: string | { id: string } | null } | null } | null;
  };
  const value = record.parent?.subscription_details?.subscription ?? record.subscription;
  return typeof value === "string" ? value : value?.id ?? null;
}

async function syncSubscription(stripe: Stripe, admin: Admin, id: string, checkoutUserId?: string): Promise<void> {
  // Always retrieve the latest state from Stripe. Events can arrive late or out of order.
  const subscription = await stripe.subscriptions.retrieve(id);
  const product = subscription.metadata.access_product;
  if (product !== MEMBERSHIP_PRODUCT && product !== LEGACY_ALMA_PRODUCT) return;

  const configuredPrice = process.env.STRIPE_MEMBERSHIP_PRICE_ID;
  const priceMatches = subscription.items.data.some(item => item.price.id === configuredPrice);
  if (product === MEMBERSHIP_PRODUCT && (!configuredPrice || !priceMatches)) {
    throw new Error("Subscription price does not match this site's configured membership.");
  }

  const userId = subscription.metadata.supabase_user_id || checkoutUserId;
  if (!userId || !userIdPattern.test(userId)) throw new Error("Subscription has no valid member identifier.");
  if (checkoutUserId && userId !== checkoutUserId) throw new Error("Checkout customer identifier mismatch.");

  const { data: saved, error: savedError } = await admin
    .from("purityos_subscriptions")
    .select("stripe_subscription_id, status, current_period_end")
    .eq("user_id", userId)
    .maybeSingle();
  if (savedError) throw savedError;

  // Do not let an older canceled subscription supersede an already valid membership.
  if (saved?.stripe_subscription_id && saved.stripe_subscription_id !== id) {
    const savedEnd = saved.current_period_end ? Date.parse(saved.current_period_end) : NaN;
    if (["active", "trialing"].includes(saved.status) && Number.isFinite(savedEnd) && savedEnd > Date.now()) return;
  }

  const end = periodEnd(subscription);
  const { error } = await admin.from("purityos_subscriptions").upsert({
    user_id: userId,
    stripe_customer_id: customerId(subscription.customer),
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_end: end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (error) throw error;
}

async function handleEvent(event: Stripe.Event, stripe: Stripe, admin: Admin): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      const product = session.metadata?.access_product;
      const userId = session.client_reference_id ?? session.metadata?.supabase_user_id;
      if (product === MEMBERSHIP_PRODUCT || product === LEGACY_ALMA_PRODUCT) {
        if (session.mode !== "subscription") throw new Error("Unexpected membership checkout mode.");
        if (!userId || !userIdPattern.test(userId)) throw new Error("Invalid Checkout member.");
        const id = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
        if (!id) throw new Error("Membership Checkout has no subscription.");
        await syncSubscription(stripe, admin, id, userId);
      } else if (product === "purity-course-platform") {
        // Existing one-time purchasers keep permanent course access; it does not unlock ALMA.
        if (session.mode !== "payment" || session.payment_status !== "paid") return;
        if (!userId || !userIdPattern.test(userId)) throw new Error("Invalid course purchaser.");
        const paymentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
        const { error } = await admin.from("profiles").update({
          paid: true,
          stripe_customer_id: customerId(session.customer),
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: paymentId,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq("id", userId);
        if (error) throw error;
      }
      return;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(stripe, admin, subscription.id);
      return;
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const id = subscriptionIdFromInvoice(invoice);
      if (id) await syncSubscription(stripe, admin, id);
      return;
    }
    case "charge.refunded":
    case "charge.dispute.created": {
      const charge = event.data.object as Stripe.Charge;
      const paymentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentId) {
        const { error } = await admin.from("profiles")
          .update({ paid: false, updated_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", paymentId);
        if (error) throw error;
      }
      return;
    }
    default:
      return;
  }
}

export async function POST(request: Request) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!signingSecret || !process.env.STRIPE_SECRET_KEY || !signature) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }
  const body = await request.text();
  const stripe = stripeClient();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, signingSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: existing, error: readError } = await admin
    .from("stripe_webhook_events").select("event_id").eq("event_id", event.id).maybeSingle();
  if (readError) return NextResponse.json({ error: "Webhook storage unavailable." }, { status: 503 });
  if (existing) return NextResponse.json({ received: true });

  try {
    await handleEvent(event, stripe, admin);
    const { error } = await admin.from("stripe_webhook_events")
      .insert({ event_id: event.id, event_type: event.type });
    // Concurrent retries may both safely sync the same latest Stripe state.
    if (error && error.code !== "23505") throw error;
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Verified Stripe event failed:", event.id, error instanceof Error ? error.message : "Unknown");
    // Non-2xx ensures Stripe retries a temporary failure. Never grant access on failure.
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
