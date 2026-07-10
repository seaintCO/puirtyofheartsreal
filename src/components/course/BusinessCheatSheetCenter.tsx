"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Download,
  Lightbulb,
  Link2,
  Printer,
} from "lucide-react";
import { businessStudyModules } from "@/data/business-study-tools";

export default function BusinessCheatSheetCenter() {
  const [moduleNumber, setModuleNumber] = useState(1);

  const module =
    businessStudyModules.find((item) => item.module === moduleNumber) ??
    businessStudyModules[0];

  function printSheet() {
    window.print();
  }

  return (
    <section>
      <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Quick Reference Library
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Business Cheat Sheets
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/45">
            Review the most important concepts, formulas, action steps, and
            connections across your business.
          </p>
        </div>

        <button
          onClick={printSheet}
          className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#111]"
        >
          <Printer size={16} />
          Print Current Sheet
        </button>
      </div>

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2 print:hidden">
        {businessStudyModules.map((item) => (
          <button
            key={item.module}
            onClick={() => setModuleNumber(item.module)}
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

      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 print:border-black print:bg-white print:text-black">
        <div className="border-b border-white/10 pb-8 print:border-black/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A75D]">
            Module {module.module}
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            {module.title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/45 print:text-black/60">
            {module.description}
          </p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {module.cheatSheet.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-[#181818] p-6 print:border-black/10 print:bg-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9A75D]/15 text-[#C9A75D]">
                <Lightbulb size={21} />
              </div>

              <h3 className="mt-5 text-xl font-semibold">{section.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-white/45 print:text-black/60">
                {section.summary}
              </p>

              <div className="mt-6 space-y-3">
                {section.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/65 print:text-black/75"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[#C9A75D]"
                      size={16}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {section.formula && (
                <div className="mt-6 rounded-2xl border border-[#C9A75D]/20 bg-[#C9A75D]/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                    Formula
                  </p>

                  <p className="mt-3 text-sm font-semibold">
                    {section.formula}
                  </p>
                </div>
              )}

              {section.action && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 print:border-black/10">
                  <div className="flex items-center gap-2 text-[#C9A75D]">
                    <Link2 size={15} />
                    <p className="text-xs font-semibold uppercase tracking-widest">
                      Apply It
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/60 print:text-black/70">
                    {section.action}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#C9A75D]/25 bg-[#C9A75D]/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            How This Module Connects
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/65 print:text-black/70">
            {module.module === 1 &&
              "Strong financial and strategic foundations help every later business function make better decisions."}

            {module.module === 2 &&
              "Marketing creates demand while operations deliver the promise. Growth fails when either side is weak."}

            {module.module === 3 &&
              "People, research, documents, and administration turn founder knowledge into an organized company."}

            {module.module === 4 &&
              "Accounting and economics provide the evidence needed for pricing, budgeting, expansion, and risk decisions."}

            {module.module === 5 &&
              "Acquisition creates customers, service retains them, and retention improves lifetime value and profitability."}

            {module.module === 6 &&
              "Leadership aligns strategy, people, communication, and execution during launches and long-term growth."}
          </p>
        </div>

        <button
          onClick={printSheet}
          className="mt-8 flex items-center gap-2 rounded-full bg-[#C9A75D] px-7 py-3.5 text-sm font-medium text-white print:hidden"
        >
          <Download size={16} />
          Save as PDF
        </button>
      </div>
    </section>
  );
}