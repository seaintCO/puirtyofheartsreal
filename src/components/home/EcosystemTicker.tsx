"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function EcosystemTicker() {
  const { language } = useLanguage();
  const companies = language === "en"
    ? [
        "AI INFRASTRUCTURE",
        "TECHNOLOGY INFRASTRUCTURE",
        "ENTERPRISE SOFTWARE",
        "FINANCIAL TECHNOLOGY",
        "CREATIVE TECHNOLOGY",
        "COMMERCE & EXPERIENCES",
        "BUSINESS SYSTEMS",
      ]
    : [
        "INFRAESTRUCTURA DE IA",
        "INFRAESTRUCTURA TECNOLÓGICA",
        "SOFTWARE EMPRESARIAL",
        "TECNOLOGÍA FINANCIERA",
        "TECNOLOGÍA CREATIVA",
        "COMERCIO Y EXPERIENCIAS",
        "SISTEMAS EMPRESARIALES",
      ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14">
      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ecosystem-track {
          animation: ticker 35s linear infinite;
        }

        .ecosystem-track:hover {
          animation-play-state: paused;
        }

        .ecosystem-name {
          background: linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.2) 0%,
            rgba(56, 189, 248, 0.72) 45%,
            rgba(255, 255, 255, 0.95) 50%,
            rgba(56, 189, 248, 0.72) 55%,
            rgba(34, 211, 238, 0.2) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.14));
        }

        .ecosystem-name:hover {
          filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.45));
        }
      `}</style>

      <div className="mb-10 text-center">
        <p className="text-[10px] font-light uppercase tracking-[0.35em] text-gray-400">
          {language === "en" ? "SEAINT ECOSYSTEM" : "ECOSISTEMA SEAINT"}
        </p>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="ecosystem-track flex w-max items-center gap-16 py-5 sm:gap-20">
          {[...companies, ...companies].map((company, index) => (
            <span
              key={`${company}-${index}`}
              className="ecosystem-name shrink-0 whitespace-nowrap text-[10px] font-light uppercase tracking-[0.28em] transition duration-500 sm:text-xs"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
