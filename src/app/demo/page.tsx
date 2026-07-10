"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  MessageCircle,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

const lessons = [
  "Welcome & Platform Overview",
  "Module 1: Purpose Foundation",
  "Module 2: Faith-Based Leadership",
  "Module 3: Client Transformation",
  "Module 4: Building Your Framework",
];

const quizzes = [
  "What is your coaching promise?",
  "Who is your ideal student?",
  "What outcome should your course create?",
];

export default function DemoPage() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [notes, setNotes] = useState("Write your coaching notes here...");
  const progress = Math.round(((activeLesson + 1) / lessons.length) * 100);

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/20"
      >
        <ArrowLeft size={15} />
        Back Home
      </Link>

      <section className="px-6 pb-10 pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                Interactive Demo
              </span>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
                Coach OS Demo
              </h1>
              <p className="mt-5 max-w-2xl text-white/55">
                A live preview of a professional course platform with video lessons, notes, quizzes, downloads, progress tracking, and community.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-xs uppercase tracking-widest text-white/40">Course Progress</p>
              <p className="mt-2 text-3xl font-semibold text-[#C9A75D]">{progress}%</p>
              <div className="mt-4 h-2 w-60 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-[#C9A75D]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr_360px]">
            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9A75D] text-[#111]">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="font-semibold">Leadership Course</p>
                  <p className="text-xs text-white/40">5 lessons</p>
                </div>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson}
                    onClick={() => setActiveLesson(index)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                      activeLesson === index
                        ? "bg-[#C9A75D] text-[#111]"
                        : "bg-white/[0.04] text-white/65 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {index < activeLesson ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                    {lesson}
                  </button>
                ))}
              </div>
            </aside>

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4">
              <div className="overflow-hidden rounded-[1.5rem] bg-black">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#222] to-[#050505]">
                  <button className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-[#C9A75D] backdrop-blur transition hover:scale-110">
                    <PlayCircle size={46} />
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#1F1F1F] p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Lesson {activeLesson + 1}
                </span>
                <h2 className="mt-3 text-3xl font-semibold">{lessons[activeLesson]}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  This section gives your students a premium learning experience with video, key takeaways, action steps, and guided reflection.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {["Watch Lesson", "Complete Worksheet", "Mark Complete"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <CheckCircle2 className="text-[#C9A75D]" size={20} />
                      <p className="mt-3 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="text-[#C9A75D]" size={20} />
                  <h3 className="font-semibold">Student Notes</h3>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-40 w-full rounded-2xl border border-white/10 bg-[#1F1F1F] p-4 text-sm text-white/75 outline-none"
                />
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ClipboardList className="text-[#C9A75D]" size={20} />
                  <h3 className="font-semibold">Quick Quiz</h3>
                </div>

                <div className="space-y-3">
                  {quizzes.map((quiz) => (
                    <label key={quiz} className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/[0.04] p-3 text-sm text-white/65">
                      <input type="checkbox" className="mt-1" />
                      {quiz}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="mb-4 font-semibold">Resources</h3>
                {[
                  [Download, "Workbook PDF"],
                  [Trophy, "Certificate"],
                  [MessageCircle, "Community Thread"],
                  [Sparkles, "AI Lesson Helper"],
                ].map(([Icon, label]: any) => (
                  <button key={label} className="mb-3 flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] p-3 text-left text-sm text-white/70 transition hover:bg-white/[0.08]">
                    <Icon className="text-[#C9A75D]" size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
