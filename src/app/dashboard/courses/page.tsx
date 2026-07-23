import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { businessLessons } from "@/data/business-course";
import { requirePaidUser } from "@/lib/auth/require-paid-user";
import { createClient } from "@/lib/supabase/server";

export default async function CoursesPage() {
  const { user } = await requirePaidUser();
  const supabase = await createClient();
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id)
    .eq("course_id", "purity-main");
  const completedIds = new Set(
    (progress ?? []).filter((item) => item.completed).map((item) => item.lesson_id),
  );
  const nextLesson =
    businessLessons.find((lesson) => !completedIds.has(lesson.id)) ??
    businessLessons[0];
  const progressPercent = Math.round(
    (completedIds.size / Math.max(businessLessons.length, 1)) * 100,
  );
  const totalMinutes = businessLessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);

  return (
    <section>
      <div className="mb-9">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Course Library
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Your Courses
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
          Continue your videos, quizzes, flashcards, cheat sheets, notes, and
          assignments.
        </p>
      </div>

      <div className="max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden bg-gradient-to-br from-[#2C2C2C] via-[#1F1F1F] to-[#111]">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#C9A75D]/15 blur-[90px]" />

          <PlayCircle className="relative text-[#C9A75D]" size={64} />
        </div>

        <div className="p-7">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Complete Business Program
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Business Management & Leadership
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
            Finance, strategy, marketing, operations, people, accounting,
            economics, customer acquisition, product launches, and leadership.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              `${businessLessons.length} Lessons`,
              `Approximately ${Math.round(totalMinutes)} Minutes`,
              "Quizzes",
              "Flashcards",
              "Cheat Sheets",
              "Assignments",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/55"
              >
                <CheckCircle2 size={13} className="text-[#C9A75D]" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/35">
                Current Progress
              </p>
              <p className="mt-2 text-sm text-white/60">
                {completedIds.size >= businessLessons.length
                  ? "Course complete — review any lesson"
                  : `Continue with ${nextLesson.title}`}
              </p>
            </div>

            <Link
              href="/dashboard/lessons"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3.5 text-sm font-medium text-white"
            >
              Open Course
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#C9A75D]"
              style={{ width: `${Math.max(progressPercent, 2)}%` }}
            />
          </div>
          <p className="mt-2 text-right text-[10px] text-white/30">
            {progressPercent}% complete
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          [`${businessLessons.length} Video Lessons`, PlayCircle],
          ["Interactive Study Tools", BookOpen],
          ["Completion Tracking", CheckCircle2],
        ].map(([title, Icon]: any) => (
          <div
            key={title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <Icon className="text-[#C9A75D]" size={24} />
            <p className="mt-4 text-sm font-semibold">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
