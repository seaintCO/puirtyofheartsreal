import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  FileText,
  Layers3,
  NotebookPen,
  Play,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { businessCourse, businessLessons } from "@/data/business-course";

export const metadata = {
  title: "Education Platform",
  description:
    "A complete business education platform with creator-led video lessons, modules, quizzes, study tools, assignments, and saved progress.",
};

export default function EducationPage() {
  const totalMinutes = businessLessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);

  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />

      <section className="relative px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="liquid-orb left-[-10rem] top-[-8rem] h-[30rem] w-[30rem] bg-[#ff9dcc]/[0.30]" />
        <div className="liquid-orb right-[-10rem] top-[5rem] h-[34rem] w-[34rem] bg-[#78a8ff]/[0.28]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="liquid-glass-soft mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.46]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4fa3] pink-dot" />
            Purity Of Hearts
          </div>
          <h1 className="liquid-title public-hero-title mt-7 font-semibold">
            Learn from people <span className="liquid-gradient-text">who build.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-7 text-black/[0.47] sm:text-xl sm:leading-8">
            Creator-led business videos organized into a complete learning
            system with modules, quizzes, flashcards, assignments, saved
            progress, and certificates.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/enroll"
              className="liquid-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
            >
              Get the education platform <ArrowRight size={15} />
            </Link>
            <Link
              href="/courses"
              className="liquid-button-secondary liquid-glass-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-black"
            >
              View the curriculum
            </Link>
          </div>

          <div className="liquid-glass mx-auto mt-16 max-w-6xl rounded-[2.4rem] p-3 text-left sm:mt-20 sm:p-4">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-[#0b0b12] text-white">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#ff4fa3]/[0.22] blur-[95px]" />
              <div className="absolute -bottom-28 left-[20%] h-80 w-80 rounded-full bg-[#7b6cff]/[0.16] blur-[105px]" />

              <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8 sm:py-5">
                <div>
                  <p className="text-xs font-semibold">Purity Education Portal</p>
                  <p className="mt-1 text-[10px] text-white/[0.28]">
                    Learning, progress, and study tools in one place
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1.5 text-[10px] text-white/[0.36]">
                  Member view
                </span>
              </div>

              <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.25fr_.75fr] lg:p-8">
                <div className="liquid-shine min-h-[27rem] overflow-hidden rounded-[1.55rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6 sm:p-9">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff9dcc]">
                      Continue learning
                    </p>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-xl">
                      <Play size={15} fill="currentColor" />
                    </span>
                  </div>
                  <div className="mt-24 max-w-2xl">
                    <p className="text-sm text-white/[0.32]">Current lesson</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                      Strategy people can understand and execute.
                    </h2>
                  </div>
                  <div className="mt-10">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.10]">
                      <div className="h-full w-[47%] rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#8b67ff]" />
                    </div>
                    <div className="mt-3 flex justify-between text-[10px] text-white/[0.27]">
                      <span>15 of {businessLessons.length} lessons complete</span>
                      <span>47%</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    [Layers3, businessCourse.modules.length.toString(), "focused modules"],
                    [BookOpen, businessLessons.length.toString(), "guided lessons"],
                    [Award, `${Math.round(totalMinutes / 60)}+ hrs`, "learning content"],
                  ].map(([Icon, value, label], index) => {
                    const ItemIcon = Icon as typeof Layers3;
                    return (
                      <div
                        key={label as string}
                        className={`glass-card-dark rounded-[1.45rem] p-5 ${
                          index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                        }`}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4fa3]/[0.12] text-[#ff91c7]">
                          <ItemIcon size={17} />
                        </span>
                        <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                          {value as string}
                        </p>
                        <p className="mt-1 text-xs text-white/[0.28]">{label as string}</p>
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
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e83491]">
                Designed for action
              </p>
              <h2 className="liquid-title mt-6 text-[clamp(2.15rem,4.7vw,4rem)] font-semibold leading-[0.92]">
                More than a folder of videos.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-black/[0.45]">
              Learn the idea, test your understanding, capture what matters,
              complete the action, and return exactly where you stopped.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [Play, "Creator-led video lessons", "Focused instruction from experienced creators and operators."],
              [Layers3, "Structured modules", "A clear sequence so members always know what to learn next."],
              [CheckCircle2, "Quizzes", "Knowledge checks that reinforce the ideas that matter."],
              [Sparkles, "Flashcards & cheat sheets", "Fast review tools for frameworks, principles, and decisions."],
              [NotebookPen, "Journal & assignments", "Turn each lesson into written thinking and practical action."],
              [Award, "Progress & certificates", "Saved completion data and recognition at the end of the curriculum."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof Play;
              return (
                <article key={title as string} className="liquid-glass-soft rounded-[1.9rem] p-7 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.80] bg-white/[0.62] text-[#e83491] shadow-sm">
                    <ItemIcon size={18} />
                  </span>
                  <h3 className="mt-9 text-xl font-semibold tracking-[-0.035em]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/[0.43]">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
        <div className="liquid-orb left-[-8rem] top-[-10rem] h-96 w-96 bg-[#ff4fa3]/[0.17]" />
        <div className="liquid-orb bottom-[-12rem] right-[-7rem] h-96 w-96 bg-[#786bff]/[0.16]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff9dcc]">
              Built around the existing course
            </p>
            <h2 className="liquid-title mt-6 text-[clamp(2.15rem,4.6vw,4rem)] font-semibold leading-[0.94]">
              A new interface. The same learning system.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/[0.40]">
              The course curriculum, lesson content, quizzes, flashcards,
              assignments, progress tracking, notes, and certificates remain
              intact. Only the visual experience has been upgraded.
            </p>
          </div>

          <div className="liquid-glass-dark rounded-[2rem] p-5 sm:p-8">
            <div className="space-y-3">
              {[
                "Course curriculum preserved",
                "Lessons and videos preserved",
                "Quiz questions and scoring preserved",
                "Student progress and notes preserved",
                "Flashcards, assignments, and certificates preserved",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-4 text-sm text-white/[0.58]">
                  <Check size={15} className="text-[#ff91c7]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="liquid-glass mx-auto max-w-5xl rounded-[2.4rem] px-6 py-16 sm:px-12 sm:py-20">
          <FileText size={27} className="mx-auto text-[#e83491]" />
          <h2 className="liquid-title mt-7 text-3xl font-semibold leading-[0.98] sm:text-5xl">
            Learn it. Apply it. Build it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-black/[0.45]">
            Get access to the complete Purity of Hearts business education platform.
          </p>
          <Link
            href="/enroll"
            className="liquid-button mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-7 py-4 text-sm font-semibold text-white"
          >
            Get the education platform <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
