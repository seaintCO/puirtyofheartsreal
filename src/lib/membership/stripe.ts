import "server-only";
import Stripe from "stripe";

export const MEMBERSHIP_PRODUCT = "purity-membership";
export const LEGACY_ALMA_PRODUCT = "purityos-gpt";

export function membershipConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_MEMBERSHIP_PRICE_ID &&
    process.env.STRIPE_WEBHOOK_SECRET,
  );
}

export function stripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured.");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export type MembershipOffer = {
  id: string;
  currency: string;
  amount: number;
  formatted: string;
};

export async function getMembershipOffer(): Promise<MembershipOffer | null> {
  if (!membershipConfigured()) return null;
  const stripe = stripeClient();
  const price = await stripe.prices.retrieve(process.env.STRIPE_MEMBERSHIP_PRICE_ID!);
  if (!price.active || !price.recurring || price.recurring.interval !== "month" || !price.unit_amount || price.unit_amount <= 0) {
    throw new Error("STRIPE_MEMBERSHIP_PRICE_ID must be an active, fixed-price monthly recurring price.");
  }
  const currency = price.currency.toUpperCase();
  return {
    id: price.id,
    currency,
    amount: price.unit_amount,
    formatted: new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price.unit_amount / 100),
  };
}
