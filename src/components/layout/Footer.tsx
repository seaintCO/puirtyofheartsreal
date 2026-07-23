import Link from "next/link";
import { Heart } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "PurityOS", href: "/purityos" },
  { label: "Shop", href: "/shop" },
  { label: "Book Susan", href: "/consultation" },
];

export default function Footer({ dark = false }: { dark?: boolean }) {
  return (
    <footer
      className={`border-t px-6 py-10 ${
        dark
          ? "border-white/10 bg-[#0e0d0b] text-white"
          : "border-[#1f1f1f]/5 bg-[#fffaf4] text-[#1f1f1f]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold uppercase tracking-tight">
          Purity of Hearts
        </Link>

        <div className="flex flex-wrap items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm font-medium ${dark ? "text-white/45 hover:text-white" : "text-[#1f1f1f]/55 hover:text-[#1f1f1f]"}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={`flex flex-wrap items-center gap-4 text-sm ${dark ? "text-white/35" : "text-[#1f1f1f]/55"}`}>
          <Link href="/privacy" className="hover:text-[#C9A75D]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#C9A75D]">Terms</Link>
          <Link href="/returns" className="hover:text-[#C9A75D]">Returns</Link>
        </div>
      </div>

      <div className={`mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between ${dark ? "border-white/10 text-white/30" : "border-[#1f1f1f]/5 text-[#1f1f1f]/45"}`}>
        <p>Copyright 2026 Purity of Hearts. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Powered by SEAINT Enterprise <Heart size={13} className="text-[#C9A75D]" />
        </p>
      </div>
    </footer>
  );
}
