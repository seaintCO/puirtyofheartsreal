import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PremiumButton({
  children,
  href = "#",
  className = "",
}:{
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,.95), rgba(241,245,249,.82))",
        boxShadow: "0 18px 35px rgba(31,41,55,.25),0 0 0 1px rgba(209,213,219,.30)",
        color: "#374151",
      }}
    >
      <span className="relative z-10 tracking-tight">{children}</span>
      <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]" />
    </Link>
  );
}



