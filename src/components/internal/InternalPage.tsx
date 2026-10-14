"use client";

import SiteHeader from "@/components/home/SiteHeader";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/i18n/LanguageProvider";

type DetailItem = {
  number: string;
  title: string;
  description: string;
  meta?: string;
};

type InternalPageProps = {
  eyebrow: string;
  title: string;
  accent: string;
  introduction: string;
  statement: string;
  details: readonly DetailItem[];
  closingTitle: string;
  closingText: string;
  primaryAction?: string;
  primaryHref?: string;
};

export default function InternalPage({
  eyebrow,
  title,
  accent,
  introduction,
  statement,
  details,
  closingTitle,
  closingText,
}: InternalPageProps) {
  const { language } = useLanguage();
  const actionLabel = language === "en" ? "Set Up Interview" : "Agendar Entrevista";

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-white text-[#0a0c0e]">
      <SiteHeader />

      <section className="relative min-h-[88vh] overflow-hidden px-5 pb-16 pt-28 sm:min-h-[92vh] sm:px-6 sm:pb-20 sm:pt-36 md:px-8 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,200,255,0.13) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute left-[62%] top-[44%] h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.48) 0%, rgba(56,189,248,0.16) 40%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-end gap-10 sm:gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-600 sm:text-xs">
                {eyebrow}
              </p>

              <h1 className="max-w-5xl text-[42px] font-semibold leading-[0.96] tracking-[-0.055em] text-[#050505] min-[380px]:text-[48px] sm:text-7xl sm:leading-[0.92] sm:tracking-[-0.065em] md:text-[92px] lg:text-[112px]">
                {title}
                <span className="internal-headline-shimmer block w-fit font-light">{accent}</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-3">
              <p className="max-w-md text-base font-light leading-7 text-zinc-500 md:text-lg md:leading-8">
                {introduction}
              </p>
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-gradient-to-r from-cyan-400/70 via-black/10 to-transparent sm:mt-20" />

          <div className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
                {language === "en" ? "Our Perspective" : "Nuestra Perspectiva"}
              </p>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-4xl text-[27px] font-light leading-[1.2] tracking-[-0.03em] text-[#111] sm:text-4xl sm:tracking-[-0.035em] md:text-5xl">
                {statement}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-black/[0.06] bg-[#f8fafb] px-5 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-600">
                SEAINT
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-black sm:text-5xl">
                {language === "en" ? "How we operate." : "Cómo operamos."}
              </h2>
            </div>

            <div className="hidden text-right text-[10px] uppercase tracking-[0.24em] text-zinc-400 md:block">
              {language === "en" ? "Build Tomorrow, Today." : "Construye el mañana, hoy."}
            </div>
          </div>

          <div className="border-t border-black/10">
            {details.map((item) => (
              <article
                key={item.number}
                className="group grid gap-6 border-b border-black/10 py-9 transition duration-500 md:grid-cols-12 md:items-start md:py-12"
              >
                <div className="md:col-span-2">
                  <span className="font-mono text-xs text-cyan-600">
                    {item.number}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-2xl font-normal tracking-[-0.035em] text-black transition duration-500 group-hover:translate-x-1 md:text-3xl">
                    {item.title}
                  </h3>

                  {item.meta && (
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">
                      {item.meta}
                    </p>
                  )}
                </div>

                <div className="md:col-span-6">
                  <p className="max-w-2xl text-base font-light leading-7 text-zinc-500 md:text-lg md:leading-8">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-6 md:px-8 md:py-36">
        <div
          className="pointer-events-none absolute bottom-[-220px] right-[-140px] h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.55), transparent 68%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-600">
              {language === "en" ? "Begin a Conversation" : "Inicia una Conversación"}
            </p>

            <h2 className="mt-6 max-w-4xl text-[40px] font-medium leading-[1] tracking-[-0.05em] text-black sm:text-6xl sm:leading-[0.98] sm:tracking-[-0.055em] md:text-7xl">
              {closingTitle}
            </h2>

            <p className="mt-8 max-w-2xl text-base font-light leading-7 text-zinc-500 md:text-lg md:leading-8">
              {closingText}
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <a
              href="https://calendly.com/seaintco/new-meeting"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-14 items-center justify-center rounded-full border border-cyan-400/60 bg-white px-8 text-xs font-medium uppercase tracking-[0.2em] text-cyan-600 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_22px_65px_rgba(34,211,238,0.22)]"
            >
              {actionLabel}
              <span className="ml-4 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
