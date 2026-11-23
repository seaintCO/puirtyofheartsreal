"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand/BrandMark";

const links = [
  { title: "Culture Studio", href: "/culture" },
  { title: "Education", href: "/education" },
  { title: "ALMA", href: "/purityos" },
  { title: "Coaching", href: "/private-advisory" },
  { title: "About Susan", href: "/about" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={dark ? "sticky top-0 z-50 border-b border-white/10 bg-[#102B40]/95 text-white backdrop-blur-xl" : "sticky top-0 z-50 border-b border-[#1B3C57]/10 bg-[#FEFEFE]/95 text-[#1B3C57] backdrop-blur-xl"}>
      <nav className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)} aria-label="Purity of Hearts home">
          <BrandMark size={42} variant={dark ? "navy" : "sage"} />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-[-0.025em] sm:text-base">Purity of Hearts</span>
            <span className={dark ? "mt-1.5 text-[9px] uppercase tracking-[0.2em] text-[#CCB074]" : "mt-1.5 text-[9px] uppercase tracking-[0.2em] text-[#648C85]"}>Culture · Coaching · Clarity</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={dark ? "text-xs font-medium text-white/70 transition hover:text-[#CCB074]" : "text-xs font-medium text-[#1B3C57]/75 transition hover:text-[#648C85]"}>{item.title}</Link>
          ))}
        </div>
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <Link href="/login" className={dark ? "text-xs font-medium text-white/70 hover:text-white" : "text-xs font-medium text-[#1B3C57]/75 hover:text-[#1B3C57]"}>Member login</Link>
          <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-5 py-3 text-xs font-semibold text-[#1B3C57] transition hover:bg-[#D8BF88]">
            Work with Susan <ArrowUpRight size={14} />
          </Link>
        </div>
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={dark ? "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 lg:hidden" : "flex h-11 w-11 items-center justify-center rounded-full border border-[#1B3C57]/20 lg:hidden"}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {open && (
        <div className={dark ? "border-t border-white/10 bg-[#102B40] px-5 pb-6 pt-4 lg:hidden" : "border-t border-[#1B3C57]/10 bg-[#FEFEFE] px-5 pb-6 pt-4 lg:hidden"}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#8AB0A9]/20">{item.title}</Link>)}
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#8AB0A9]/20">Member login</Link>
            <Link href="/consultation" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-[#CCB074] px-5 py-3.5 text-center text-sm font-semibold text-[#1B3C57]">Work with Susan</Link>
          </div>
        </div>
      )}
    </header>
  );
}
