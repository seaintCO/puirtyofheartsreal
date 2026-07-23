"use client";

import Link from "next/link";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "PurityOS", href: "/purityos" },
  { label: "Shop", href: "/shop" },
  { label: "Community", href: "/community" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${
        dark
          ? "border-white/10 bg-[#0e0d0b]/80 text-white"
          : "border-[#1F1F1F]/7 bg-[#fffaf4]/78 text-[#1f1f1f]"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em]"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
              dark
                ? "border-[#d8b665]/20 bg-[#d8b665]/10 text-[#e1c474]"
                : "border-[#c9a75d]/20 bg-[#c9a75d]/10 text-[#9a7838]"
            }`}
          >
            <Sparkles size={16} />
          </span>
          <span>Purity of Hearts</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                dark
                  ? "text-white/50 hover:text-white"
                  : "text-[#1f1f1f]/55 hover:text-[#1f1f1f]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className={`text-sm font-medium transition ${
              dark ? "text-white/60 hover:text-white" : "hover:text-[#a88643]"
            }`}
          >
            Log In
          </Link>

          <Link
            href="/enroll"
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 ${
              dark
                ? "bg-[#d8b665] text-[#17130c] hover:bg-[#ecd083]"
                : "bg-[#1f1f1f] text-white hover:bg-[#a88643]"
            }`}
          >
            Enroll
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          className={dark ? "text-white md:hidden" : "md:hidden"}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className={`border-t px-6 py-6 md:hidden ${
            dark
              ? "border-white/10 bg-[#0e0d0b]"
              : "border-[#1f1f1f]/5 bg-[#fffaf4]"
          }`}
        >
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={dark ? "text-base font-medium text-white/70" : "text-base font-medium text-[#1f1f1f]/75"}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={dark ? "text-base font-medium text-white/70" : "text-base font-medium text-[#1f1f1f]/75"}
            >
              Log In
            </Link>

            <Link
              href="/enroll"
              onClick={() => setOpen(false)}
              className={dark ? "rounded-full bg-[#d8b665] px-6 py-3 text-center text-sm font-medium text-[#17130c]" : "rounded-full bg-[#1f1f1f] px-6 py-3 text-center text-sm font-medium text-white"}
            >
              Enroll
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
