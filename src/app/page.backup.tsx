import { ArrowRight, Building2, Handshake, Rocket } from "lucide-react";

const cards = [
  {
    title: "Private Equity",
    headline: "Acquire. Operate. Scale.",
    items: ["Majority Investments", "Growth Equity", "Long-Term Ownership"],
    icon: Building2,
    gradient: "from-[#0B1F3A]/90 to-[#102F57]/80",
    shift: "",
  },
  {
    title: "Venture Capital",
    headline: "Backing Exceptional Founders.",
    items: ["Seed", "Series A", "AI & Software"],
    icon: Rocket,
    gradient: "from-[#1D4ED8]/80 to-[#38BDF8]/60",
    shift: "lg:translate-x-20 lg:translate-y-12",
  },
  {
    title: "Strategic Advisory",
    headline: "Capital Meets Execution.",
    items: ["M&A Strategy", "Technology", "AI Infrastructure"],
    icon: Handshake,
    gradient: "from-[#C8B273]/80 to-[#0B1F3A]/80",
    shift: "lg:translate-x-40 lg:translate-y-24",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#040404] px-4 py-20 text-white sm:px-8 sm:py-28">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[#C8B273]">
            Private Equity / Venture Capital / Strategic Advisory
          </p>

          <h1 className="text-[clamp(3rem,8vw,6.75rem)] font-light leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_0_35px_rgba(200,178,115,.35)]">
            Build Tomorrow, Today.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
            We build, acquire, and scale companies through private equity,
            venture capital, and AI-driven operating infrastructure.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#C8B273]/30 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              Book Consultation
            </a>
          </div>

          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-2xl font-light tracking-tight">PE</p>
              <p className="mt-1 text-sm text-white/40">Capital</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-light tracking-tight">VC</p>
              <p className="mt-1 text-sm text-white/40">Innovation</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-light tracking-tight">AI</p>
              <p className="mt-1 text-sm text-white/40">Execution</p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center lg:col-span-7 lg:[grid-template-areas:'stack']">
          {cards.map(({ title, headline, items, icon: Icon, gradient, shift }) => (
            <div
              key={title}
              className={`relative w-full max-w-[28rem] rounded-3xl bg-gradient-to-br ${gradient} p-7 shadow-[0_30px_100px_rgba(0,0,0,.65),0_0_60px_rgba(200,178,115,.12)] backdrop-blur-2xl transition duration-700 hover:-translate-y-4 lg:[grid-area:stack] ${shift}`}
            >
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
              <div className="relative">
                <div className="mb-10 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                    {title}
                  </p>
                  <Icon className="h-5 w-5 text-white/70" />
                </div>

                <h2 className="max-w-xs text-3xl font-light leading-tight tracking-[-0.04em]">
                  {headline}
                </h2>

                <div className="mt-8 space-y-3 border-t border-[#C8B273]/30 pt-6">
                  {items.map((item) => (
                    <p key={item} className="text-sm text-white/65">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


