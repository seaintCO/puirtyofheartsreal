import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckSquare,
  NotebookPen,
  PlayCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { businessCourse, businessLessons } from "@/data/business-course";

export default function CoursesPage() {
  const totalMinutes = businessLessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);

  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />
      <section className="relative px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="liquid-orb left-[-10rem] top-[-9rem] h-[31rem] w-[31rem] bg-[#ff9dcc]/[0.28]" />
        <div className="liquid-orb right-[-11rem] top-[3rem] h-[35rem] w-[35rem] bg-[#78a8ff]/[0.25]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-7xl text-center">
            <div className="liquid-glass-soft mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.46]">
              <span className="pink-dot h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" />
              Purity Of Hearts
            </div>
            <h1 className="liquid-title public-hero-title mt-7 font-semibold">
              Learn the work. <span className="liquid-gradient-text">Lead with purpose.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black/[0.46] sm:text-lg sm:leading-8">
              A practical business-management and leadership course supported
              by quizzes, flashcards, notes, assignments, and completion tracking.
            </p>
          </div>

          <div className="liquid-glass mt-16 overflow-hidden rounded-[2.5rem] p-3 sm:p-4">
            <div className="grid overflow-hidden rounded-[1.9rem] bg-[#0b0b12] text-white lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden p-10">
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4fa3]/[0.20] blur-[90px]" />
                <div className="absolute bottom-[-8rem] left-[-6rem] h-80 w-80 rounded-full bg-[#8b67ff]/[0.17] blur-[100px]" />
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] text-[#ff91c7] shadow-2xl backdrop-blur-xl">
                    <PlayCircle size={27} />
                  </div>
                  <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[#ff91c7]">
                    Complete program
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    {businessLessons.length} guided lessons
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.08] bg-white/[0.045] p-8 backdrop-blur-2xl sm:p-12 lg:border-l lg:border-t-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff91c7]">
                  Business &amp; leadership
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {businessCourse.title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/[0.42]">
                  {businessCourse.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    `${businessLessons.length} video lessons`,
                    `About ${Math.round(totalMinutes)} minutes`,
                    `${businessCourse.modules.length} modules`,
                    "Completion certificate",
                  ].map((feature) => (
                    <span key={feature} className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.05] px-4 py-2 text-xs text-white/[0.48]">
                      <Check size={13} className="text-[#ff91c7]" />
                      {feature}
                    </span>
                  ))}
                </div>
                <Link
                  href="/enroll"
                  className="liquid-button mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
                >
                  Access the course <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [BookOpen, "Structured curriculum", `${businessCourse.modules.length} modules presented in a clear sequence.`],
              [CheckSquare, "Apply what you learn", "Quizzes, action steps, and guided assignments."],
              [NotebookPen, "Keep your work", "Progress and notes saved to your private account."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof BookOpen;
              return (
                <article key={title as string} className="liquid-glass-soft rounded-[1.8rem] p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4fa3]/[0.10] text-[#e83491]">
                    <ItemIcon size={20} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/[0.43]">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
