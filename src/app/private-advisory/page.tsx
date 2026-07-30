import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Compass,
  Flag,
  Layers3,
  LineChart,
  LockKeyhole,
  Route,
  Target,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Work with Susan | Private Growth Strategy",
  description:
    "Work privately with Susan Wagner on business vision, foundation, growth strategy, measurable objectives, execution, and long-term exit planning.",
};

const roadmap = [
  [Compass, "Vision", "Define what the business is becoming, who it serves, and why it should exist."],
  [Layers3, "Foundation", "Clarify the offer, positioning, model, structure, roles, and immediate priorities."],
  [LineChart, "Growth", "Create a realistic strategy for demand, conversion, delivery, capacity, and scale."],
  [Target, "Objectives", "Translate the strategy into measurable outcomes, milestones, and next actions."],
  [Route, "Execution", "Organize the work around the few actions that create meaningful progress."],
  [Flag, "Exit", "Think ahead to founder freedom, succession, stewardship, sale, or long-term legacy."],
] as const;

export default function PrivateAdvisoryPage() {
  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />

      <section className="relative px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-48" />
        <div className="liquid-orb left-[-9rem] top-[-8rem] h-[31rem] w-[31rem] bg-[#ff9dcc]/[0.30]" />
        <div className="liquid-orb right-[-12rem] top-[4rem] h-[36rem] w-[36rem] bg-[#78a8ff]/[0.26]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="liquid-glass-soft mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.46]">
            <span className="pink-dot h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" />
            Purity Of Hearts
          </div>
          <h1 className="liquid-title public-hero-title mt-7 font-semibold">
            Your vision. <span className="liquid-gradient-text">A clear strategy.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-7 text-black/[0.47] sm:text-xl sm:leading-8">
            Private business guidance for founders who want Susan involved in
            the vision, foundation, growth plan, objectives, execution, and
            long-term direction of the company.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/consultation"
              className="liquid-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
            >
              Book a growth strategy call <ArrowUpRight size={15} />
            </Link>
            <Link
              href="#approach"
              className="liquid-button-secondary liquid-glass-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-black"
            >
              See the approach <ArrowRight size={15} />
            </Link>
          </div>

          <div className="liquid-glass mx-auto mt-16 max-w-6xl rounded-[2.4rem] p-3 text-left sm:mt-20 sm:p-4">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-[#0b0b12] p-4 text-white sm:p-6">
              <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#ff4fa3]/[0.19] blur-[100px]" />
              <div className="absolute -bottom-36 right-[-3rem] h-96 w-96 rounded-full bg-[#786bff]/[0.17] blur-[115px]" />

              <div className="relative grid gap-4 lg:grid-cols-[.78fr_1.22fr]">
                <div className="liquid-glass-dark rounded-[1.7rem] p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Private Client</p>
                    <LockKeyhole size={16} className="text-white/[0.36]" />
                  </div>
                  <div className="mt-12 flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] text-2xl font-semibold tracking-[-0.06em]">
                    SW
                  </div>
                  <h2 className="mt-8 text-3xl font-semibold leading-[0.98] tracking-[-0.055em]">
                    Susan beside the business.
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-white/[0.38]">
                    Not generic coaching. A private strategy relationship built
                    around the actual company, constraints, decisions, and future in front of you.
                  </p>
                </div>

                <div className="rounded-[1.7rem] border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-2xl sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff91c7]">
                    Founder operating roadmap
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {roadmap.map(([Icon, title, copy]) => (
                      <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 backdrop-blur-xl">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4fa3]/[0.12] text-[#ff91c7]">
                          <Icon size={17} />
                        </span>
                        <h3 className="mt-6 text-base font-semibold">{title}</h3>
                        <p className="mt-2 text-xs leading-5 text-white/[0.32]">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">
                Who this is for
              </p>
              <h2 className="liquid-title mt-6 text-[clamp(2.15rem,4.7vw,4rem)] font-semibold leading-[0.92]">
                Serious vision. Honest work.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-black/[0.45]">
              The strongest fit is a founder ready to make decisions, share the
              real constraints, execute between conversations, and build for
              more than a temporary burst of attention.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {[
              "You have a business idea and want the foundation built correctly from the beginning.",
              "You have revenue, but the business lacks focus, systems, positioning, or a clear growth path.",
              "You are repositioning an existing company and need stronger strategy and measurable objectives.",
              "You want to build toward founder freedom, succession, sale, stewardship, or a meaningful legacy.",
            ].map((item, index) => (
              <div key={item} className="liquid-glass-soft flex gap-4 rounded-[1.7rem] p-6 sm:p-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f32f91] to-[#8b67ff] text-xs font-semibold text-white">
                  0{index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-black/[0.53]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
        <div className="liquid-orb left-[-8rem] top-[-10rem] h-96 w-96 bg-[#ff4fa3]/[0.17]" />
        <div className="liquid-orb bottom-[-12rem] right-[-7rem] h-96 w-96 bg-[#786bff]/[0.16]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff91c7]">
              What Susan helps build
            </p>
            <h2 className="liquid-title mt-6 text-[clamp(2.1rem,4.5vw,3.8rem)] font-semibold leading-[0.94]">
              From vision to an exit that makes sense.
            </h2>
          </div>
          <div className="liquid-glass-dark rounded-[2rem] p-5 sm:p-8">
            {[
              ["01", "Vision and direction", "Define what the company is building, who it serves, and the future it is designed to create."],
              ["02", "Business foundation", "Clarify positioning, offers, operating model, priorities, roles, and the decisions underneath growth."],
              ["03", "Growth strategy", "Build a practical path for demand, conversion, delivery, capacity, partnerships, and expansion."],
              ["04", "Objectives and accountability", "Turn strategy into measurable outcomes, milestones, next actions, and a useful operating cadence."],
              ["05", "Exit and legacy", "Plan for founder freedom, succession, sale, stewardship, or the next chapter after the business matures."],
            ].map(([number, title, copy]) => (
              <div key={number} className="grid gap-3 border-b border-white/[0.08] py-6 last:border-b-0 sm:grid-cols-[52px_190px_1fr] sm:items-start sm:gap-6">
                <span className="text-xs font-semibold text-[#ff91c7]">{number}</span>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-sm leading-7 text-white/[0.36]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">
              Private client workspace
            </p>
            <h2 className="liquid-title mt-6 text-[clamp(2.1rem,4.5vw,3.8rem)] font-semibold leading-[0.94]">
              Strategy does not disappear after the call.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-black/[0.46]">
              Accepted clients can be organized inside Susan’s private CRM with
              their vision, goals, growth strategy, objectives, milestones,
              session notes, next actions, and exit plan kept together.
            </p>
          </div>

          <div className="liquid-glass rounded-[2.2rem] p-4 sm:p-6">
            <div className="rounded-[1.65rem] bg-[#0c0c13] p-5 text-white sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">Founder Strategy Workspace</p>
                  <p className="mt-1 text-[10px] text-white/[0.28]">Private · Susan and her team</p>
                </div>
                <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#ff91c7]">
                  Live roadmap
                </span>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Vision & positioning",
                  "Growth strategy",
                  "Quarterly objectives",
                  "Milestones & next actions",
                  "Session notes",
                  "Exit & legacy plan",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-4 text-xs text-white/[0.52]">
                    <Check size={14} className="text-[#ff91c7]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="liquid-glass mx-auto max-w-5xl rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          <CalendarDays size={28} className="mx-auto text-[#e83491]" />
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">
            Begin with a conversation
          </p>
          <h2 className="liquid-title mx-auto mt-5 max-w-4xl text-3xl font-semibold leading-[0.98] sm:text-5xl">
            Bring the business. Leave with more clarity.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-black/[0.45]">
            Book a consultation or growth strategy call so Susan can understand
            where the business is now and what it needs next.
          </p>
          <Link
            href="/consultation"
            className="liquid-button mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
          >
            Book a growth strategy call <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
