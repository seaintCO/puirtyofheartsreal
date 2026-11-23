import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Education Platform", href: "/education" },
  { label: "PurityOS", href: "/purityos" },
  { label: "Work with Susan", href: "/private-advisory" },
  { label: "About Susan", href: "/about" },
  { label: "Member Portal", href: "/login" },
];

export default function Footer({ dark = false }: { dark?: boolean }) {
  return (
    <footer
      className={`border-t px-5 py-10 sm:px-8 ${
        dark
          ? "border-white/[0.08] bg-[#08080d] text-white"
          : "border-white/[0.70] bg-white/[0.45] text-[#111116] backdrop-blur-2xl"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b pb-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-semibold ${
                  dark
                    ? "border-white/[0.12] bg-white/[0.07] text-white"
                    : "border-white/[0.80] bg-white/[0.72] text-black shadow-sm"
                }`}
              >
                PH
              </span>
              <p className="text-sm font-semibold">Purity Of Hearts</p>
            </div>
            <h2 className="mt-7 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
              Clear vision. Practical strategy. A business built to last.
            </h2>
          </div>
          <div className="md:text-right">
            <Link
              href="/consultation"
              className="liquid-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-6 py-3.5 text-sm font-semibold text-white"
            >
              Book a growth strategy call <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-7 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-medium transition ${
                  dark
                    ? "text-white/[0.42] hover:text-white"
                    : "text-black/[0.46] hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div
            className={`flex flex-wrap items-center gap-5 text-[11px] ${
              dark ? "text-white/[0.27]" : "text-black/[0.34]"
            }`}
          >
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <p>© 2026 Purity Of Hearts. Powered by SEAINT Enterprise.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
