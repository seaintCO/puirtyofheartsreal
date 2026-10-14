"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

const primaryLinks = [
  { label: { en: "About", es: "Nosotros" }, href: "/about" },
  { label: { en: "Approach", es: "Enfoque" }, href: "/investment-approach" },
  { label: { en: "Owners", es: "Propietarios" }, href: "/business-owners" },
  { label: { en: "Founders", es: "Fundadores" }, href: "/founders" },
  { label: { en: "Focus", es: "Áreas" }, href: "/focus-areas" },
  { label: { en: "Portfolio", es: "Portafolio" }, href: "/portfolio" },
  { label: { en: "Programs", es: "Programas" }, href: "/programs" },
  { label: { en: "Team", es: "Equipo" }, href: "/team" },
];

const mobileLinks = [
  { number: "01", label: { en: "Home", es: "Inicio" }, href: "/" },
  { number: "02", label: { en: "About SEAINT Enterprise", es: "Acerca de SEAINT Enterprise" }, href: "/about" },
  {
    number: "03",
    label: { en: "Investment Approach", es: "Enfoque de Inversión" },
    href: "/investment-approach",
  },
  {
    number: "04",
    label: { en: "For Business Owners", es: "Para Propietarios" },
    href: "/business-owners",
  },
  { number: "05", label: { en: "For Founders", es: "Para Fundadores" }, href: "/founders" },
  { number: "06", label: { en: "Operating Model", es: "Modelo Operativo" }, href: "/operating-model" },
  { number: "07", label: { en: "Focus Areas", es: "Áreas de Enfoque" }, href: "/focus-areas" },
  { number: "08", label: { en: "Portfolio", es: "Portafolio" }, href: "/portfolio" },
  { number: "09", label: { en: "Programs", es: "Programas" }, href: "/programs" },
  { number: "10", label: { en: "Leadership", es: "Liderazgo" }, href: "/team" },
  { number: "11", label: { en: "Contact", es: "Contacto" }, href: "/contact" },
];

