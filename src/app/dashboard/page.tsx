import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FolderOpen,
  MessageCircle,
  NotebookPen,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requirePaidUser } from "@/lib/auth/require-paid-user";
import { businessLessons } from "@/data/business-course";

export default async function DashboardPage() {
  const { user, profile } = await requirePaidUser();
  const supabase = await createClient();
  const [{ data: progress }, { count: journalCount }, { data: attempts }] =
    await Promise.all([
      supabase
        .from("lesson_progress")
        .select("lesson_id, completed, last_viewed_at")
        .eq("user_id", user.id)
        .eq("course_id", "purity-main"),
      supabase
        .from("journal_entries")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("quiz_attempts")
        .select("quiz_id, passed")
        .eq("user_id", user.id),
    ]);

  const completedIds = new Set(
    (progress ?? []).filter((item) => item.completed).map((item) => item.lesson_id),
  );
  const completedCount = completedIds.size;
  const progressPercent = Math.round(
    (completedCount / Math.max(businessLessons.length, 1)) * 100,
  );
  const nextLesson =
    businessLessons.find((lesson) => !completedIds.has(lesson.id)) ??
    businessLessons[0];
  const passedQuizzes = new Set(
    (attempts ?? []).filter((attempt) => attempt.passed).map((attempt) => attempt.quiz_id),
  ).size;
  const firstName =
    profile.full_name?.trim().split(/\s+/)[0] ||
    user.email?.split("@")[0] ||
    "Member";

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
            Member home
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
            Keep going, {firstName}.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Everything you’ve completed, saved, and started is waiting exactly
            where you left it.
          </p>
        </div>
        <Link
          href="/purityos"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8b665]/20 bg-[#d8b665]/10 px-5 py-3 text-sm text-[#e7ca82]"
        >
          <Sparkles size={16} />
          Ask PurityOS
        </Link>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [Target, `${progressPercent}%`, "Course progress"],
          [CheckCircle2, `${completedCount}/${businessLessons.length}`, "Lessons complete"],
          [Trophy, String(passedQuizzes), "Quizzes passed"],
          [NotebookPen, String(journalCount ?? 0), "Journal entries"],
        ].map(([Icon, value, label]: any) => (
          <article
            key={label}
            className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
          >
            <Icon size={18} className="text-[#d8b665]" />
            <p className="mt-6 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-xs text-white/35">{label}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <article className="relative overflow-hidden rounded-[2rem] border border-[#d8b665]/18 bg-gradient-to-br from-[#d8b665]/13 via-white/[0.035] to-white/[0.02] p-6 sm:p-8">
          <div className="absolute right-[-10%] top-[-50%] h-72 w-72 rounded-full bg-[#d8b665]/10 blur-[80px]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e0c376]">
              Continue learning
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl sm:text-4xl">
              {completedCount >= businessLessons.length
                ? "Your course is complete"
                : nextLesson.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              {completedCount >= businessLessons.length
                ? "Review any lesson or open your certificate."
                : `Module ${nextLesson.module} · Lesson ${nextLesson.lesson} · ${nextLesson.duration}`}
            </p>
            <div className="mt-7 h-1.5 max-w-xl overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#987334] to-[#f0d58d]"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard/lessons"
                className="inline-flex items-center gap-2 rounded-full bg-[#d8b665] px-6 py-3.5 text-sm font-semibold text-[#17130c]"
              >
                {completedCount >= businessLessons.length ? "Review course" : "Continue lesson"}
                <ArrowRight size={16} />
              </Link>
              {completedCount >= businessLessons.length && (
                <Link
                  href="/dashboard/certificates"
                  className="rounded-full border border-white/10 px-6 py-3.5 text-sm text-white/55"
                >
                  View certificate
                </Link>
              )}
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
            Member shortcuts
          </p>
          <div className="mt-5 space-y-2">
            {[
              [NotebookPen, "Open journal", "/dashboard/journal"],
              [FolderOpen, "Resource vault", "/dashboard/resources"],
              [MessageCircle, "Private community", "/dashboard/community"],
              [BookOpen, "Course library", "/dashboard/courses"],
            ].map(([Icon, label, href]: any) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3.5 text-sm text-white/48 transition hover:bg-white/[0.05] hover:text-white/75"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="text-[#d8b665]" />
                  {label}
                </span>
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
