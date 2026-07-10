"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Shop", href: "/shop" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1F1F1F]/5 bg-[#FFF8F2]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold uppercase tracking-tight text-[#1F1F1F]"
        >
          Purity of Hearts
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#1F1F1F]/65 transition hover:text-[#1F1F1F]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-[#1F1F1F] transition hover:text-[#C9A75D]"
          >
            Log In
          </Link>

          <Link
            href="/enroll"
            className="flex items-center gap-2 rounded-full bg-[#C9A75D] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#b59550]"
          >
            Enroll
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#1F1F1F]/5 bg-[#FFF8F2] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#1F1F1F]/75"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-[#1F1F1F]/75"
            >
              Log In
            </Link>

            <Link
              href="/enroll"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#C9A75D] px-6 py-3 text-center text-sm font-medium text-white"
            >
              Enroll
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}