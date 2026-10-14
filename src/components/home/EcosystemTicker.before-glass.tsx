export default function EcosystemTicker() {
  const companies = [
    "SEAINT ENTERPRISE",
    "SEAINT INTELLIGENCE",
    "ALMA",
    "ALMA VE",
    "FOUNDERS CLUB",
    "FOUNDERS INFLUENCE",
    "ALTA SPORTS ECOM",
    "ALTA GLOBAL",
    "ALTA EVENTS",
    "NOCTRAI",
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-0 pb-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
          SEAINT ECOSYSTEM
        </p>
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="ticker-track flex w-max gap-16">
          {[...companies, ...companies].map((company, i) => (
            <span key={i} className="whitespace-nowrap text-lg font-semibold tracking-tight text-cyan-600">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

