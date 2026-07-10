"use client";

import { useState } from "react";
import { Calendar, Plus, Save } from "lucide-react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Personal Journal
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Journal</h1>
          <p className="mt-3 text-sm text-white/45">
            Save reflections, prayers, ideas, and coaching notes.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-6 py-3 text-sm font-medium text-white">
          <Plus size={17} />
          New Entry
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
            Recent Entries
          </p>

          {["Today's Reflection", "Leadership Notes", "Prayer Entry"].map(
            (item, index) => (
              <button
                key={item}
                className={`mb-3 w-full rounded-2xl p-4 text-left ${
                  index === 0
                    ? "bg-[#C9A75D] text-[#111]"
                    : "bg-white/[0.04] text-white/60"
                }`}
              >
                <p className="text-sm font-medium">{item}</p>
                <p className="mt-2 text-xs opacity-50">July 9, 2026</p>
              </button>
            ),
          )}
        </aside>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Today&apos;s Reflection</h2>
              <p className="mt-2 flex items-center gap-2 text-xs text-white/35">
                <Calendar size={14} />
                July 9, 2026
              </p>
            </div>
          </div>

          <textarea
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
            placeholder="What is God teaching you today?"
            className="min-h-[420px] w-full resize-none rounded-[1.5rem] border border-white/10 bg-[#181818] p-6 text-sm leading-relaxed text-white/75 outline-none focus:border-[#C9A75D]"
          />

          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#111]">
            <Save size={16} />
            Save Entry
          </button>
        </div>
      </div>
    </section>
  );
}
