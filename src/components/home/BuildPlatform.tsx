import Link from "next/link";
import { ArrowRight, Bot, Calendar, CreditCard, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react";

export default function BuildPlatform() {
  return (
    <section className="relative overflow-hidden bg-[#111] px-6 py-28 text-white">
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#C9A75D]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Powered by SEAINT
          </span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Build your own coaching platform.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">
            A premium platform for coaches, leaders, ministries, and creators who want courses, booking, community, AI, payments, and a client dashboard.
          </p>

          <Link href="/demo" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#C9A75D] px-8 py-4 text-sm font-medium text-white shadow-lg transition hover:bg-[#b59550]">
            View Live Demo <ArrowRight size={17} />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl backdrop-blur-xl">
          <div className="rounded-[1.5rem] bg-[#1F1F1F] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold">Coach OS Demo</p>
                <p className="mt-1 text-xs text-white/40">Client growth dashboard</p>
              </div>
              <Sparkles size={20} className="text-[#C9A75D]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [LayoutDashboard, "Client Dashboard", "Courses, progress, and resources."],
                [Calendar, "Booking System", "Coaching calls and events."],
                [MessageCircle, "Community", "Private group and support."],
                [Bot, "AI Assistant", "Answers FAQs and guides clients."],
                [CreditCard, "Payments", "Stripe-ready offers and checkout."],
                [Sparkles, "Brand Portal", "Premium design for coaches."],
              ].map(([Icon, title, text]: any) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]">
                  <Icon size={22} className="text-[#C9A75D]" />
                  <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


