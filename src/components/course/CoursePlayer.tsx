"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  LogOut,
  MessageCircle,
  NotebookPen,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const lessons = [
  {
    id: "welcome",
    title: "Welcome to Purity of Hearts",
    module: "Start Here",
    description:
      "Meet Susan, understand the program, and prepare for your coaching journey.",
  },
  {
    id: "faith-foundation",
    title: "Building Your Faith Foundation",
    module: "Module 1",
    description:
      "Create the spiritual foundation required to lead with confidence and purpose.",
  },
  {
    id: "purpose",
    title: "Discovering Your Purpose",
    module: "Module 2",
    description:
      "Identify your calling, values, strengths, and the work God is preparing you to do.",
  },
  {
    id: "leadership",
    title: "Faith-Based Leadership",
    module: "Module 3",
    description:
      "Learn how to lead your family, organization, or business through biblical wisdom.",
  },
  {
    id: "action-plan",
    title: "Your 30-Day Purpose Plan",
    module: "Module 4",
    description:
      "Turn the lessons into an actionable plan with clear spiritual and leadership goals.",
  },
];

export default function CoursePlayer({
  userId,
  studentName,
}: {
  userId: string;
  studentName: string;
}) {
  const supabase = createClient();

  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [notes, setNotes] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizMessage, setQuizMessage] = useState("");

  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];

  const progress = useMemo(
    () => Math.round((completedLessons.length / lessons.length) * 100),
    [completedLessons],
  );

  useEffect(() => {
    async function loadData() {
      const [{ data: progressData }, { data: noteData }] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", userId)
          .eq("completed", true),
        supabase
          .from("lesson_notes")
          .select("content")
          .eq("user_id", userId)
          .eq("lesson_id", activeLessonId)
          .maybeSingle(),
      ]);

      setCompletedLessons(
        progressData?.map((item) => item.lesson_id) ?? [],
      );

      setNotes(noteData?.content ?? "");
    }

    loadData();
  }, [activeLessonId, supabase, userId]);

  async function saveNotes() {
    setSaving(true);

    await supabase.from("lesson_notes").upsert(
      {
        user_id: userId,
        lesson_id: activeLessonId,
        content: notes,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,lesson_id",
      },
    );

    setSaving(false);
  }

  async function markComplete() {
    const currentlyComplete = completedLessons.includes(activeLessonId);
    const completed = !currentlyComplete;

    await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: activeLessonId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,lesson_id",
      },
    );

    setCompletedLessons((current) =>
      completed
        ? [...new Set([...current, activeLessonId])]
        : current.filter((lessonId) => lessonId !== activeLessonId),
    );
  }

  async function submitQuiz() {
    if (!quizAnswer) {
      setQuizMessage("Choose an answer first.");
      return;
    }

    const correct = quizAnswer === "purpose";

    await supabase.from("quiz_attempts").insert({
      user_id: userId,
      lesson_id: activeLessonId,
      score: correct ? 1 : 0,
      total_questions: 1,
      answers: {
        selected: quizAnswer,
      },
    });

    setQuizMessage(
      correct
        ? "Correct. Purpose should be rooted in faith, service, and action."
        : "Review the lesson and try again.",
    );
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <header className="border-b border-white/10 bg-[#151515] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Purity of Hearts</p>
            <p className="mt-1 text-xs text-white/40">
              Welcome, {studentName}
            </p>
          </div>

          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[290px_1fr_350px]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
              Program Progress
            </p>
            <p className="mt-3 text-3xl font-semibold">{progress}%</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[#C9A75D] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson) => {
              const complete = completedLessons.includes(lesson.id);
              const active = lesson.id === activeLessonId;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full rounded-2xl p-4 text-left transition ${
                    active
                      ? "bg-[#C9A75D] text-[#111]"
                      : "bg-white/[0.04] text-white/65 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {complete ? (
                      <CheckCircle2 size={17} />
                    ) : (
                      <PlayCircle size={17} />
                    )}

                    <div>
                      <p className="text-xs font-medium opacity-60">
                        {lesson.module}
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {lesson.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#292929] to-black">
              <button className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-[#C9A75D] backdrop-blur transition hover:scale-110 hover:bg-white/15">
                <PlayCircle size={46} />
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
              {activeLesson.module}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {activeLesson.title}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {activeLesson.description}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                [BookOpen, "Lesson Overview"],
                [FileText, "Download Workbook"],
                [MessageCircle, "Discussion"],
              ].map(([Icon, label]: any) => (
                <button
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:bg-white/[0.08]"
                >
                  <Icon className="text-[#C9A75D]" size={20} />
                  <p className="mt-3 text-sm font-medium">{label}</p>
                </button>
              ))}
            </div>

            <button
              onClick={markComplete}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#b59550]"
            >
              <CheckCircle2 size={17} />
              {completedLessons.includes(activeLessonId)
                ? "Mark Incomplete"
                : "Mark Lesson Complete"}
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center gap-2">
              <NotebookPen className="text-[#C9A75D]" size={20} />
              <h2 className="font-semibold">Lesson Notes</h2>
            </div>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write your reflections..."
              className="min-h-44 w-full resize-none rounded-2xl border border-white/10 bg-[#1F1F1F] p-4 text-sm text-white/75 outline-none focus:border-[#C9A75D]"
            />

            <button
              onClick={saveNotes}
              className="mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-[#111]"
            >
              {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="font-semibold">Quick Quiz</h2>

            <p className="mt-3 text-sm leading-relaxed text-white/55">
              What should faith-based purpose produce?
            </p>

            <div className="mt-4 space-y-3">
              {[
                ["attention", "Attention only"],
                ["purpose", "Faith, service, and action"],
                ["money", "Money without responsibility"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/[0.04] p-3 text-sm text-white/65"
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={value}
                    checked={quizAnswer === value}
                    onChange={(event) =>
                      setQuizAnswer(event.target.value)
                    }
                  />
                  {label}
                </label>
              ))}
            </div>

            <button
              onClick={submitQuiz}
              className="mt-4 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-medium"
            >
              Submit Answer
            </button>

            {quizMessage && (
              <p className="mt-4 rounded-2xl bg-white/[0.05] p-3 text-xs leading-relaxed text-white/60">
                {quizMessage}
              </p>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#C9A75D]/20 bg-[#C9A75D]/10 p-5">
            <Trophy className="text-[#C9A75D]" size={24} />
            <h2 className="mt-4 font-semibold">Certificate</h2>
            <p className="mt-2 text-xs leading-relaxed text-white/45">
              Complete every module to unlock your certificate.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}