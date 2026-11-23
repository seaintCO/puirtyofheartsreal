import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Feather, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { getMembershipOffer, membershipConfigured } from "@/lib/membership/stripe";
import { getSubscriptionForUser, isActiveSubscription } from "@/lib/membership/access";
import MembershipCheckoutButton from "@/components/membership/MembershipCheckoutButton";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Membership | Purity of Hearts",
  description: "Explore a monthly Purity of Hearts membership with culture tools, coaching resources, and ALMA.",
  robots: { index: true, follow: true },
};

const included = [
  { icon: CalendarDays, title: "Culture Studio", detail: "Plan reflections and conversations with the Culture Calendar." },
  { icon: BookOpen, title: "Lessons & resources", detail: "Access guided lessons, notes, quizzes, and learning materials." },
  { icon: Feather, title: "Book Writing Guide", detail: "Shape your story with chapter frameworks and writing prompts." },
  { icon: MessageCircle, title: "ALMA member assistant", detail: "Private AI-assisted coaching and writing reflection, subject to usage limits." },
];

export default async function MembershipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const subscription = user ? await getSubscriptionForUser(supabase, user.id).catch(() => null) : null;
  const active = isActiveSubscription(subscription);

  let price: Awaited<ReturnType<typeof getMembershipOffer>> = null;
  if (membershipConfigured()) {
    try { price = await getMembershipOffer(); }
    catch (error) { console.error("Membership offer is unavailable:", error instanceof Error ? error.message : "Unknown"); }
  }

  return (
    <main className="ph-site">
      <Navbar/>
      <section className="bg-[#112F42] px-6 pb-24 pt-28 text-white sm:pb-32 sm:pt-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_.78fr] lg:items-end">
          <div>
            <p className="ph-eyebrow !text-[#CCB074]">PURITY OF HEARTS / MEMBERSHIP</p>
            <h1 className="mt-7 text-[clamp(3.4rem,6vw,6.7rem)] leading-[1.02] tracking-[-0.06em]">A space to <em className="text-[#CCB074]">keep growing.</em></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/65">One membership for culture-centered learning, practical tools, and thoughtful AI support. Learn, plan, reflect, and write in a space designed for coaches and leaders.</p>
            <div className="mt-12 flex flex-wrap items-center gap-5 text-xs text-white/55"><span className="flex items-center gap-2"><Check size={15} className="text-[#CCB074]"/> Monthly subscription</span><span className="flex items-center gap-2"><Check size={15} className="text-[#CCB074]"/> Cancel through Stripe</span></div>
          </div>
          <div className="border border-[#CCB074]/30 bg-[#1B3C57] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CCB074]">Purity membership</p>
            {price ? (
              <><p className="mt-6 text-5xl font-medium tracking-tight">{price.formatted}<span className="ml-2 text-base font-normal text-white/55">/ month</span></p><p className="mt-5 text-sm leading-7 text-white/60">One recurring membership, billed monthly. Includes the current member learning experience and ALMA access.</p></>
            ) : (
              <><p className="mt-7 text-2xl font-medium">Enrollment is being prepared</p><p className="mt-4 text-sm leading-7 text-white/60">Susan's monthly subscription price and payment connection are not active on this website yet. No charge will be made.</p></>
            )}
            <div className="mt-9">
              {active ? <Link href="/dashboard" className="flex items-center justify-center gap-3 bg-[#CCB074] px-6 py-4 text-sm font-semibold text-[#1B3C57]">Enter member dashboard <ArrowRight size={16}/></Link>
                : price ? user ? <MembershipCheckoutButton label={"Subscribe for " + price.formatted + " / month"}/> :
                  <Link href="/login?next=/membership" className="flex items-center justify-center gap-3 bg-[#CCB074] px-6 py-4 text-sm font-semibold text-[#1B3C57]">Create an account to join <ArrowRight size={16}/></Link>
                  : <Link href="/consultation" className="flex items-center justify-center gap-3 border border-white/25 px-6 py-4 text-sm font-semibold text-white">Ask about enrollment <ArrowUpRight size={16}/></Link>}
            </div>
            {subscription?.stripe_customer_id && <Link href="/membership/manage" className="mt-5 inline-flex text-xs text-[#CCB074] underline underline-offset-4">View existing subscription / billing</Link>}
            <p className="mt-6 text-xs leading-6 text-white/45">Secure checkout is hosted by Stripe. ALMA has a limit of 30 messages per day and 500 per month. The membership renews until canceled.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#FEFEFE] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="ph-eyebrow">WHAT'S INCLUDED</p><h2 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">Your learning, <em className="text-[#8AB0A9]">connected.</em></h2>
          <div className="mt-14 border-t border-[#1B3C57]/15">
            {included.map((item, index) => <div key={item.title} className="grid gap-4 border-b border-[#1B3C57]/15 py-8 sm:grid-cols-[55px_1fr_1.1fr] sm:items-center sm:gap-9">
              <span className="flex items-center gap-4 text-sm text-[#8AB0A9]"><item.icon size={21} strokeWidth={1.5}/></span>
              <h3 className="text-2xl tracking-tight">{item.title}</h3>
              <p className="text-sm leading-7 text-[#1B3C57]/65">{item.detail}</p>
            </div>)}
          </div>
          <p className="mt-10 text-sm leading-7 text-[#1B3C57]/65">Previously purchased one-time courses remain available to their purchasers. The new monthly membership adds all-access member tools and ALMA; one-time purchases do not automatically include ALMA.</p>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
