"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-cyan-400/35 bg-white/80 p-1 shadow-sm backdrop-blur ${className}`}
      role="group"
      aria-label={language === "en" ? "Select language" : "Seleccionar idioma"}
    >
      {(["en", "es"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          className={`rounded-full px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] transition duration-300 ${
            language === option
              ? "bg-cyan-400 text-white"
              : "text-zinc-500 hover:text-cyan-600"
          }`}
          aria-pressed={language === option}
          aria-label={option === "en" ? "English" : "Español"}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