function ContactButton({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  const { language } = useLanguage();
  const text = language === "en" ? "Set Up Interview" : "Agendar Entrevista";

  return (
    <Link
      href="https://calendly.com/seaintco/new-meeting"
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={[
        "contact-glow-btn group relative inline-flex items-center justify-center overflow-hidden rounded-full font-normal text-cyan-600 transition",
        mobile ? "h-12 w-full text-[11px]" : "h-[46px] px-5 text-xs",
      ].join(" ")}
    >
      <div className="contact-loader absolute inset-0 z-[1]" />

      <span className="relative z-[2] flex gap-[0.02rem] tracking-[0.18em]">
        {text.split("").map((letter, index) =>
          letter === " " ? (
            <span key={index} className="inline-block w-2" />
          ) : (
            <span
              key={index}
              className="contact-letter inline-block"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              {letter}
            </span>
          )
        )}
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style jsx global>{`
        .seaint-header-shell {
          background: rgba(255, 255, 255, 0.76);
          border: 1px solid rgba(0, 0, 0, 0.055);
          box-shadow:
            0 18px 60px rgba(0, 0, 0, 0.055),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .seaint-nav-link {
          position: relative;
        }

        .seaint-nav-link::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: -7px;
          left: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 200, 255, 0.9),
            transparent
          );
          opacity: 0;
          transform: scaleX(0.4);
          transition:
            opacity 400ms ease,
            transform 400ms ease;
        }

        .seaint-nav-link:hover::after,
        .seaint-nav-link-active::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .contact-glow-btn {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(34, 211, 238, 0.35);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }

        .contact-glow-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            0 0 0 2px rgba(0, 200, 255, 0.18),
            0 0 34px rgba(0, 200, 255, 0.2);
        }

        .contact-loader {
          background-color: transparent;
          mask: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 6px,
            black 7px,
            black 8px
          );
          -webkit-mask: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 6px,
            black 7px,
            black 8px
          );
        }

        .contact-loader::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 50% 50%, #00c8ff 0%, transparent 50%),
            radial-gradient(circle at 45% 45%, #38bdf8 0%, transparent 45%),
            radial-gradient(circle at 55% 55%, #22d3ee 0%, transparent 45%),
            radial-gradient(circle at 45% 55%, #67e8f9 0%, transparent 45%),
            radial-gradient(circle at 55% 45%, #0891b2 0%, transparent 45%);
          mask: radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            transparent 10%,
            black 25%
          );
          -webkit-mask: radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            transparent 10%,
            black 25%
          );
          animation:
            contact-transform 2s infinite alternate,
            contact-opacity 4s infinite;
          animation-timing-function: cubic-bezier(0.6, 0.8, 0.5, 1);
          filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.65));
        }

        .contact-letter {
          opacity: 0;
          animation: contact-letter 4s infinite linear;
        }

        .mobile-menu-line {
          transform-origin: center;
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 250ms ease;
        }

        .mobile-menu-open .mobile-menu-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-open .mobile-menu-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-open .mobile-menu-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        @keyframes contact-transform {
          0% {
            transform: translateX(-55%);
          }

          100% {
            transform: translateX(55%);
          }
        }

        @keyframes contact-opacity {
          0%,
          100% {
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          65% {
            opacity: 0;
          }
        }

        @keyframes contact-letter {
          0% {
            opacity: 0;
          }

          5% {
            opacity: 1;
            text-shadow:
              0 0 8px #00c8ff,
              0 0 12px #38bdf8;
            transform: scale(1.1) translateY(-2px);
          }

          20% {
            opacity: 0.35;
          }

          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-loader::before,
          .contact-letter {
            animation: none;
          }
        }
      `}</style>

      <header className="fixed left-0 right-0 top-0 z-[100] px-4 py-4 sm:px-5 sm:py-5 md:px-8">
        <div className="seaint-header-shell mx-auto flex h-[62px] max-w-7xl items-center justify-between rounded-full px-4 sm:px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={language === "en" ? "SEAINT Enterprise homepage" : "Página de inicio de SEAINT Enterprise"}
            className="flex shrink-0 items-center"
          >
            <span className="text-[13px] font-semibold tracking-[-0.03em] text-black sm:text-sm">
              SEAINT
            </span>

            <span className="ml-2 hidden text-[8px] font-medium uppercase tracking-[0.23em] text-zinc-400 sm:inline">
              Enterprise
            </span>
          </Link>

          <nav
            aria-label={language === "en" ? "Primary navigation" : "Navegación principal"}
            className="mx-5 hidden min-w-0 items-center justify-center gap-4 xl:flex 2xl:gap-6"
          >
            {primaryLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "seaint-nav-link whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.16em] transition duration-300",
                    active
                      ? "seaint-nav-link-active text-cyan-600"
                      : "text-zinc-500 hover:text-black",
                  ].join(" ")}
                >
                  {link.label[language]}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <LanguageToggle />
            <ContactButton />
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/35 bg-white/80 shadow-sm backdrop-blur transition duration-300 hover:border-cyan-400/70 xl:hidden",
              open ? "mobile-menu-open" : "",
            ].join(" ")}
            aria-label={
              open
                ? language === "en" ? "Close menu" : "Cerrar menú"
                : language === "en" ? "Open menu" : "Abrir menú"
            }
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[6px]">
              <span className="mobile-menu-line h-[2px] w-[19px] rounded-full bg-cyan-600" />
              <span className="mobile-menu-line h-[2px] w-[19px] rounded-full bg-cyan-600" />
              <span className="mobile-menu-line h-[2px] w-[19px] rounded-full bg-cyan-600" />
            </span>
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-[90] bg-white/45 backdrop-blur-[8px] transition duration-500 xl:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={[
          "fixed bottom-4 right-4 top-[94px] z-[95] w-[calc(100%-2rem)] max-w-[430px] overflow-hidden rounded-[30px] border border-cyan-400/25 bg-white/95 shadow-[0_28px_100px_rgba(0,0,0,0.16)] backdrop-blur-[28px] transition duration-500 xl:hidden",
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-[110%] opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className="pointer-events-none absolute right-[-90px] top-[-80px] h-[280px] w-[280px] rounded-full opacity-30 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.6), transparent 68%)",
          }}
        />

        <div className="relative flex h-full flex-col p-5 sm:p-6">
          <div className="border-b border-black/[0.07] pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-cyan-600">
              {language === "en" ? "Navigation" : "Navegación"}
            </p>

            <p className="mt-3 max-w-[280px] text-sm font-light leading-6 text-zinc-500">
              {language === "en"
                ? "Explore SEAINT Enterprise, our investment approach and the companies within our ecosystem."
                : "Conoce SEAINT Enterprise, nuestro enfoque de inversión y las empresas que forman parte de nuestro ecosistema."}
            </p>

            <LanguageToggle className="mt-4" />
          </div>

          <nav
            aria-label={language === "en" ? "Mobile navigation" : "Navegación móvil"}
            className="min-h-0 flex-1 overflow-y-auto py-2"
          >
            {mobileLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group grid grid-cols-[34px_1fr_auto] items-center border-b border-black/[0.065] py-[13px]"
                >
                  <span className="font-mono text-[9px] text-cyan-600/75">
                    {link.number}
                  </span>

                  <span
                    className={[
                      "text-[15px] font-normal tracking-[-0.02em] transition duration-300",
                      active
                        ? "text-cyan-600"
                        : "text-black group-hover:translate-x-1 group-hover:text-cyan-600",
                    ].join(" ")}
                  >
                    {link.label[language]}
                  </span>

                  <span className="text-sm text-cyan-600 transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4">
            <ContactButton mobile onClick={() => setOpen(false)} />

            <p className="mt-4 text-center text-[8px] font-medium uppercase tracking-[0.22em] text-zinc-400">
              {language === "en" ? "Build Tomorrow, Today." : "Construye el mañana, hoy."}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
