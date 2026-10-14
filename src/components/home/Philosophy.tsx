export default function Philosophy() {
  return (
    <section className="bg-[#f6f8fb] px-6 py-24 text-[#0a0c0e]">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-600">
          Investment Philosophy
        </p>

        <h2 className="max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl">
          We build, acquire, advise, and scale companies positioned for tomorrow.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {["Build", "Scale", "Compound"].map((item) => (
            <div key={item} className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">{item}</h3>
              <p className="mt-4 text-gray-500">
                Strategic infrastructure for operators, creators, founders, and emerging platforms.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
