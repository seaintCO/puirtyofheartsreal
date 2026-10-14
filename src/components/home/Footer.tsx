"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { language } = useLanguage();
  const t = language === "en" ? {
    description: "Private equity, venture capital, and strategic advisory for companies building tomorrow.",
    available: "Investment Opportunities",
    fundingTitle: "Submit Your Company",
    opportunities: "For founders and business owners",
    support: "Investment and partnership opportunities",
    strategy: "Confidential initial review",
    bookLabel: "Advisory Services",
    chooseTime: "Book an Advisory Consultation",
    schedule: "For strategic advisory services, schedule directly with our team through Calendly.",
    book: "Set Up Interview",
    company: "Company",
    portfolio: "Portfolio",
    needFunding: "Set Up Interview",
    focus: "Focus",
    privateEquity: "Private Equity",
    ventureCapital: "Venture Capital",
    advisory: "Strategic Advisory",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    contactQuestion: "Questions about investment, partnerships, or advisory services?",
    email: "Email our team",
    rights: "All rights reserved.",
    top: "Back to top ↑",
  } : {
    description: "Capital privado, capital de riesgo y asesoría estratégica para las empresas que construyen el mañana.",
    available: "Oportunidades de Inversión",
    fundingTitle: "Presenta Tu Empresa",
    opportunities: "Para fundadores y propietarios de empresas",
    support: "Oportunidades de inversión y alianzas",
    strategy: "Revisión inicial confidencial",
    bookLabel: "Servicios de Asesoría",
    chooseTime: "Agenda una Consulta de Asesoría",
    schedule: "Para servicios de asesoría estratégica, agenda directamente con nuestro equipo a través de Calendly.",
    book: "Agendar Entrevista",
    company: "Empresa",
    portfolio: "Portafolio",
    needFunding: "Agendar Entrevista",
    focus: "Enfoque",
    privateEquity: "Capital Privado",
    ventureCapital: "Capital de Riesgo",
    advisory: "Asesoría Estratégica",
    legal: "Legal",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    contact: "Contacto",
    contactQuestion: "¿Tienes preguntas sobre capital, alianzas o servicios de asesoría?",
    email: "Escribe a nuestro equipo",
    rights: "Todos los derechos reservados.",
    top: "Volver arriba ↑",
  };

  return (
    <footer className="w-full bg-white px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          <div className="border-b border-black/5 pb-12">
            <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0c0e]">
              SEAINT Enterprise
            </h3>

            <p className="max-w-3xl text-gray-500">
              {t.description}
            </p>

            <div
              id="contact"
              className="mt-6 rounded-2xl border border-cyan-400/30 bg-[#f6f8fb] p-5 sm:p-6 md:p-8"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-600 ring-1 ring-cyan-400/30">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                    {t.available}
                  </div>

                  <h4 className="text-xl font-medium tracking-tight text-[#0a0c0e]">
                    {t.fundingTitle}
                  </h4>

                  <ul className="space-y-3 text-sm text-gray-500">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-cyan-500">✓</span>
                      <span>{t.opportunities}</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-cyan-500">✓</span>
                      <span>{t.support}</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-cyan-500">✓</span>
                      <span>{t.strategy}</span>
                    </li>
                  </ul>

                  <a
                    href="https://calendly.com/seaintco/new-meeting"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm text-cyan-600 transition hover:text-[#00c8ff]"
                  >
                    {t.book} →
                  </a>
                </div>

                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm lg:col-span-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-7 w-7"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 10h18" />
                      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                    </svg>
                  </div>

                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-600">
                    {t.bookLabel}
                  </p>

                  <h4 className="mt-3 text-2xl font-semibold tracking-tight text-[#0a0c0e]">
                    {t.chooseTime}
                  </h4>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                    {t.schedule}
                  </p>

                  <a
                    href="https://calendly.com/seaintco/new-meeting"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-500"
                  >
                    {t.book}
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {t.company}
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/portfolio" className="hover:text-cyan-600">
                    {t.portfolio}
                  </Link>
                </li>

                <li>
                  <a href="https://calendly.com/seaintco/new-meeting" target="_blank" rel="noreferrer" className="hover:text-cyan-600">
                    {t.book}
                  </a>
                </li>

                <li>
                  <a href="https://calendly.com/seaintco/new-meeting" target="_blank" rel="noreferrer" className="hover:text-cyan-600">
                    {t.needFunding}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {t.focus}
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li>{t.privateEquity}</li>
                <li>{t.ventureCapital}</li>
                <li>{t.advisory}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {t.legal}
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/privacy" className="hover:text-cyan-600">
                    {t.privacy}
                  </Link>
                </li>

                <li>
                  <Link href="/terms" className="hover:text-cyan-600">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {t.contact}
              </h4>

              <p className="mt-3 text-sm text-gray-500">
                {t.contactQuestion}
              </p>

              <a
                href="mailto:support@seaintenterprise.com"
                className="mt-3 inline-flex text-sm text-cyan-600 hover:text-[#00c8ff]"
              >
                {t.email}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/5 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center">
            <p>© 2026 SEAINT Enterprise. {t.rights}</p>

            <a href="#top" className="hover:text-cyan-600">
              {t.top}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
