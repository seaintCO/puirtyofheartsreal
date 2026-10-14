const model = [
  ["Private Equity", "Owning and operating companies with a long-term value creation mindset."],
  ["Venture Capital", "Backing early-stage opportunities connected to technology, media, and digital infrastructure."],
  ["Company Building", "Creating ventures from zero with brand, software, systems, and go-to-market execution."],
  ["Strategic Acquisitions", "Identifying businesses that can be improved through technology and operational discipline."],
  ["Portfolio Operations", "Supporting each company with shared infrastructure, systems, automation, and strategy."],
  ["Technology Infrastructure", "Building software, AI agents, internal tools, and scalable systems for the portfolio."],
  ["Founder Advisory", "Helping operators clarify vision, structure offers, build systems, and scale intelligently."],
  ["AI Transformation", "Using artificial intelligence to increase speed, reduce manual work, and improve execution."]
];

export default function PrivateEquityModel() {
  return (
    <section id="model" className="bg-[#111111] py-24 text-white lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#C8B273]">How SEAINT Builds Value</p>
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Private equity discipline. Venture speed. Operator-first execution.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {model.map(([title, desc]) => (
            <div key={title} className="bg-[#111111] p-8 transition-colors hover:bg-[#171717]">
              <h3 className="mb-4 text-lg font-medium tracking-tight">{title}</h3>
              <p className="text-sm font-light leading-6 text-neutral-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



