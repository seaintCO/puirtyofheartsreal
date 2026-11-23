import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/brand/BrandMark";

const links = [
  { title: "Culture Studio", href: "/culture" },
  { title: "Education", href: "/education" },
  { title: "ALMA / PurityOS", href: "/purityos" },
  { title: "Coaching", href: "/private-advisory" },
  { title: "About Susan", href: "/about" },
  { title: "Member login", href: "/login" },
];

export default function Footer({ dark: _dark = false }: { dark?: boolean }) {
  return (
    <footer className="border-t border-white/10 bg-[#102B40] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark variant="navy" size={48} />
              <span className="text-sm font-semibold tracking-wide">Purity of Hearts</span>
            </div>
            <h2 className="mt-7 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.05em] sm:text-5xl">
              Lead with understanding.<br /><span className="text-[#CCB074]">Build with purpose.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">Culture-centered education, reflective tools, and coaching with Susan Wagner.</p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#D8BF88]">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-7 pt-8 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {links.map((item) => <Link key={item.href} href={item.href} className="text-xs text-white/65 transition hover:text-[#CCB074]">{item.title}</Link>)}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/45">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>© 2026 Purity of Hearts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
