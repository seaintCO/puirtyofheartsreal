"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

export default function UnicornBackground() {
  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio?.init) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    if (!document.querySelector('script[src*="unicornStudio.umd.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
      script.onload = initUnicorn;
      document.body.appendChild(script);
    } else {
      initUnicorn();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div
        data-us-project="1bY8o6HVTI1oxJxuCJEG"
        className="absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="animate-[codeMove_18s_linear_infinite] whitespace-nowrap pt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
          SEAINT PORTFOLIO // $240,000,000 VALUATION // ALMA // ALMA TECH // SEAINT INTELLIGENCE // SEAINT FINTECH // NOCTRAI // ALTA // OPERATING SYSTEMS //
        </div>

        <div className="animate-[codeMove_26s_linear_infinite] whitespace-nowrap pt-40 font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          PRIVATE EQUITY // VENTURE CAPITAL // COMPANY BUILDING // INTERNAL TARGET MODEL // 240 MILLION VALUATION //
        </div>
      </div>

      <style>{`
        @keyframes codeMove {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}




