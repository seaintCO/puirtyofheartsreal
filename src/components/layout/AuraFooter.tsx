import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import BrandMark from "@/components/brand/BrandMark";

const groups = [
  { title:"Explore", links:[["Educational Platform","/course"],["Culture Studio","/culture"],["ALMA","/purityos"],["About Susan","/about"],["Speaking","/speaking"]] },
  { title:"Work with Susan", links:[["Private Mentorship","/private-advisory"],["Book a Consultation","/consultation"],["Member Sign In","/login"]] },
];

export default function AuraFooter(){
  return (
    <footer className="aura-footer">
      <div className="aura-footer-grid">
        <div className="aura-footer-brand">
          <Link href="/" className="aura-brand"><BrandMark size={31} variant="sage"/><span>Purity of Hearts</span></Link>
          <p>Business education, culture-centered coaching, mentorship, and thoughtful tools for people building with purpose.</p>
          <div className="aura-social-row"><Link href="/consultation" aria-label="Contact Purity of Hearts"><Mail size={15}/></Link></div>
        </div>
        {groups.map(group=><nav key={group.title} aria-label={group.title} className="aura-footer-nav"><p>{group.title}</p><ul>{group.links.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
        <div className="aura-footer-cta"><p>Two ways to begin</p><h3>Learn online or work directly with Susan.</h3><Link href="/course" className="aura-footer-action">View the $200 course <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="aura-footer-bottom"><span>© {new Date().getFullYear()} Purity of Hearts</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </footer>
  );
}
