"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

const portfolioData = [
  { name: { en: "AI Infrastructure", es: "Infraestructura de IA" }, sector: { en: "01 AI Infrastructure", es: "01 Infraestructura de IA" }, status: { en: "Active", es: "Activa" }, width: "96%", text: { en: "A unified intelligence and operating layer for modern companies.", es: "Una capa unificada de inteligencia y operación para empresas modernas." } },
  { name: { en: "Technology Infrastructure", es: "Infraestructura Tecnológica" }, sector: { en: "02 Technology Infrastructure", es: "02 Infraestructura Tecnológica" }, status: { en: "Active", es: "Activa" }, width: "78%", text: { en: "Reusable technology products and infrastructure built for modern businesses.", es: "Productos tecnológicos e infraestructura reutilizable para empresas modernas." } },
  { name: { en: "Enterprise Software", es: "Software Empresarial" }, sector: { en: "03 Enterprise Software", es: "03 Software Empresarial" }, status: { en: "Active", es: "Activa" }, width: "68%", text: { en: "Software and operating systems built for growing companies.", es: "Software y sistemas operativos creados para empresas en crecimiento." } },
  { name: { en: "Financial Technology", es: "Tecnología Financiera" }, sector: { en: "04 Financial Technology", es: "04 Tecnología Financiera" }, status: { en: "In Development", es: "En Desarrollo" }, width: "55%", text: { en: "Payment and commerce infrastructure for modern businesses.", es: "Infraestructura de pagos y comercio para empresas modernas." } },
  { name: { en: "Creative Technology", es: "Tecnología Creativa" }, sector: { en: "05 Creative Technology", es: "05 Tecnología Creativa" }, status: { en: "In Development", es: "En Desarrollo" }, width: "58%", text: { en: "A creative production platform for brands, campaigns, and digital commerce.", es: "Una plataforma de producción creativa para marcas, campañas y comercio digital." } },
  { name: { en: "Commerce & Experiences", es: "Comercio y Experiencias" }, sector: { en: "06 Commerce & Experiences", es: "06 Comercio y Experiencias" }, status: { en: "Active", es: "Activo" }, width: "48%", text: { en: "Commerce, events, and brand-led experiences across the SEAINT Enterprise portfolio.", es: "Comercio, eventos y experiencias de marca dentro del portafolio de SEAINT Enterprise." } },
  { name: { en: "Operating Companies", es: "Empresas Operativas" }, sector: { en: "07 Business Systems", es: "07 Sistemas Empresariales" }, status: { en: "Active", es: "Activas" }, width: "34%", text: { en: "Focused operating systems and software assets supporting the portfolio.", es: "Sistemas operativos especializados y activos de software que respaldan el portafolio." } },
];

