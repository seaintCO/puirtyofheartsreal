import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionForUser, isActiveSubscription } from "@/lib/membership/access";
import BillingPortalButton from "@/components/membership/BillingPortalButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Subscription & Billing", robots: { index: false, follow: false } };

export default async function ManageMembershipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/membership/manage");
  const subscription = await getSubscriptionForUser(supabase, user.id);
  const active = isActiveSubscription(subscription);
  return (
    <main className="min-h-screen bg-[#112F42] px-5 py-20 text-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard/settings" className="text-xs text-[#CCB074]">← Back to account</Link>
        <p className="mt-12 text-xs uppercase tracking-[0.22em] text-[#CCB074]">ACCOUNT / MEMBERSHIP</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Your subscription.</h1>
        <div className="mt-10 border border-white/15 bg-[#1B3C57] p-7 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Current status</p>
          <p className="mt-3 text-2xl font-medium capitalize">{subscription?.status?.replaceAll("_", " ") || "Not subscribed"}</p>
          <p className="mt-4 text-sm leading-7 text-white/60">{active ? "Your membership currently includes Culture Studio, learning resources, and ALMA." : "Premium access is inactive. You can review your billing or join a membership."}</p>
          {subscription?.current_period_end && <p className="mt-4 text-sm text-white/70">{subscription.cancel_at_period_end ? "Scheduled end date: " : "Current billing period ends: "}{new Date(subscription.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</p>}
          <div className="mt-8">{subscription?.stripe_customer_id ? <BillingPortalButton/> : <Link href="/membership" className="inline-flex bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57]">View membership options</Link>}</div>
        </div>
        <p className="mt-7 text-xs leading-6 text-white/45">Changes to payment methods, cancellations, and invoices are handled in Stripe's secure Customer Portal. Your access is updated after Stripe confirms the subscription status.</p>
      </div>
    </main>
  );
}
