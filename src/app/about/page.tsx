import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, HeartHandshake, MessageCircle } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata={title:"About Susan | Purity of Hearts",description:"Meet Susan Wagner and the philosophy behind Purity of Hearts."};

export default function AboutPage(){
 const values=[
  ["01","Curiosity","Ask before assuming. Listen before labeling."],
  ["02","Context","People make sense inside their history, relationships, and environment."],
  ["03","Practice","Reflection should change the way we show up, not stop at information."],
 ];
 return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
   <section className="aura-subhero"><div className="aura-subhero-copy" data-aura-reveal><span className="aura-outline-pill"><HeartHandshake size={15}/> About Susan</span><h1>Work that starts<br/>with <span>people.</span></h1><p>Susan Wagner's work brings coaching, culture, faith-centered reflection, and practical learning into one experience for people who want to guide others with more care.</p><div className="aura-hero-buttons"><AuraShiftLink href="/consultation" label="Talk with Susan" icon={<ArrowUpRight size={16}/>} /><Link href="/private-advisory" className="aura-secondary-button">Explore coaching <ArrowRight size={16}/></Link></div></div><div className="aura-about-visual" data-aura-reveal><div className="aura-about-monogram">SW</div><span>COACH · EDUCATOR · GUIDE</span></div></section>
   <section className="aura-section"><div className="aura-section-heading" data-aura-reveal><span className="aura-outline-pill"><Compass size={15}/> The philosophy</span><h2>More thoughtful questions.<br/><span>More human answers.</span></h2><p>The platform is designed around the idea that meaningful coaching starts with understanding the person and the context around them.</p></div><div className="aura-path-grid">{values.map(([n,title,copy])=><div className="aura-path-card" data-aura-reveal key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
   <AuraPhotoBand
   image="/purity-one-on-one.avif"
   alt="A modern workshop and coaching conversations centered on listening and thoughtful leadership"
   eyebrow="THE WORK"
   title="A platform shaped around real conversations."
   body="Purity of Hearts is meant to feel like an extension of Susan's work: practical, personal, reflective, and grounded in people."
   href="/private-advisory"
   linkLabel="Explore Susan's coaching approach"
  />
  <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal><h2>Want to learn directly <span>with Susan?</span></h2><p>Start with a conversation about your coaching, leadership, writing, or learning goals.</p><div><AuraShiftLink href="/consultation" label="Start a conversation" icon={<MessageCircle size={16}/>} /></div></div></section>
   <AuraFooter/>
 </main></div>
}
