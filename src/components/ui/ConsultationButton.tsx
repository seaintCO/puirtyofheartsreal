"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";

export default function ConsultationButton() {
  return (
    <a
      href="https://calendly.com/seaintco/new-meeting"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block group w-full sm:w-auto"
    >
      <button
        className="relative z-10 overflow-hidden rounded-xl border border-white/20 bg-neutral-900/60 px-6 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 active:scale-[0.98]"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
        }}
        onMouseEnter={(e) => e.currentTarget.style.setProperty("--o", "1")}
        onMouseLeave={(e) => e.currentTarget.style.setProperty("--o", "0")}
        style={
          {
            "--x": "50%",
            "--y": "50%",
            "--o": "0",
          } as React.CSSProperties
        }
      >
        <span className="relative z-10 inline-flex items-center gap-2 font-medium">
          Set Up Interview
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>

        <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transition-all duration-500 group-hover:left-0 group-hover:right-0" />

        <span
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: "var(--o)",
            background:
              "radial-gradient(220px circle at var(--x) var(--y), rgba(255,255,255,.12), transparent 60%)",
            transition: "opacity .25s",
          }}
        />
      </button>

      <span
        className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-44 -translate-x-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(255,255,255,.55), rgba(255,255,255,.28) 35%, transparent 70%)",
        }}
      />
    </a>
  );
}




