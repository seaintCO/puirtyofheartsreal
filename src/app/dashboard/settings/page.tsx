import { requirePaidUser } from "@/lib/auth/require-paid-user";
import SettingsForm from "@/components/dashboard/SettingsForm";
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionForUser, isActiveSubscription } from "@/lib/membership/access";
import Link from "next/link";
import BillingPortalButton from "@/components/membership/BillingPortalButton";

export default async function SettingsPage() {
  const { user, profile } = await requirePaidUser();
  const supabase = await createClient();
  const membership = await getSubscriptionForUser(supabase, user.id);
  const active = isActiveSubscription(membership);

  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff75b8]">
        Account settings
      </p>
      <h1 className="mt-4 font-serif text-3xl tracking-tight sm:text-5xl">
        Your account.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/[0.40]">
        Keep your member name and login secure.
      </p>
      <div className="mt-9 border border-white/15 bg-[#1B3C57] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Subscription & billing</p>
        <h2 className="mt-4 text-2xl font-medium">Your membership</h2>
        <p className="mt-3 text-sm text-white/65">{active ? "Your membership is active." : profile.paid ? "You have legacy course access. ALMA requires an active membership." : "Your member access is not currently subscription-based."}</p>
        <div className="mt-6">{membership?.stripe_customer_id ? <BillingPortalButton /> : <Link href="/membership" className="inline-block bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57]">Explore membership</Link>}</div>
      </div>
      <SettingsForm
        initialName={profile.full_name || ""}
        email={user.email || profile.email || ""}
      />
    </section>
  );
}

