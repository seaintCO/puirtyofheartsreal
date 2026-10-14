"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-white px-6 pb-8 text-[#0a0c0e]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(0,145,255,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-8 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-600">
            SEAINT ENTERPRISE
          </p>

          <h1 className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-[#020617] via-[#00c8ff] to-[#38bdf8] bg-clip-text text-transparent">
              Build Tomorrow,
            </span>
            <br />
            Today.
          </h1>

          <p className="mt-8 max-w-xl font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Venture Capital / Private Equity / Strategic Advisory
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/portfolio" className="rounded-full bg-cyan-400 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-cyan-500">
              View Portfolio
            </Link>

            <Link href="/contact" className="rounded-full border border-cyan-400 bg-white/80 px-7 py-4 text-center text-sm font-semibold text-cyan-600 shadow-sm transition hover:bg-[#f6f8fb]">
              Book Consultation
            </Link>
          </div>
        </div>

        <div className="relative hidden h-[620px] lg:block">
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 bg-[radial-gradient(circle,rgba(34,211,238,.16),transparent_65%)] blur-[1px]" />
          <div className="absolute inset-16 rounded-full border border-cyan-400/30" />
          <div className="absolute inset-32 rounded-full border border-cyan-400/20" />

          {["PRIVATE_EQUITY", "VENTURE_CAPITAL", "STRATEGIC_ADVISORY"].map((label, i) => (
            <div
              key={label}
              className={[
                "absolute rounded-sm bg-cyan-400 px-2 py-1 font-mono text-[10px] text-white shadow-[0_0_20px_rgba(34,211,238,.45)]",
                i === 0 ? "right-8 top-52" : "",
                i === 1 ? "right-28 bottom-36" : "",
                i === 2 ? "right-0 bottom-56" : "",
              ].join(" ")}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
