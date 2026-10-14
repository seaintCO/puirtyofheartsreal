export default function EcosystemTicker() {
  const companies = [
    "ALMA",
    "ALMA VE",
    "ALTA TECH",
    "AS GLOBAL",
    "AGSC TECH INC",
    "PURITY OS",
    "LEADLY",
    "SALESOS",
    "CR OS",
    "FOUNDERS OS",
    "MERCADO OS",
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14">
      <div className="mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
          SEAINT ECOSYSTEM
        </p>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="ticker-track flex w-max items-center gap-5 py-3">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company}-${i}`}
              className="group relative shrink-0 overflow-hidden rounded-full border border-cyan-300/50 bg-white/55 px-6 py-3 shadow-[0_10px_30px_rgba(14,165,233,0.10),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(14,165,233,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white/75 hover:shadow-[0_14px_36px_rgba(14,165,233,0.16),inset_0_1px_0_rgba(255,255,255,1)]"
            >
              <div className="pointer-events-none absolute inset-x-4 top-1 h-3 rounded-full bg-white/80 blur-md" />
              <span className="relative whitespace-nowrap text-sm font-semibold tracking-tight text-cyan-600 sm:text-base">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
