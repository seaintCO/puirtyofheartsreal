import Link from "next/link";
import { Heart } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Shop", href: "/shop" },
  { label: "Community", href: "/community" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F1F]/5 bg-[#FFF8F2] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold uppercase tracking-tight text-[#1F1F1F]">
          Purity of Hearts
        </Link>

        <div className="flex flex-wrap items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#1F1F1F]/65 hover:text-[#1F1F1F]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#1F1F1F]/55">
          <Link href="/privacy" className="hover:text-[#C9A75D]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#C9A75D]">Terms</Link>
          <Link href="/returns" className="hover:text-[#C9A75D]">Returns</Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-[#1F1F1F]/5 pt-6 text-xs text-[#1F1F1F]/45 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Purity of Hearts. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Powered by SEAINT Enterprise <Heart size={13} className="text-[#C9A75D]" />
        </p>
      </div>
    </footer>
  );
}
