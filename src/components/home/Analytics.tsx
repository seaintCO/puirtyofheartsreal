export default function Analytics() {
  const stats = [
    ["$250M", "Portfolio Target"],
    ["7", "Investment Sectors"],
    ["10+", "Operating Capabilities"],
    ["3", "Strategic Markets"],
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-[#0a0c0e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl text-center">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-600">
          PORTFOLIO INTELLIGENCE
        </p>

        <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Building an ecosystem engineered for scale.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
          SEAINT Enterprise operates across private equity, venture capital, strategic advisory, artificial intelligence, creator infrastructure, sports commerce, and digital operating systems.
        </p>

        <div className="mt-16 rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-black/5 bg-[#f6f8fb] p-7 text-left transition hover:border-cyan-400">
                <div className="mb-7 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <p className="bg-gradient-to-r from-[#020617] via-[#00c8ff] to-[#38bdf8] bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
                  {value}
                </p>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-gray-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
