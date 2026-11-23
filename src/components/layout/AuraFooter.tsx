import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import BrandMark from "@/components/brand/BrandMark";

const groups = [
  { title:"Explore", links:[["Culture Studio","/culture"],["Learning","/education"],["ALMA","/purityos"],["Membership","/membership"]] },
  { title:"Work with Susan", links:[["Coaching","/private-advisory"],["About Susan","/about"],["Book a conversation","/consultation"]] },
];

export default function AuraFooter(){
  return (
    <footer className="aura-footer">
      <div className="aura-footer-grid">
        <div className="aura-footer-brand">
          <Link href="/" className="aura-brand"><BrandMark size={31} variant="sage"/><span>Purity of Hearts</span></Link>
          <p>Culture-centered learning, coaching, and thoughtful tools for people who want to understand more before they lead.</p>
          <div className="aura-social-row">
            <Link href="/consultation" aria-label="Contact Purity of Hearts"><Mail size={15}/></Link>
          </div>
        </div>
        {groups.map(group=><nav key={group.title} aria-label={group.title} className="aura-footer-nav"><p>{group.title}</p><ul>{group.links.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
        <div className="aura-footer-cta"><p>Ready to begin?</p><h3>Start with a conversation.</h3><Link href="/consultation" className="aura-footer-action">Connect with Susan <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="aura-footer-bottom"><span>© {new Date().getFullYear()} Purity of Hearts</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/membership/manage">Billing</Link></div></div>
    </footer>
  );
}
