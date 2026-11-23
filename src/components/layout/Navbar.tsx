"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Platform", href: "/education" },
  { label: "PurityOS", href: "/purityos" },
  { label: "Work with Susan", href: "/private-advisory" },
  { label: "About", href: "/about" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-[28px] ${
        dark
          ? "border-white/[0.08] bg-[#09090e]/[0.70] text-white"
          : "border-white/[0.70] bg-white/[0.55] text-[#111116]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border text-[10px] font-semibold tracking-[-0.04em] ${
              dark
                ? "border-white/[0.15] bg-white/[0.07] text-white"
                : "border-white/[0.80] bg-white/[0.70] text-[#111116] shadow-[0_8px_24px_rgba(32,36,56,.10)]"
            }`}
          >
            <span className="absolute inset-x-1 top-0 h-3 rounded-full bg-white/[0.55] blur-sm" />
            <span className="relative">PH</span>
          </span>
          <span className="text-sm font-semibold tracking-[-0.025em]">
            Purity Of Hearts
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-medium transition ${
                dark
                  ? "text-white/[0.52] hover:text-white"
                  : "text-[#111116]/[0.55] hover:text-[#111116]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className={`text-xs font-medium transition ${
              dark ? "text-white/[0.52] hover:text-white" : "text-black/[0.52] hover:text-black"
            }`}
          >
            Member login
          </Link>
          <Link
            href="/consultation"
            className="liquid-button inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-5 py-2.5 text-xs font-semibold text-white"
          >
            Book a strategy call <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`rounded-full border p-2 lg:hidden ${
            dark
              ? "border-white/[0.10] bg-white/[0.05] text-white"
              : "border-white/[0.80] bg-white/[0.60] text-black shadow-sm"
          }`}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className={`border-t px-5 py-5 backdrop-blur-[28px] lg:hidden ${
            dark
              ? "border-white/[0.08] bg-[#0d0d14]/[0.95]"
              : "border-white/[0.75] bg-white/[0.90]"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-medium ${
                  dark
                    ? "text-white/[0.72] hover:bg-white/[0.06]"
                    : "text-black/[0.70] hover:bg-black/[0.035]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3 text-base font-medium ${
                dark ? "text-white/[0.72]" : "text-black/[0.70]"
              }`}
            >
              Member login
            </Link>
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_16px_40px_rgba(243,47,145,.24)]"
            >
              Book a growth strategy call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
