"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, Compass, Home, Menu, MessageCircle, UsersRound, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand/BrandMark";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Culture", href: "/culture", icon: Compass },
  { label: "Learning", href: "/education", icon: BookOpen },
  { label: "Coaching", href: "/private-advisory", icon: UsersRound },
  { label: "ALMA", href: "/purityos", icon: MessageCircle },
];

export default function AuraHeader() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);

  return (
    <header className="aura-header">
      <Link href="/" className="aura-brand" aria-label="Purity of Hearts home">
        <BrandMark size={31} variant="sage"/>
        <span>Purity of Hearts</span>
      </Link>

      <nav className="aura-nav-pills" aria-label="Primary navigation">
        {links.map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={active?"aura-nav-pill active":"aura-nav-pill"}>
              <item.icon size={14} strokeWidth={1.7}/>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="aura-header-actions">
        <Link href="/membership" data-aura-magnet className="aura-join-pill">
          <ArrowUpRight size={14}/> Join membership
        </Link>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} className="aura-menu-button" onClick={()=>setOpen(!open)}>
          {open?<X size={19}/>:<Menu size={19}/>}
        </button>
      </div>

      {open && (
        <div className="aura-mobile-menu">
          {links.map(item => <Link href={item.href} key={item.href} onClick={()=>setOpen(false)}><item.icon size={16}/><span>{item.label}</span><ArrowUpRight size={14}/></Link>)}
          <Link href="/membership" onClick={()=>setOpen(false)} className="primary"><span>Join membership</span><ArrowUpRight size={14}/></Link>
          <Link href="/login" onClick={()=>setOpen(false)}><span>Member sign in</span><ArrowUpRight size={14}/></Link>
        </div>
      )}
    </header>
  );
}
