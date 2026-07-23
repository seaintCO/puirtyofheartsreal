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
    <main className="min-h-screen bg-[#f6efe7]">
      <Navbar />
      <section className="relative overflow-hidden px-6 pb-24 pt-24 sm:pt-32">
        <div className="absolute left-1/2 top-[-20%] h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[#c9a75d]/20 blur-[160px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7838]">
              The Purity curriculum
            </p>
            <h1 className="mt-6 font-serif text-6xl leading-[0.98] tracking-tight text-[#1f1f1f] sm:text-8xl">
              Learn the work.
              <span className="block italic text-[#a88643]">Lead with purpose.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#1f1f1f]/55">
              A practical business-management and leadership course supported
              by quizzes, flashcards, notes, assignments, and completion
              tracking.
            </p>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/75 bg-white/50 shadow-[0_40px_130px_rgba(70,45,10,.12)] backdrop-blur-2xl">
            <div className="grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#151411] p-10 text-white">
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a75d]/15 blur-[90px]" />
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b665]/25 bg-[#d8b665]/10 text-[#dfbe70]">
                    <PlayCircle size={27} />
                  </div>
                  <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[#dfbe70]">
                    Complete program
                  </p>
                  <p className="mt-3 font-serif text-3xl">
                    {businessLessons.length} guided lessons
                  </p>
                </div>
              </div>
              <div className="p-8 sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a88643]">
                  Business & leadership
                </p>
                <h2 className="mt-5 font-serif text-4xl tracking-tight text-[#1f1f1f] sm:text-5xl">
                  {businessCourse.title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1f1f1f]/55">
                  {businessCourse.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    `${businessLessons.length} video lessons`,
                    `About ${Math.round(totalMinutes)} minutes`,
                    `${businessCourse.modules.length} modules`,
                    "Completion certificate",
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-2 rounded-full border border-[#1f1f1f]/8 bg-white/65 px-4 py-2 text-xs text-[#1f1f1f]/55"
                    >
                      <Check size={13} className="text-[#a88643]" />
                      {feature}
                    </span>
                  ))}
                </div>
                <Link
                  href="/enroll"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-7 py-4 text-sm font-medium text-white"
                >
                  Access the course <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [
                BookOpen,
                "Structured curriculum",
                `${businessCourse.modules.length} modules presented in a clear sequence.`,
              ],
              [CheckSquare, "Apply what you learn", "Quizzes, action steps, and guided assignments."],
              [NotebookPen, "Keep your work", "Progress and notes saved to your private account."],
            ].map(([Icon, title, text]: any) => (
              <article
                key={title}
                className="rounded-[1.8rem] border border-white/70 bg-white/48 p-7 backdrop-blur-xl"
              >
                <Icon size={21} className="text-[#a88643]" />
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#1f1f1f]/48">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
