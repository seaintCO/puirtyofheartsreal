"use client";

import LanguageToggle from "@/components/ui/LanguageToggle";

type LegalSection = {
  title: string;
  body: string;
};

export default function LegalPage({
  label,
  title,
  updated,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-[#0a0c0e]">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-cyan-600">{label}</p>
            <h1 className="text-5xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-4 text-sm text-gray-500">{updated}</p>
          </div>
          <LanguageToggle className="shrink-0" />
        </div>

        <div className="mt-12 space-y-10 text-gray-600">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0c0e]">{section.title}</h2>
              <p className="mt-3 leading-7">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

