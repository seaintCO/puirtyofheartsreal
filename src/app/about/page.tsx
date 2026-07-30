import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  HeartHandshake,
  Layers3,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Susan",
  description:
    "Meet Susan Wagner and the philosophy behind her education platform, PurityOS, and private growth strategy work.",
};

export default function AboutPage() {
  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />

      <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="liquid-orb left-[-10rem] top-[-10rem] h-[32rem] w-[32rem] bg-[#ff9dcc]/[0.28]" />
        <div className="liquid-orb right-[-11rem] top-[3rem] h-[36rem] w-[36rem] bg-[#78a8ff]/[0.25]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <div className="liquid-glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.46]">
              <span className="pink-dot h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" />
              Purity Of Hearts
            </div>
            <h1 className="liquid-title public-hero-title-split mt-7 font-semibold">
              Business with clarity. <span className="liquid-gradient-text">Growth with purpose.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-black/[0.47] sm:text-lg sm:leading-8">
              Susan’s work brings education, faith-centered reflection, and
              private strategy into one ecosystem for founders who want to build
              something healthy, useful, and capable of lasting.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="liquid-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
              >
                Book a strategy call <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/education"
                className="liquid-button-secondary liquid-glass-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-black"
              >
                Explore education <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="liquid-glass relative mx-auto aspect-square w-full max-w-[34rem] rounded-[3rem] p-3">
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[2.35rem] bg-[#0a0a10] text-white">
              <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-20 rounded-full border border-white/[0.06]" />
              <div className="absolute left-5 top-5 h-52 w-52 rounded-full bg-[#ff4fa3]/[0.20] blur-[75px]" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#8b67ff]/[0.18] blur-[80px]" />
              <div className="relative text-center">
                <p className="text-[8rem] font-semibold leading-none tracking-[-0.09em] sm:text-[11rem]">SW</p>
                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/[0.32]">
                  Founder · Educator · Mentor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">The work</p>
            <h2 className="liquid-title mt-6 text-[clamp(2.15rem,4.7vw,3.9rem)] font-semibold leading-[0.92]">
              Three expressions. One philosophy.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {[
              [Layers3, "Education", "A structured platform that turns creator-led business knowledge into modules, quizzes, study tools, and practical execution."],
              [HeartHandshake, "PurityOS", "A private, faith-centered companion for decisions, leadership, difficult seasons, and everyday clarity."],
              [Compass, "Private Strategy", "Direct work with Susan to define the vision, strengthen the foundation, build a growth strategy, set objectives, and plan the long term."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof Layers3;
              return (
                <article key={title as string} className="liquid-glass-soft rounded-[1.9rem] p-7 sm:p-9">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.80] bg-white/[0.60] text-[#e83491] shadow-sm">
                    <ItemIcon size={18} />
                  </span>
                  <h3 className="mt-11 text-2xl font-semibold tracking-[-0.04em]">{title as string}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/[0.44]">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
        <div className="liquid-orb left-[-8rem] top-[-10rem] h-96 w-96 bg-[#ff4fa3]/[0.17]" />
        <div className="liquid-orb bottom-[-12rem] right-[-7rem] h-96 w-96 bg-[#786bff]/[0.16]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff91c7]">
              What guides the work
            </p>
          </div>
          <blockquote className="text-[clamp(2rem,4.2vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
            Build clearly. Lead responsibly. Grow without losing the reason you began.
          </blockquote>
        </div>
      </section>

      <Footer dark />
    </main>
  );
}
