"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lock,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  moduleQuizzes,
  type ModuleQuiz,
} from "@/data/module-quizzes";

export default function ModuleQuizCenter({
  userId,
}: {
  userId: string;
}) {
  const supabase = createClient();

  const [selectedModule, setSelectedModule] = useState<ModuleQuiz>(
    moduleQuizzes[0],
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    return selectedModule.questions.reduce((total, question, index) => {
      return answers[index] === question.correctAnswer
        ? total + 1
        : total;
    }, 0);
  }, [answers, selectedModule]);

  const percentage = Math.round(
    (score / selectedModule.questions.length) * 100,
  );

  const passed = percentage >= selectedModule.passingScore;

  const question = selectedModule.questions[currentQuestion];

  function chooseModule(module: ModuleQuiz) {
    setSelectedModule(module);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
  }

  async function submitQuiz() {
    setSubmitted(true);
    setSaving(true);

    const { error } = await supabase.from("quiz_attempts").insert({
      user_id: userId,
      lesson_id: `module-${selectedModule.module}`,
      score,
      total_questions: selectedModule.questions.length,
      answers: {
        module: selectedModule.module,
        responses: answers,
        percentage,
        passed,
      },
    });

    if (!error) {
      setSaved(true);
    }

    setSaving(false);
  }

  return (
    <section>
      <div className="mb-9">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Knowledge Center
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Module Exams
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/45">
          Complete each 15-question assessment to test your understanding.
          A score of 80% or higher is required to pass.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {moduleQuizzes.map((module) => {
          const selected = module.module === selectedModule.module;

          return (
            <button
              key={module.module}
              onClick={() => chooseModule(module)}
              className={`rounded-[2rem] border p-5 text-left transition ${
                selected
                  ? "border-[#C9A75D] bg-[#C9A75D]/10"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                    Module {module.module}
                  </p>

                  <h2 className="mt-3 text-lg font-semibold">
                    {module.title}
                  </h2>
                </div>

                {selected ? (
                  <CheckCircle2 className="text-[#C9A75D]" size={21} />
                ) : (
                  <Circle className="text-white/20" size={21} />
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/40">
                {module.questions.length} questions · {module.passingScore}% required
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Question Navigator
          </p>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {selectedModule.questions.map((_, index) => {
              const answered = answers[index] !== undefined;
              const active = currentQuestion === index;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`flex aspect-square items-center justify-center rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-[#C9A75D] text-[#111]"
                      : answered
                        ? "bg-white text-[#111]"
                        : "bg-white/[0.05] text-white/40 hover:bg-white/[0.1]"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="flex justify-between text-xs text-white/40">
              <span>Answered</span>
              <span>
                {answeredCount}/{selectedModule.questions.length}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#C9A75D] transition-all"
                style={{
                  width: `${
                    (answeredCount /
                      selectedModule.questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-[#181818] p-4">
            <Lock className="text-[#C9A75D]" size={18} />

            <p className="mt-3 text-sm font-medium">
              Passing Requirement
            </p>

            <p className="mt-2 text-xs leading-relaxed text-white/40">
              Score at least {selectedModule.passingScore}% to pass this
              module exam.
            </p>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-8">
          {!submitted ? (
            <>
              <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                    Module {selectedModule.module}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    {selectedModule.title}
                  </h2>
                </div>

                <p className="text-sm text-white/40">
                  Question {currentQuestion + 1} of{" "}
                  {selectedModule.questions.length}
                </p>
              </div>

              <h3 className="max-w-3xl text-xl font-semibold leading-relaxed md:text-2xl">
                {question.question}
              </h3>

              <div className="mt-7 space-y-3">
                {question.options.map((option, optionIndex) => {
                  const selected =
                    answers[currentQuestion] === optionIndex;

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [currentQuestion]: optionIndex,
                        }))
                      }
                      className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left text-sm transition md:p-5 ${
                        selected
                          ? "border-[#C9A75D] bg-[#C9A75D]/10 text-white"
                          : "border-white/10 bg-[#181818] text-white/60 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          selected
                            ? "bg-[#C9A75D] text-[#111]"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                      <span className="pt-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
                <button
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion((current) => current - 1)
                  }
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/55 transition hover:bg-white/[0.05] disabled:opacity-30"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                {currentQuestion <
                selectedModule.questions.length - 1 ? (
                  <button
                    onClick={() =>
                      setCurrentQuestion((current) => current + 1)
                    }
                    className="flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3 text-sm font-medium text-white"
                  >
                    Next Question
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    disabled={
                      answeredCount !== selectedModule.questions.length ||
                      saving
                    }
                    onClick={submitQuiz}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <CheckCircle2 size={16} />
                    {saving ? "Submitting..." : "Submit Exam"}
                  </button>
                )}
              </div>

              {answeredCount !== selectedModule.questions.length &&
                currentQuestion ===
                  selectedModule.questions.length - 1 && (
                  <p className="mt-4 text-center text-xs text-white/35">
                    Answer all 15 questions before submitting.
                  </p>
                )}
            </>
          ) : (
            <div>
              <div
                className={`rounded-[2rem] border p-7 text-center ${
                  passed
                    ? "border-green-400/25 bg-green-400/10"
                    : "border-red-400/25 bg-red-400/10"
                }`}
              >
                {passed ? (
                  <Trophy
                    className="mx-auto text-green-300"
                    size={48}
                  />
                ) : (
                  <XCircle
                    className="mx-auto text-red-300"
                    size={48}
                  />
                )}

                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-white/45">
                  Module {selectedModule.module} Result
                </p>

                <h2 className="mt-3 text-5xl font-semibold">
                  {percentage}%
                </h2>

                <p className="mt-3 text-lg font-medium">
                  {passed ? "Module Passed" : "Review and Try Again"}
                </p>

                <p className="mt-2 text-sm text-white/45">
                  You answered {score} of{" "}
                  {selectedModule.questions.length} questions correctly.
                </p>

                {saved && (
                  <p className="mt-3 text-xs text-green-300">
                    Result saved to your account.
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-5">
                {selectedModule.questions.map((item, index) => {
                  const selectedAnswer = answers[index];
                  const correct =
                    selectedAnswer === item.correctAnswer;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-[#181818] p-5"
                    >
                      <div className="flex items-start gap-3">
                        {correct ? (
                          <CheckCircle2
                            className="mt-0.5 shrink-0 text-green-300"
                            size={19}
                          />
                        ) : (
                          <XCircle
                            className="mt-0.5 shrink-0 text-red-300"
                            size={19}
                          />
                        )}

                        <div>
                          <p className="font-medium leading-relaxed">
                            {index + 1}. {item.question}
                          </p>

                          <p className="mt-3 text-sm text-white/45">
                            Your answer:{" "}
                            <span className="text-white/70">
                              {item.options[selectedAnswer]}
                            </span>
                          </p>

                          {!correct && (
                            <p className="mt-2 text-sm text-green-300">
                              Correct answer:{" "}
                              {item.options[item.correctAnswer]}
                            </p>
                          )}

                          <p className="mt-4 rounded-2xl bg-white/[0.04] p-4 text-xs leading-relaxed text-white/50">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-[#111]"
                >
                  <RotateCcw size={16} />
                  Retake Module
                </button>

                {selectedModule.module < moduleQuizzes.length && (
                  <button
                    onClick={() =>
                      chooseModule(
                        moduleQuizzes[selectedModule.module],
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3 text-sm font-medium text-white"
                  >
                    Next Module
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}