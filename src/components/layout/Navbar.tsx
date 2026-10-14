"use client";

import { Menu } from "lucide-react";
import Container from "@/components/ui/Container";
import PremiumButton from "@/components/ui/PremiumButton";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Model", href: "#model" },
  { label: "Philosophy", href: "#philosophy" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-tight text-[#111111]">
            SEAINT <span className="ml-1 font-normal text-neutral-500">Enterprise</span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-[#111111]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <PremiumButton href="#consultation">Consultation</PremiumButton>
          </div>

          
        </div>
      </Container>
    </nav>
  );
}



