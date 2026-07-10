"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Link2,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import { businessStudyModules } from "@/data/business-study-tools";

export default function BusinessFlashcardCenter() {
  const [moduleNumber, setModuleNumber] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);

  const module =
    businessStudyModules.find((item) => item.module === moduleNumber) ??
    businessStudyModules[0];

  const card = module.flashcards[cardIndex];
  const cardKey = `${moduleNumber}-${cardIndex}`;

  const progress = useMemo(() => {
    const completed = module.flashcards.filter((_, index) =>
      mastered.includes(`${moduleNumber}-${index}`),
    ).length;

    return Math.round((completed / module.flashcards.length) * 100);
  }, [mastered, module, moduleNumber]);

  function selectModule(number: number) {
    setModuleNumber(number);
    setCardIndex(0);
    setFlipped(false);
  }

  function previousCard() {
    setCardIndex((current) =>
      current === 0 ? module.flashcards.length - 1 : current - 1,
    );
    setFlipped(false);
  }

  function nextCard() {
    setCardIndex((current) =>
      current === module.flashcards.length - 1 ? 0 : current + 1,
    );
    setFlipped(false);
  }

  function randomCard() {
    let next = Math.floor(Math.random() * module.flashcards.length);

    if (module.flashcards.length > 1) {
      while (next === cardIndex) {
        next = Math.floor(Math.random() * module.flashcards.length);
      }
    }

    setCardIndex(next);
    setFlipped(false);
  }

  function toggleMastered() {
    setMastered((current) =>
      current.includes(cardKey)
        ? current.filter((item) => item !== cardKey)
        : [...current, cardKey],
    );
  }

  return (
    <section>
      <div className="mb-9">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Business Study Center
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Business Flashcards
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/45">
          Study business terms, practical examples, and the connections
          between finance, marketing, operations, leadership, and growth.
        </p>
      </div>

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {businessStudyModules.map((item) => (
          <button
            key={item.module}
            onClick={() => selectModule(item.module)}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-medium transition ${
              moduleNumber === item.module
                ? "bg-[#C9A75D] text-[#111]"
                : "border border-white/10 bg-white/[0.04] text-white/55 hover:text-white"
            }`}
          >
            Module {item.module}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Module {module.module}
          </p>

          <h2 className="mt-3 text-xl font-semibold">{module.title}</h2>

          <p className="mt-3 text-sm leading-relaxed text-white/40">
            {module.description}
          </p>

          <div className="mt-7">
            <div className="flex justify-between text-xs text-white/40">
              <span>Mastery</span>
              <span>{progress}%</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#C9A75D] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-4 gap-2">
            {module.flashcards.map((_, index) => {
              const complete = mastered.includes(`${moduleNumber}-${index}`);
              const active = index === cardIndex;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setCardIndex(index);
                    setFlipped(false);
                  }}
                  className={`flex aspect-square items-center justify-center rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-[#C9A75D] text-[#111]"
                      : complete
                        ? "bg-green-400/15 text-green-300"
                        : "bg-white/[0.05] text-white/40"
                  }`}
                >
                  {complete ? <CheckCircle2 size={15} /> : index + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={randomCard}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
          >
            <Shuffle size={16} />
            Shuffle Cards
          </button>
        </aside>

        <div>
          <button
            onClick={() => setFlipped((current) => !current)}
            className="group flex min-h-[460px] w-full items-center justify-center rounded-[2.5rem] border border-[#C9A75D]/25 bg-gradient-to-br from-[#292929] via-[#1D1D1D] to-[#111] p-8 text-center shadow-2xl transition hover:border-[#C9A75D]/60 md:p-14"
          >
            {!flipped ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A75D]">
                  Business Concept
                </p>

                <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                  {card.front}
                </h2>

                <p className="mt-10 text-sm text-white/35">
                  Select card to reveal definition
                </p>
              </div>
            ) : (
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A75D]">
                  Definition
                </p>

                <p className="mt-6 text-2xl font-semibold leading-relaxed md:text-4xl">
                  {card.back}
                </p>

                <div className="mt-9 grid gap-4 text-left md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-2 text-[#C9A75D]">
                      <Link2 size={17} />
                      <p className="text-xs font-semibold uppercase tracking-widest">
                        Business Connection
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {card.connection}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                      Example
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {card.example}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </button>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              onClick={previousCard}
              className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/60"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-white/55">
                {cardIndex + 1} of {module.flashcards.length}
              </p>

              <button
                onClick={toggleMastered}
                className={`mt-2 flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition ${
                  mastered.includes(cardKey)
                    ? "bg-green-400/15 text-green-300"
                    : "bg-white text-[#111]"
                }`}
              >
                <CheckCircle2 size={15} />
                {mastered.includes(cardKey)
                  ? "Mastered"
                  : "Mark as Mastered"}
              </button>
            </div>

            <button
              onClick={nextCard}
              className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/60"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="mx-auto mt-5 flex items-center gap-2 text-xs text-white/35 hover:text-white"
          >
            <RotateCcw size={14} />
            Show question side
          </button>
        </div>
      </div>
    </section>
  );
}