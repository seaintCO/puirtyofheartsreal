"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
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
          : "border-black/[0.06] bg-white/80 text-[#1f1f1f]"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[-0.02em]"
        >
          Purity of Hearts
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-medium transition ${
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
            className={`text-xs font-medium transition ${
              dark ? "text-white/60 hover:text-white" : "hover:text-[#a88643]"
            }`}
          >
            Log In
          </Link>

          <Link
            href="/enroll"
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
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
          className={`rounded-full p-2 ${dark ? "text-white md:hidden" : "md:hidden"}`}
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
              : "border-black/[0.06] bg-white"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={dark ? "rounded-xl px-3 py-3 text-base font-medium text-white/70" : "rounded-xl px-3 py-3 text-base font-medium text-[#1f1f1f]/75"}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={dark ? "rounded-xl px-3 py-3 text-base font-medium text-white/70" : "rounded-xl px-3 py-3 text-base font-medium text-[#1f1f1f]/75"}
            >
              Log In
            </Link>

            <Link
              href="/enroll"
              onClick={() => setOpen(false)}
              className={dark ? "mt-3 rounded-full bg-[#d8b665] px-6 py-3.5 text-center text-sm font-medium text-[#17130c]" : "mt-3 rounded-full bg-[#1f1f1f] px-6 py-3.5 text-center text-sm font-medium text-white"}
            >
              Enroll
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
