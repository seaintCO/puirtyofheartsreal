import Link from "next/link";
import {
  ArrowRight,
  BookHeart,
  BriefcaseBusiness,
  Check,
  HeartHandshake,
  LockKeyhole,
  MessageSquareMore,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PurityCheckoutButton from "@/components/purityos/PurityCheckoutButton";

const pillars = [
  {
    icon: BriefcaseBusiness,
    title: "Business counsel",
    text: "Think through offers, leadership, difficult decisions, focus, and the next practical move.",
  },
  {
    icon: HeartHandshake,
    title: "Life reflection",
    text: "A calm place to process pressure, confidence, habits, relationships, and hard seasons.",
  },
  {
    icon: BookHeart,
    title: "Faith-centered motivation",
    text: "Grounded Christian encouragement that supports action without judgment or spiritual pressure.",
  },
];

export default function PurityOSPage() {
  return (
    <main className="min-h-screen bg-[#0e0d0b] text-white">
      <Navbar dark />

      <section className="relative overflow-hidden px-6 pb-24 pt-24 sm:pt-32">
        <div className="absolute left-1/2 top-16 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[#c9a75d]/15 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d8b665]/20 bg-[#d8b665]/10 px-4 py-2 text-xs text-[#ebcc80]">
            <Sparkles size={14} />
            A private thinking space, available anytime
          </div>
          <h1 className="mx-auto mt-8 max-w-5xl font-serif text-6xl leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[6.8rem]">
            Clarity for business.
            <span className="block bg-gradient-to-r from-[#a8813d] via-[#f0d58f] to-[#a8813d] bg-clip-text text-transparent">
              Strength for life.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/48 sm:text-lg">
            PurityOS is a simple, faith-centered AI companion for decisions,
            pressure, personal growth, and the moments when you need a grounded
            next step.
          </p>
          <div className="mx-auto mt-10 max-w-sm">
            <PurityCheckoutButton />
            <p className="mt-4 text-xs text-white/30">
              Cancel anytime. Secure checkout through Stripe.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl rounded-[2.3rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_50px_140px_rgba(0,0,0,.5)] backdrop-blur-2xl">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#11100e] p-5 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8b665]/10 text-[#d8b665]">
                <Sparkles size={19} />
              </div>
              <div>
                <p className="text-sm font-medium">PurityOS</p>
                <p className="text-xs text-white/30">Faith-centered clarity</p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl space-y-6 py-10">
              <div className="ml-auto max-w-lg rounded-[1.4rem] rounded-br-sm bg-[#d8b665] px-5 py-4 text-sm leading-6 text-[#17130c]">
                I know what I want to build, but I’m overwhelmed and keep
                second-guessing myself. What should I focus on first?
              </div>
              <div className="max-w-xl text-sm leading-7 text-white/65">
                It sounds like the vision is there, but too many decisions are
                competing for your attention. Let’s make today smaller:
                <br />
                <br />
                1. Name the one result that matters most this month.
                <br />
                2. Choose the next action that directly creates that result.
                <br />
                3. Place everything else in a “not yet” list.
                <br />
                <br />
                Clarity often arrives after faithful action—not before it. What
                one result would make this month feel meaningful?
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/25">
              <span>Ask about business, life, faith, or today…</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b665] text-[#17130c]">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl"
              >
                <Icon size={23} className="text-[#d8b665]" />
                <h2 className="mt-6 text-xl font-medium">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/42">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
              Built for privacy and continuity
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
              Your conversations stay organized, so you can keep growing.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
              Start a fresh conversation, return to a past one, and keep your
              business and personal reflections in one calm space.
            </p>
          </div>
          <div className="space-y-3 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
            {[
              [MessageSquareMore, "Saved conversation history"],
              [LockKeyhole, "Private member account access"],
              [Check, "Up to 30 messages per day and 500 per month"],
              [Check, "Business, life, and faith support"],
              [Check, "Cancel from your billing portal anytime"],
            ].map(([Icon, label]: any) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3.5 text-sm text-white/62"
              >
                <Icon size={17} className="text-[#d8b665]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-[#d8b665]/20 bg-gradient-to-br from-[#d8b665]/14 to-white/[0.025] p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2c477]">
            PurityOS Membership
          </p>
          <div className="mt-5 flex items-end justify-center gap-2">
            <span className="text-6xl font-semibold">$50</span>
            <span className="pb-2 text-sm text-white/35">/ month</span>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/45">
            PurityOS offers reflection and general guidance. It is not therapy,
            medical care, professional advice, or emergency support.
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <PurityCheckoutButton />
          </div>
          <Link
            href="/purityos/chat"
            className="mt-5 inline-flex text-xs text-white/40 transition hover:text-white"
          >
            Already a member? Open PurityOS
          </Link>
        </div>
      </section>

      <Footer dark />
    </main>
  );
}
