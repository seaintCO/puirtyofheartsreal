"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandMark from "@/components/brand/BrandMark";

const links = [
  { label: "The Studio", href: "/culture" },
  { label: "Coaching", href: "/private-advisory" },
  { label: "Learning", href: "/education" },
  { label: "ALMA", href: "/purityos" },
  { label: "Susan", href: "/about" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <header className={"ph-nav-wrap" + (dark ? " ph-nav-wrap-dark" : "")}>
      <div className="ph-nav-frame">
        <nav className="ph-nav" aria-label="Main navigation">
          <Link href="/" className="ph-nav-logo" aria-label="Purity of Hearts home" onClick={() => setOpen(false)}>
            <BrandMark size={38} variant="sage" />
            <span className="ph-nav-logo-text"><strong>purity of hearts</strong><small>WITH SUSAN WAGNER</small></span>
          </Link>
          <div className="ph-nav-links">
            {links.map(link => (
              <Link href={link.href} key={link.href} aria-current={pathname===link.href?"page":undefined} className={pathname===link.href?"ph-nav-link active":"ph-nav-link"}>{link.label}</Link>
            ))}
          </div>
          <div className="ph-nav-actions">
            <Link href="/login" className="ph-nav-signin">Member sign in</Link>
            <Link href="/consultation" className="ph-nav-cta">Let's connect <ArrowUpRight size={15} strokeWidth={1.7}/></Link>
            <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="ph-nav-toggle">
              {open ? <X size={21} /> : <Menu size={21}/>}
            </button>
          </div>
        </nav>
        {open && (
          <div className="ph-nav-mobile">
            {links.map(link => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={14}/></Link>)}
            <Link href="/login" onClick={() => setOpen(false)}>Member sign in <ArrowUpRight size={14}/></Link>
            <Link href="/consultation" onClick={() => setOpen(false)} className="ph-nav-mobile-primary">Let's connect <ArrowUpRight size={14}/></Link>
          </div>
        )}
      </div>
    </header>
  );
}