export default function PortfolioPage() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const portfolio = portfolioData.map((company) => ({
    ...company,
    name: company.name[language],
    sector: company.sector[language],
    status: company.status[language],
    text: company.text[language],
  }));
  const item = portfolio[active];
  const t = language === "en" ? {
    back: "Back Home", portfolio: "Portfolio", targeting: "Targeting a", portfolioTarget: "portfolio.",
    summary: "A connected portfolio of companies built, backed, and operated by SEAINT Enterprise.",
    headingStart: "Built for", headingAccent: "what’s next.", instruction: "Select a portfolio company to view details.", active: "Active Selection", status: "Status",
    founders: "Founders", founderHeadline: "Building what’s next?", founderBody: "We partner with founders creating companies with long-term potential.", interview: "Set Up Interview",
  } : {
    back: "Volver al Inicio", portfolio: "Portafolio", targeting: "Meta del portafolio", portfolioTarget: "",
    summary: "Un portafolio conectado de empresas creadas, respaldadas y operadas por SEAINT Enterprise.",
    headingStart: "Creado para", headingAccent: "lo que sigue.", instruction: "Selecciona una empresa del portafolio para ver los detalles.", active: "Selección Activa", status: "Estado",
    founders: "Fundadores", founderHeadline: "¿Construyendo lo que sigue?", founderBody: "Nos asociamos con fundadores que crean empresas con potencial a largo plazo.", interview: "Agendar Entrevista",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] p-6 text-[#0a0c0e] md:p-10">
      <style>{`
        @keyframes glowPulse{
  0%,100%{
    filter:drop-shadow(0 0 10px rgba(34,211,238,.18));
  }
  50%{
    filter:drop-shadow(0 0 26px rgba(34,211,238,.45));
  }
}
@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: 0% 0; }
}

.headline-shimmer {
  background: linear-gradient(90deg, #020617 0%, #020617 35%, #22d3ee 50%, #38bdf8 60%, #020617 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3.5s ease-in-out infinite;
}

@keyframes growIn {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .glow-bar {
          height: 46px;
          background: linear-gradient(90deg, rgba(0, 180, 255, 0.02) 0%, #00c8ff 100%);
          border-radius: 99px;
          position: relative;
          transform-origin: left;
          animation: growIn 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
          opacity: 0;
        }
        .glow-bar::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 70%;
          height: 120%;
          background: inherit;
          transform: translateY(-50%);
          filter: blur(22px);
          opacity: 0.28;
          border-radius: 99px;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,145,255,0.10)_1px,transparent_1px),radial-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:32px_32px,16px_16px] [background-position:0_0,8px_8px]" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 opacity-[0.14] blur-[160px]" />

      <header className="relative z-10 mb-12 flex items-start justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black">
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <div className="flex items-start gap-3">
          <LanguageToggle />
          <div className="text-right">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-400">
              {t.portfolio}
            </div>
            <div className="font-mono text-sm">SEAINT Enterprise</div>
          </div>
        </div>
      </header>

      <section className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-12 rounded-3xl border border-black/5 bg-white/70 p-8 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-6 flex items-end justify-between">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-400">
                {t.targeting}
              </div>
              <div className="text-3xl font-light text-cyan-500">
                $250M<span className="ml-1 text-lg text-gray-400">{t.portfolioTarget}</span>
              </div>
            </div>

            <div className="mb-6 h-px w-full bg-black/5" />

            <p className="text-lg leading-relaxed text-gray-500">
              {t.summary}
            </p>
          </div>

          <h1 className="headline-shimmer mb-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[76px]">
            {t.headingStart} <br />
            <span className="font-bold">{t.headingAccent}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://calendly.com/seaintco/new-meeting"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-cyan-400 px-8 py-4 text-sm font-medium text-cyan-600 transition hover:bg-cyan-400 hover:text-white"
            >
              {t.interview}
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="text-sm text-gray-400">
              {t.instruction}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col justify-center lg:col-span-7">
          <div className="absolute bottom-0 left-[20%] top-0 hidden w-px bg-black/5 md:block" />

          <div className="space-y-7">
            {portfolio.map((company, index) => (
              <button
                key={company.name}
                onClick={() => setActive(index)}
                className={`group flex w-full items-center transition ${
                  active === index ? "opacity-100" : "opacity-35 hover:opacity-80"
                }`}
              >
                <div className="w-[20%] pr-8 text-right">
                  <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
                    active === index ? "text-black" : "text-gray-400"
                  }`}>
                    {company.sector}
                  </span>
                </div>

                <div className="relative flex h-12 flex-1 items-center">
                  <div
                    className="glow-bar"
                    style={{
                      width: company.width,
                      animationDelay: `${0.1 + index * 0.08}s`,
                    }}
                  />

                  {active === index && (
                    <>

                      <div className="ml-4 hidden max-w-[220px] text-left text-[11px] font-mono text-cyan-600 md:block">
                        {company.text}
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <div className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-600">
              {t.active} / {item.sector}
            </div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-light">{item.name}</h2>
                <p className="mt-2 max-w-xl text-gray-500">{item.text}</p>
              </div>
              <div className="font-mono text-sm uppercase tracking-[0.14em] text-cyan-500">
                {t.status}: {item.status}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-16 rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-600">
              {t.founders}
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
              {t.founderHeadline}
            </h2>
            <p className="mt-3 max-w-xl text-gray-500">
              {t.founderBody}
            </p>
          </div>

          <a
            href="https://calendly.com/seaintco/new-meeting"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-cyan-400 px-8 py-4 text-sm font-medium text-cyan-600 transition hover:bg-cyan-400 hover:text-white"
          >
            {t.interview}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}




