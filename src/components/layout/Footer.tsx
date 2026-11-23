import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/brand/BrandMark";

const links = [
  { label: "The Culture Studio", href: "/culture" },
  { label: "Coaching with Susan", href: "/private-advisory" },
  { label: "Learning", href: "/education" },
  { label: "ALMA", href: "/purityos" },
  { label: "Contact", href: "/consultation" },
];

export default function Footer({ dark: _dark = false }: { dark?: boolean }) {
  return (
    <footer className="ph-footer">
      <div className="ph-footer-inner">
        <div className="ph-footer-top">
          <div className="ph-footer-brand"><BrandMark size={50} variant="sage"/><span>purity of hearts</span></div>
          <p className="ph-footer-manifesto">Lead with<br/><em>understanding.</em></p>
          <div className="ph-footer-action"><p>For coaches, leaders, and people who believe our differences deserve more than assumptions.</p><Link href="/consultation" className="ph-btn ph-btn-gold">Start a conversation <ArrowUpRight size={16}/></Link></div>
        </div>
        <div className="ph-footer-bottom">
          <span>© {new Date().getFullYear()} Purity of Hearts</span>
          <div className="ph-footer-links">{links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
          <div className="ph-footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
