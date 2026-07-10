"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers3,
  ListChecks,
  NotebookPen,
  PlayCircle,
  RotateCcw,
  Save,
  Trophy,
} from "lucide-react";
import {
  businessCourse,
  businessLessons,
  type CourseLesson,
} from "@/data/business-course";

type Tab = "lesson" | "quiz" | "flashcards" | "cheat-sheet" | "assignment";

export default function BusinessCoursePlayer() {
  const [activeLessonId, setActiveLessonId] = useState(businessLessons[0].id);
  const [activeTab, setActiveTab] = useState<Tab>("lesson");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const activeLesson =
    businessLessons.find((lesson) => lesson.id === activeLessonId) ??
    businessLessons[0];

  const activeIndex = businessLessons.findIndex(
    (lesson) => lesson.id === activeLesson.id,
  );

  const progress = Math.round(
    (completed.length / businessLessons.length) * 100,
  );

  const quizScore = useMemo(() => {
    return activeLesson.quiz.reduce((score, question, index) => {
      return answers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  }, [activeLesson, answers]);

  function openLesson(lesson: CourseLesson) {
    setActiveLessonId(lesson.id);
    setActiveTab("lesson");
    setAnswers({});
    setQuizSubmitted(false);
    setFlashcardIndex(0);
    setFlipped(false);
  }

  function changeLesson(direction: number) {
    const nextIndex = activeIndex + direction;

    if (nextIndex >= 0 && nextIndex < businessLessons.length) {
      openLesson(businessLessons[nextIndex]);
    }
  }

  function markComplete() {
    setCompleted((current) =>
      current.includes(activeLesson.id)
        ? current.filter((id) => id !== activeLesson.id)
        : [...current, activeLesson.id],
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "lesson", label: "Lesson", icon: PlayCircle },
    { id: "quiz", label: "Quiz", icon: ListChecks },
    { id: "flashcards", label: "Flashcards", icon: Layers3 },
    { id: "cheat-sheet", label: "Cheat Sheet", icon: FileText },
    { id: "assignment", label: "Assignment", icon: NotebookPen },
  ];

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Business Academy
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {businessCourse.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/45">
            {businessCourse.description}
          </p>
        </div>

        <div className="min-w-64 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex justify-between text-xs text-white/45">
            <span>Course progress</span>
            <span>{progress}%</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#C9A75D] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs text-white/35">
            {completed.length} of {businessLessons.length} lessons complete
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="max-h-[850px] overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
          {businessCourse.modules.map((module) => {
            const moduleLessons = businessLessons.filter(
              (lesson) => lesson.module === module.number,
            );

            return (
              <div key={module.number} className="mb-7">
                <div className="mb-3 px-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A75D]">
                    Module {module.number}
                  </p>
                  <h2 className="mt-2 text-sm font-semibold text-white">
                    {module.title}
                  </h2>
                </div>

                <div className="space-y-2">
                  {moduleLessons.map((lesson) => {
                    const selected = lesson.id === activeLesson.id;
                    const isComplete = completed.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => openLesson(lesson)}
                        className={`w-full rounded-2xl p-4 text-left transition ${
                          selected
                            ? "bg-[#C9A75D] text-[#111]"
                            : "bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        <div className="flex gap-3">
                          {isComplete ? (
                            <CheckCircle2 size={17} className="shrink-0" />
                          ) : (
                            <PlayCircle size={17} className="shrink-0" />
                          )}

                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-relaxed">
                              {lesson.title}
                            </p>
                            <p className="mt-2 text-[10px] opacity-50">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                  activeTab === id
                    ? "bg-[#C9A75D] text-[#111]"
                    : "border border-white/10 bg-white/[0.04] text-white/55 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:p-6">
            {activeTab === "lesson" && (
              <div>
                {activeLesson.youtubeUrl ? (
                  <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-black">
                    <iframe
                      src={activeLesson.youtubeUrl}
                      title={activeLesson.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#272727] to-[#121212]">
                    <div className="text-center">
                      <PlayCircle
                        className="mx-auto text-[#C9A75D]"
                        size={52}
                      />
                      <p className="mt-4 text-sm font-medium">
                        Video link coming soon
                      </p>
                      <p className="mt-2 text-xs text-white/35">
                        Add the YouTube URL for this lesson.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                    Module {activeLesson.module} · Lesson {activeLesson.lesson}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    {activeLesson.title}
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {activeLesson.description}
                  </p>

                  <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Trophy className="text-[#C9A75D]" size={19} />
                        Learning objectives
                      </h3>

                      <div className="mt-4 space-y-3">
                        {activeLesson.objectives.map((objective) => (
                          <p
                            key={objective}
                            className="flex gap-3 text-sm leading-relaxed text-white/55"
                          >
                            <CheckCircle2
                              className="mt-0.5 shrink-0 text-[#C9A75D]"
                              size={16}
                            />
                            {objective}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <BookOpen className="text-[#C9A75D]" size={19} />
                        Lesson notes
                      </h3>

                      <textarea
                        value={notes[activeLesson.id] ?? ""}
                        onChange={(event) =>
                          setNotes((current) => ({
                            ...current,
                            [activeLesson.id]: event.target.value,
                          }))
                        }
                        placeholder="Write your notes and reflections..."
                        className="mt-4 min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-[#111] p-4 text-sm text-white/70 outline-none focus:border-[#C9A75D]"
                      />

                      <button className="mt-3 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111]">
                        <Save size={15} />
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quiz" && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Knowledge Check
                </span>

                <h2 className="mt-3 text-3xl font-semibold">
                  Lesson Quiz
                </h2>

                <p className="mt-3 text-sm text-white/45">
                  Answer each question and submit your responses.
                </p>

                <div className="mt-8 space-y-6">
                  {activeLesson.quiz.map((question, questionIndex) => (
                    <div
                      key={question.question}
                      className="rounded-2xl border border-white/10 bg-[#181818] p-5"
                    >
                      <p className="font-medium leading-relaxed">
                        {questionIndex + 1}. {question.question}
                      </p>

                      <div className="mt-4 space-y-3">
                        {question.options.map((option, optionIndex) => {
                          const selected =
                            answers[questionIndex] === optionIndex;

                          const correct =
                            quizSubmitted &&
                            optionIndex === question.correctAnswer;

                          const incorrect =
                            quizSubmitted &&
                            selected &&
                            optionIndex !== question.correctAnswer;

                          return (
                            <button
                              key={option}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setAnswers((current) => ({
                                    ...current,
                                    [questionIndex]: optionIndex,
                                  }));
                                }
                              }}
                              className={`w-full rounded-2xl border p-4 text-left text-sm transition ${
                                correct
                                  ? "border-green-400/40 bg-green-400/10 text-green-200"
                                  : incorrect
                                    ? "border-red-400/40 bg-red-400/10 text-red-200"
                                    : selected
                                      ? "border-[#C9A75D] bg-[#C9A75D]/10 text-white"
                                      : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="mt-4 rounded-2xl bg-white/[0.04] p-4 text-xs leading-relaxed text-white/55">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="mt-7 rounded-full bg-[#C9A75D] px-8 py-4 text-sm font-medium text-white"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <div className="mt-7 rounded-2xl border border-[#C9A75D]/30 bg-[#C9A75D]/10 p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                      Quiz Result
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      {quizScore}/{activeLesson.quiz.length}
                    </p>

                    <button
                      onClick={() => {
                        setAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="mt-5 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111]"
                    >
                      <RotateCcw size={15} />
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "flashcards" && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Study Mode
                </span>

                <h2 className="mt-3 text-3xl font-semibold">
                  Lesson Flashcards
                </h2>

                <p className="mt-3 text-sm text-white/45">
                  Select the card to reveal the answer.
                </p>

                <button
                  onClick={() => setFlipped((current) => !current)}
                  className="mt-8 flex min-h-[320px] w-full items-center justify-center rounded-[2rem] border border-[#C9A75D]/25 bg-gradient-to-br from-[#262626] to-[#151515] p-10 text-center transition hover:border-[#C9A75D]/60"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                      {flipped ? "Answer" : "Question"}
                    </p>

                    <p className="mx-auto mt-6 max-w-2xl text-2xl font-semibold leading-relaxed md:text-4xl">
                      {flipped
                        ? activeLesson.flashcards[flashcardIndex].back
                        : activeLesson.flashcards[flashcardIndex].front}
                    </p>

                    <p className="mt-8 text-xs text-white/35">
                      Select to flip
                    </p>
                  </div>
                </button>

                <div className="mt-5 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFlashcardIndex((current) =>
                        current === 0
                          ? activeLesson.flashcards.length - 1
                          : current - 1,
                      );
                      setFlipped(false);
                    }}
                    className="rounded-full border border-white/10 p-3 text-white/60 hover:text-white"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <p className="text-sm text-white/40">
                    {flashcardIndex + 1} of {activeLesson.flashcards.length}
                  </p>

                  <button
                    onClick={() => {
                      setFlashcardIndex((current) =>
                        current === activeLesson.flashcards.length - 1
                          ? 0
                          : current + 1,
                      );
                      setFlipped(false);
                    }}
                    className="rounded-full border border-white/10 p-3 text-white/60 hover:text-white"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "cheat-sheet" && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Quick Reference
                </span>

                <h2 className="mt-3 text-3xl font-semibold">
                  {activeLesson.title} Cheat Sheet
                </h2>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {activeLesson.keyPoints.map((point, index) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-[#181818] p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                        Principle {index + 1}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-white/65">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="mt-7 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#111]">
                  <FileText size={16} />
                  Download Cheat Sheet
                </button>
              </div>
            )}

            {activeTab === "assignment" && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Apply the Lesson
                </span>

                <h2 className="mt-3 text-3xl font-semibold">
                  Action Assignment
                </h2>

                <div className="mt-8 rounded-[2rem] border border-[#C9A75D]/25 bg-[#C9A75D]/10 p-7">
                  <p className="text-lg font-medium leading-relaxed">
                    {activeLesson.actionStep}
                  </p>
                </div>

                <textarea
                  placeholder="Complete the assignment or record your action plan..."
                  className="mt-6 min-h-72 w-full resize-none rounded-[2rem] border border-white/10 bg-[#181818] p-6 text-sm leading-relaxed text-white/70 outline-none focus:border-[#C9A75D]"
                />

                <button className="mt-5 flex items-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3.5 text-sm font-medium text-white">
                  <Save size={16} />
                  Save Assignment
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row">
            <button
              disabled={activeIndex === 0}
              onClick={() => changeLesson(-1)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/55 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} />
              Previous Lesson
            </button>

            <button
              onClick={markComplete}
              className={`flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition ${
                completed.includes(activeLesson.id)
                  ? "bg-green-500/15 text-green-300"
                  : "bg-[#C9A75D] text-white"
              }`}
            >
              <CheckCircle2 size={16} />
              {completed.includes(activeLesson.id)
                ? "Lesson Completed"
                : "Mark Complete"}
            </button>

            <button
              disabled={activeIndex === businessLessons.length - 1}
              onClick={() => changeLesson(1)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/55 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next Lesson
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
