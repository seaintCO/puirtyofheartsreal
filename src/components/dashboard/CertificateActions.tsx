"use client";

import { Download, Printer } from "lucide-react";

export default function CertificateActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full bg-[#d8b665] px-6 py-3 text-sm font-semibold text-[#17130c]"
      >
        <Download size={16} />
        Save as PDF
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/55"
      >
        <Printer size={16} />
        Print
      </button>
    </div>
  );
}

