"use client";

import { Download, Printer } from "lucide-react";

export default function CertificateActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f653a6] to-[#8f75ff] px-6 py-3 text-sm font-semibold text-[#ffffff]"
      >
        <Download size={16} />
        Save as PDF
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] px-6 py-3 text-sm text-white/[0.55]"
      >
        <Printer size={16} />
        Print
      </button>
    </div>
  );
}

