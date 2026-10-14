"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function EnterpriseOrbit() {
  const { language } = useLanguage();
  const items = [
    {
      title: language === "en" ? "Private Equity" : "Capital Privado",
      subtitle: language === "en" ? "Build, acquire, scale" : "Crear, adquirir, escalar",
      icon: "M4 19h16M7 16V10M12 16V6M17 16v-3",
      position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    {
      title: language === "en" ? "Venture Capital" : "Capital de Riesgo",
      subtitle: language === "en" ? "Emerging technology bets" : "Apuestas por tecnología emergente",
      icon: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19",
      position: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    },
    {
      title: language === "en" ? "Strategic Advisory" : "Asesoría Estratégica",
      subtitle: language === "en" ? "Operator-led growth systems" : "Sistemas de crecimiento dirigidos por operadores",
      icon: "M8 10h8M8 14h5M5 19l1.5-3H18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6A2 2 0 0 0 4 7v7a2 2 0 0 0 2 2h.5L5 19Z",
      position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    },
    {
      title: language === "en" ? "Platform Operations" : "Operaciones de Plataforma",
      subtitle: language === "en" ? "Infrastructure for execution" : "Infraestructura para ejecutar",
      icon: "M7 18a4 4 0 1 1 .8-7.92A5 5 0 0 1 18 11a3 3 0 0 1 0 6H7Z",
      position: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-28 text-[#0a0c0e] sm:px-6">
      <style jsx global>{`
        @property --orbit-angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        @keyframes orbit-spin {
          from {
            --orbit-angle: 0deg;
          }
          to {
            --orbit-angle: 360deg;
          }
        }

        @keyframes logo-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.72;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        .animate-orbit-track {
          --orbit-angle: 0deg;
          animation: orbit-spin 28s linear infinite;
          transform: rotate(var(--orbit-angle));
          transform-origin: center;
          will-change: transform;
        }

        .animate-orbit-card {
          transform: rotate(calc(0deg - var(--orbit-angle)));
          transform-origin: center;
          will-change: transform;
        }

        .animate-logo-pulse {
          animation: logo-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,145,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="absolute left-1/2 top-16 z-20 max-w-3xl -translate-x-1/2 px-6 text-center">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-600">
          SEAINT ENTERPRISE
        </p>

        <h2 className="text-4xl font-semibold tracking-tight text-[#0a0c0e] md:text-5xl">
          {language === "en" ? "Connected operating pillars." : "Pilares operativos conectados."}
        </h2>

        <p className="mt-4 text-base leading-7 text-gray-500 md:text-lg">
          {language === "en"
            ? "A corporate ecosystem built across capital, strategy, technology, and execution."
            : "Un ecosistema empresarial construido sobre capital, estrategia, tecnología y ejecución."}
        </p>
      </div>

      <div className="relative mt-40 flex h-[800px] w-[800px] scale-[0.45] items-center justify-center transition-transform duration-700 ease-out sm:scale-[0.65] md:scale-75 lg:scale-100">
        <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-white/80 bg-[#eef2f6] shadow-[0_25px_60px_rgba(15,23,42,0.08),inset_8px_8px_18px_rgba(255,255,255,0.95),inset_-10px_-10px_20px_rgba(148,163,184,0.12)]">
          <div className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-white/40 blur-xl" />

          <div className="animate-logo-pulse relative flex h-[112px] w-[112px] items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-white to-[#f6f8fb] shadow-[inset_0_2px_10px_rgba(255,255,255,0.95),0_10px_24px_rgba(15,23,42,0.04)]">
            <div className="relative h-[58px] w-[58px]">
              <div className="absolute inset-0 rounded-full border border-cyan-500/40" />
              <div className="absolute inset-[7px] rotate-45 rounded-full border border-cyan-400/30" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 shadow-[0_0_0_6px_rgba(34,211,238,0.12)]" />
              <div className="absolute left-1/2 top-[4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400" />
              <div className="absolute bottom-[8px] right-[6px] h-2 w-2 rounded-full bg-cyan-300" />
              <div className="absolute bottom-[10px] left-[7px] h-1.5 w-1.5 rounded-full bg-cyan-200" />
            </div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-cyan-600">
              SEAINT
            </span>
          </div>
        </div>

        <div className="animate-orbit-track absolute inset-0 rounded-full border border-cyan-400/20">
          {items.map((item) => (
            <div
              key={item.title}
              className={`absolute flex h-24 w-64 items-center justify-center ${item.position}`}
            >
              <div className="animate-orbit-card w-full">
                <div className="group cursor-default rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_20px_40px_rgba(34,211,238,0.14)]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-[#f6f8fb] transition-transform group-hover:scale-110">
                      <svg
                        className="h-5 w-5 text-cyan-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={item.icon}></path>
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-[#0a0c0e]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-[180px] rounded-full border border-cyan-400/10" />
        <div className="pointer-events-none absolute inset-[280px] rounded-full border border-cyan-400/10" />
      </div>
    </section>
  );
}
