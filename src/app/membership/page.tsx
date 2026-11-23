import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Feather, MessageCircle, ShieldCheck } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import { createClient } from "@/lib/supabase/server";
import { getMembershipOffer, membershipConfigured } from "@/lib/membership/stripe";
import { getSubscriptionForUser, isActiveSubscription } from "@/lib/membership/access";
import MembershipCheckoutButton from "@/components/membership/MembershipCheckoutButton";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Membership | Purity of Hearts",
  description: "Monthly access to Culture Studio, learning resources, and ALMA.",
  robots: { index: true, follow: true },
};

const included = [
  ["Culture Studio", "Culture Calendar, Culture Insights, and the Book Writing Guide.", CalendarDays],
  ["Learning Library", "Lessons, resources, notes, quizzes, and saved progress.", BookOpen],
  ["ALMA", "A private AI reflection companion for coaching and writing support.", MessageCircle],
  ["Secure Membership", "Stripe-hosted checkout and customer billing portal.", ShieldCheck],
];

export default async function MembershipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const subscription = user ? await getSubscriptionForUser(supabase, user.id).catch(() => null) : null;
  const active = isActiveSubscription(subscription);

  let price: Awaited<ReturnType<typeof getMembershipOffer>> = null;
  if (membershipConfigured()) {
    try { price = await getMembershipOffer(); }
    catch (error) { console.error("Membership offer unavailable:", error instanceof Error ? error.message : "Unknown"); }
  }

  return (
    <div className="aura-page">
      <AuraMotion/>
      <main className="aura-shell aura-inner-page">
        <PurityAuraBackdrop/>
        <div className="aura-hatch" aria-hidden="true"/>
        <AuraHeader/>
        <section className="aura-subhero">
          <div className="aura-subhero-copy" data-aura-reveal>
            <span className="aura-outline-pill"><CheckCircle2 size={15}/> Purity membership</span>
            <h1>One membership.<br/><span>Everything connected.</span></h1>
            <p>Join the private member experience for culture-centered learning, reflection tools, writing support, and ALMA.</p>
            <div className="aura-trust-row"><span><ShieldCheck size={15}/> Secure Stripe checkout</span><span><CheckCircle2 size={15}/> Cancel through Stripe</span></div>
          </div>
          <div className="aura-price-panel" data-aura-reveal>
            <p className="eyebrow">MONTHLY MEMBERSHIP</p>
            {price ? <>
              <p className="price">{price.formatted}<span>/ month</span></p>
              <p className="price-copy">Recurring monthly access to the current member platform and ALMA.</p>
            </> : <>
              <p className="price pending">Enrollment is being prepared</p>
              <p className="price-copy">Susan's Stripe price or OpenAI connection is not active yet, so the site will not accept a payment.</p>
            </>}
            <div className="aura-price-action">
              {active ? <AuraShiftLink href="/dashboard" label="Enter member dashboard" icon={<ArrowRight size={16}/>} />
                : price ? user ? <MembershipCheckoutButton label={"Subscribe for " + price.formatted + " / month"}/>
                  : <AuraShiftLink href="/login?next=/membership" label="Create account to join" icon={<ArrowRight size={16}/>} />
                  : <Link href="/consultation" className="aura-secondary-button">Ask about enrollment <ArrowUpRight size={16}/></Link>}
            </div>
            {subscription?.stripe_customer_id && <Link href="/membership/manage" className="aura-price-manage">Manage existing billing →</Link>}
            <small>ALMA limits: 30 messages/day and 500/month. Membership renews until canceled.</small>
          </div>
        </section>

        <section className="aura-section">
          <div className="aura-section-heading" data-aura-reveal>
            <span className="aura-outline-pill"><BookOpen size={15}/> What's included</span>
            <h2>Your private <span>member space.</span></h2>
            <p>Everything in the paid experience is tied to the member account, not exposed API keys.</p>
          </div>
          <div className="aura-feature-grid">
            {included.map(([title,copy,Icon])=>{
              const ItemIcon=Icon as typeof BookOpen;
              return <div key={title as string} className="aura-feature-card" data-aura-reveal>
                <span className="aura-feature-icon"><ItemIcon size={21}/></span>
                <h3>{title as string}</h3><p>{copy as string}</p>
              </div>
            })}
          </div>
        </section>
        <AuraPhotoBand
          image="/purity-group.webp"
          alt="Members learning together, writing, and having an intentional coaching conversation"
          eyebrow="THE MEMBER EXPERIENCE"
          title="Built for the work between sessions."
          body="Membership gives the tools somewhere to live: lessons, Culture Studio, writing prompts, saved progress, and ALMA when you need help thinking through the next step."
          href="/education"
          linkLabel="Explore what's inside"
        />
        <AuraFooter/>
      </main>
    </div>
  );
}
