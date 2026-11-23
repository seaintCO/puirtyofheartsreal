import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SubscriptionRecord = {
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

export function isActiveSubscription(subscription: Pick<SubscriptionRecord, "status" | "current_period_end"> | null | undefined): boolean {
  if (!subscription || !["active", "trialing"].includes(subscription.status)) return false;
  const end = subscription.current_period_end ? Date.parse(subscription.current_period_end) : NaN;
  return Number.isFinite(end) && end > Date.now();
}

export async function getSubscriptionForUser(supabase: SupabaseClient, userId: string): Promise<SubscriptionRecord | null> {
  const { data, error } = await supabase
    .from("purityos_subscriptions")
    .select("status, current_period_end, cancel_at_period_end, stripe_customer_id, stripe_subscription_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error("Unable to check subscription status.");
  return (data as SubscriptionRecord | null) ?? null;
}

export async function hasCourseAccess(supabase: SupabaseClient): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_course_access");
  if (error) {
    console.error("Membership authorization could not be verified.", error.message);
    return false;
  }
  return data === true;
}
