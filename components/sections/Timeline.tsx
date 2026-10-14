const steps = [
  ["2026", " Founded"],
  ["Portfolio", "Launch of ALMA"],
  ["Infrastructure", "Launch of SEAINT Intelligence"],
  ["Creative AI", "Launch of Nocturai"],
  ["Faith & Community", "Expansion of Purity of Hearts"],
  ["Ongoing", "Future Acquisitions"]
];

export default function Timeline() {
  return (
    <section className="overflow-hidden bg-white py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-4xl font-medium tracking-tight sm:text-5xl">Evolution</h2>

        <div className="flex gap-10 overflow-x-auto pb-6">
          {steps.map(([label, title]) => (
            <div key={title} className="relative min-w-64 pt-6">
              <div className="absolute left-0 top-0 h-px w-full bg-neutral-200">
                <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C8B273]" />
              </div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">{label}</p>
              <h3 className="text-xl font-medium tracking-tight">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



