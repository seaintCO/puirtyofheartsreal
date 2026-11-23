import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Membership Activation", robots: { index: false, follow: false } };

export default async function MembershipSuccessPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/membership/success");
  const { data: authorized, error } = await supabase.rpc("has_purityos_access");
  const ready = authorized === true && !error;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E8F0ED] px-5 py-16 text-[#1B3C57]">
      <div className="w-full max-w-xl border border-[#1B3C57]/15 bg-white p-8 sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">PURITY / MEMBERSHIP</p>
        <h1 className="mt-6 text-4xl font-medium tracking-tight">{ready ? "Welcome to your space." : "Your membership is being verified."}</h1>
        <p className="mt-5 text-sm leading-8 text-[#1B3C57]/65">{ready ? "Stripe has confirmed your membership. Your member workspace and ALMA are now unlocked." : "Stripe is completing your subscription confirmation. Access will open after the signed payment event is received. If it is still pending, you can check again."}</p>
        {ready ? <Link href="/dashboard" className="mt-9 inline-flex bg-[#1B3C57] px-7 py-4 text-sm font-semibold text-white">Enter your member workspace</Link>
          : <div className="mt-9 flex flex-wrap gap-3"><Link href="/membership/success" className="inline-flex bg-[#1B3C57] px-7 py-4 text-sm font-semibold text-white">Check access again</Link><Link href="/membership/manage" className="inline-flex border border-[#1B3C57]/20 px-7 py-4 text-sm font-semibold text-[#1B3C57]">Subscription status</Link></div>}
      </div>
    </main>
  );
}
