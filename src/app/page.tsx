import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Layers3,
  Play,
  Sparkles,
  Target,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { businessCourse, businessLessons } from "@/data/business-course";

export default function Home() {
  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />

      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-55" />
        <div className="liquid-orb left-[-10rem] top-[-7rem] h-[28rem] w-[28rem] bg-[#ff9dce]/[0.35]" />
        <div className="liquid-orb right-[-11rem] top-[3rem] h-[32rem] w-[32rem] bg-[#80aaff]/[0.30]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="liquid-glass-soft mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.48]">
            <span className="pink-dot h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" />
            Purity Of Hearts
          </div>

          <h1 className="liquid-title public-hero-title mt-7 font-semibold">
            Build with <span className="liquid-gradient-text">clarity.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-7 tracking-[-0.015em] text-black/[0.48] sm:text-xl sm:leading-8">
            A modern ecosystem for business education, faith-centered clarity,
            and private growth strategy with Susan Wagner.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/education"
              className="liquid-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
            >
              Explore the platform <ArrowRight size={15} />
            </Link>
            <Link
              href="/consultation"
              className="liquid-button-secondary liquid-glass-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-black"
            >
              Book a strategy call <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="liquid-glass mx-auto mt-16 max-w-6xl rounded-[2.2rem] p-3 text-left sm:mt-20 sm:rounded-[3rem] sm:p-4">
            <div className="relative overflow-hidden rounded-[1.65rem] bg-[#0b0b12] text-white sm:rounded-[2.3rem]">
              <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#ff4fa3]/[0.20] blur-[100px]" />
              <div className="absolute -bottom-36 left-[24%] h-80 w-80 rounded-full bg-[#7c65ff]/[0.18] blur-[110px]" />

              <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8 sm:py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.07] text-[10px] font-semibold">
                    PH
                  </span>
                  <div>
                    <p className="text-xs font-semibold">Purity Of Hearts</p>
                    <p className="mt-0.5 text-[10px] text-white/[0.30]">
                      Education · PurityOS · Growth Strategy
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1.5 text-[10px] text-white/[0.38]">
                  Connected ecosystem
                </span>
              </div>

              <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.25fr_.75fr] lg:p-8">
                <div className="liquid-shine relative min-h-[25rem] overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6 sm:p-9">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff9dcc]">
                      Purity of Hearts Education
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl">
                      <Play size={14} fill="currentColor" />
                    </span>
                  </div>
                  <div className="mt-20 max-w-xl sm:mt-28">
                    <p className="text-sm text-white/[0.34]">Continue learning</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                      Business Management
                      <span className="block text-white/[0.32]">&amp; Leadership</span>
                    </h2>
                  </div>
                  <div className="mt-10">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.10]">
                      <div className="h-full w-[47%] rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#9b7bff]" />
                    </div>
                    <div className="mt-3 flex justify-between text-[10px] text-white/[0.28]">
                      <span>15 of {businessLessons.length} lessons</span>
                      <span>47% complete</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    [BookOpen, `${businessCourse.modules.length} modules`, "Structured learning"],
                    [Sparkles, "PurityOS", "Clarity in your pocket"],
                    [Target, "Private strategy", "Vision through execution"],
                  ].map(([Icon, title, text], index) => {
                    const ItemIcon = Icon as typeof BookOpen;
                    return (
                      <div
                        key={title as string}
                        className={`glass-card-dark rounded-[1.5rem] p-5 ${
                          index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                        }`}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4fa3]/[0.20] to-[#8b67ff]/[0.20] text-[#ff91c7]">
                          <ItemIcon size={17} />
                        </span>
                        <p className="mt-7 text-base font-semibold">{title as string}</p>
                        <p className="mt-1 text-xs text-white/[0.32]">{text as string}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">
              One clear ecosystem
            </p>
            <h2 className="liquid-title mt-6 text-[clamp(2.2rem,4.8vw,4.2rem)] font-semibold leading-[0.91]">
              Learn. Think clearly.
              <span className="block text-black/[0.24]">Build what matters.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Link
              href="/education"
              className="liquid-shine liquid-glass group relative min-h-[38rem] overflow-hidden rounded-[2.2rem] p-7 sm:p-10"
            >
              <div className="relative z-10 max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e83491]">
                  Education platform
                </p>
                <h3 className="mt-5 text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                  Learn from people who build.
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-black/[0.46] sm:text-base">
                  Creator-led videos, structured modules, quizzes, flashcards,
                  assignments, saved progress, and a complete learning path.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e83491]">
                  Get the platform
                  <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </span>
              </div>

              <div className="absolute bottom-[-3.5rem] left-8 right-8 rounded-t-[1.7rem] border border-white/[0.70] bg-white/[0.60] p-4 shadow-[0_30px_80px_rgba(32,36,56,.14)] backdrop-blur-2xl sm:left-12 sm:right-12">
                <div className="relative overflow-hidden rounded-[1.2rem] bg-[#11111a] p-5 text-white">
                  <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#ff4fa3]/[0.25] blur-[60px]" />
                  <div className="relative flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/[0.28]">Module 04</p>
                    <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-[10px] text-white/[0.38]">
                      In progress
                    </span>
                  </div>
                  <h4 className="relative mt-12 text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    Building a business people choose.
                  </h4>
                  <div className="relative mt-8 grid grid-cols-3 gap-2">
                    {['Video', 'Quiz', 'Action'].map((item) => (
                      <div key={item} className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-4 text-center text-[10px] text-white/[0.42]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="/purityos"
              className="liquid-shine group relative min-h-[38rem] overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[#0b0b12] p-7 text-white shadow-[0_32px_90px_rgba(23,22,35,.22)] sm:p-10"
            >
              <div className="absolute right-[-8rem] top-[-8rem] h-96 w-96 rounded-full bg-[#ff4fa3]/[0.22] blur-[100px]" />
              <div className="absolute bottom-[-10rem] left-[-8rem] h-96 w-96 rounded-full bg-[#786bff]/[0.20] blur-[110px]" />
              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/[0.46]">PurityOS</p>
                  <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-[9px] uppercase tracking-wider text-white/[0.42]">
                    App coming soon
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                  Clarity, carried with you.
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/[0.40] sm:text-base">
                  A private, faith-centered companion for business decisions,
                  leadership, difficult seasons, and the next honest step.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#ff9dcc]">
                  Preview PurityOS
                  <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </span>
              </div>

              <div className="absolute bottom-[-8.5rem] left-1/2 h-[29rem] w-[14.5rem] -translate-x-1/2 rounded-[3rem] border-[7px] border-[#292932] bg-black p-2 shadow-[0_35px_80px_rgba(0,0,0,.65)] sm:left-auto sm:right-16 sm:translate-x-0">
                <div className="relative h-full overflow-hidden rounded-[2.35rem] bg-gradient-to-b from-[#25162b] via-[#13101e] to-[#08080b] p-4">
                  <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
                  <p className="mt-8 text-[10px] text-white/[0.32]">Thursday, 8:42 AM</p>
                  <h4 className="mt-3 text-xl font-semibold">Good morning.</h4>
                  <p className="mt-1 text-xs leading-5 text-white/[0.38]">What deserves your attention today?</p>
                  <div className="mt-7 space-y-3">
                    <div className="ml-8 rounded-2xl rounded-tr-md bg-white px-3 py-2.5 text-[10px] leading-4 text-black">
                      Help me focus on the decision that matters most.
                    </div>
                    <div className="mr-6 rounded-2xl border border-white/[0.08] bg-white/[0.07] px-3 py-3 text-[10px] leading-5 text-white/[0.56] backdrop-blur-xl">
                      Let’s separate urgency from importance, then choose the next faithful action.
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <Link
            href="/private-advisory"
            className="liquid-shine liquid-glass group relative mt-5 grid min-h-[33rem] overflow-hidden rounded-[2.2rem] p-7 sm:p-10 lg:grid-cols-[1fr_.9fr] lg:items-center lg:p-16"
          >
            <div className="liquid-orb -right-16 -top-24 h-72 w-72 bg-[#ff88c4]/[0.28]" />
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e83491]">
                Work with Susan
              </p>
              <h3 className="mt-6 text-3xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-5xl">
                Your vision.
                <span className="block text-black/[0.26]">A real strategy.</span>
              </h3>
              <p className="mt-7 max-w-xl text-base leading-7 text-black/[0.48]">
                Work privately with Susan to clarify the vision, strengthen the
                foundation, create a growth plan, set measurable objectives,
                and think ahead to ownership freedom, succession, or exit.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Explore working with Susan
                <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <div className="relative mt-12 lg:mt-0">
              <div className="liquid-glass-soft mx-auto max-w-md rounded-[2rem] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Founder Roadmap</p>
                  <span className="rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                    Private
                  </span>
                </div>
                <div className="mt-8 space-y-3">
                  {[
                    [Compass, "Vision & positioning"],
                    [Layers3, "Foundation & operating model"],
                    [Target, "Growth objectives"],
                    [ArrowUpRight, "Exit & legacy plan"],
                  ].map(([Icon, label]) => {
                    const ItemIcon = Icon as typeof Compass;
                    return (
                      <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-white/[0.80] bg-white/[0.55] px-4 py-4 backdrop-blur-xl">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4fa3]/[0.10] text-[#e83491]">
                          <ItemIcon size={16} />
                        </span>
                        <p className="text-sm font-medium">{label as string}</p>
                        <Check size={14} className="ml-auto text-[#e83491]/[0.55]" />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-black/[0.06] pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-black/[0.32]">First step</p>
                    <p className="mt-1 text-base font-semibold">Growth strategy call</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
        <div className="liquid-orb left-[5%] top-[-8rem] h-80 w-80 bg-[#ff4fa3]/[0.18]" />
        <div className="liquid-orb bottom-[-12rem] right-[8%] h-96 w-96 bg-[#786bff]/[0.16]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff9dcc]">
              The Susan Wagner approach
            </p>
            <div className="glass-card-dark mt-8 flex h-28 w-28 items-center justify-center rounded-full text-3xl font-semibold tracking-[-0.06em]">
              SW
            </div>
          </div>
          <div>
            <blockquote className="text-[clamp(2rem,4.2vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
              “A business should not only grow. It should become clear, healthy,
              useful, and capable of outliving the season that created it.”
            </blockquote>
            <p className="mt-8 text-sm text-white/[0.36]">
              Susan Wagner · Founder, educator, and private business mentor
            </p>
          </div>
        </div>
      </section>

      <Footer dark />
    </main>
  );
}
