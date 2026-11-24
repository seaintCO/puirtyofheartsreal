"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, GraduationCap, Home, Info, Menu, MessageCircle, UsersRound, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand/BrandMark";
import PwaInstallButton from "@/components/pwa/PwaInstallButton";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Course", href: "/course", icon: GraduationCap },
  { label: "Culture", href: "/culture", icon: Compass },
  { label: "Mentorship", href: "/private-advisory", icon: UsersRound },
  { label: "ALMA", href: "/purityos", icon: MessageCircle },
  { label: "Susan", href: "/about", icon: Info },
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
          return <Link key={item.href} href={item.href} className={active?"aura-nav-pill active":"aura-nav-pill"}><item.icon size={14} strokeWidth={1.7}/>{item.label}</Link>;
        })}
      </nav>

      <div className="aura-header-actions">
        <PwaInstallButton />
        <Link href="/course" className="aura-join-pill"><BookOpen size={14}/> Buy Course · $200</Link>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} className="aura-menu-button" onClick={()=>setOpen(!open)}>
          {open?<X size={19}/>:<Menu size={19}/>}
        </button>
      </div>

      {open && <div className="aura-mobile-menu">
        {links.map(item => <Link href={item.href} key={item.href} onClick={()=>setOpen(false)}><item.icon size={16}/><span>{item.label}</span></Link>)}
        <PwaInstallButton mobile />
        <Link href="/course" onClick={()=>setOpen(false)} className="primary"><BookOpen size={15}/><span>Buy Course · $200</span></Link>
        <Link href="/login" onClick={()=>setOpen(false)}><span>Member sign in</span></Link>
      </div>}
    </header>
  );
}
