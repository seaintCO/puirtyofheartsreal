const companies = [
  ["ALMA", "AI Operating System", "Helping individuals and businesses work smarter through intelligent digital infrastructure."],
  ["SEAINT Intelligence", "Software & Automation", "AI agents, websites, business systems, automations, and custom software."],
  ["Nocturai", "Creative AI Platform", "Image generation, video generation, marketing assets, and digital content infrastructure."],
  ["Purity of Hearts", "Faith-Based Education", "Courses, community, and premium digital experiences rooted in faith."],
  ["Alta Sports", "Sports Technology", "Athlete development, sports systems, and operational infrastructure."],
  ["Alta Global", "International Growth", "Strategic growth initiatives, global business development, and market expansion."],
  ["Founders Club", "Private Founder Community", "A private network for entrepreneurs building category-defining companies."],
  ["Chosen Of God", "Faith Apparel & Media", "Faith-driven apparel, media, and community initiatives."],
  ["Future Acquisitions", "Coming Soon", "The next generation of companies begins here."]
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="border-t border-black/5 bg-white py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#C8B273]">Selected Portfolio</p>
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            A growing ecosystem of companies built for long-term value.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map(([name, category, description]) => (
            <div key={name} className="group rounded-[28px] border border-black/5 bg-[#F7F7F5] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
              <div className="mb-16 text-xl font-semibold tracking-tight">{name}</div>
              <p className="mb-3 text-xl font-medium tracking-tight">{category}</p>
              <p className="text-sm font-light leading-6 text-neutral-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



