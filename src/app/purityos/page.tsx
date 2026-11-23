import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Feather, MessageCircle, Sparkles } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata = { title:"ALMA | Purity of Hearts", description:"Private AI-assisted reflection for culture, coaching, and writing." };

const uses=[
  [CalendarDays,"Reflect","Think through conversations and plan intentional reflection."],
  [BookOpen,"Understand","Explore culture and context through better questions."],
  [Feather,"Write","Outline chapters and work through ideas in your own voice."],
];

export default function PurityOSPage(){
 return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
   <section className="aura-subhero">
     <div className="aura-subhero-copy" data-aura-reveal><span className="aura-outline-pill"><Sparkles size={15}/> ALMA member assistant</span><h1>A quieter place<br/>to <span>think out loud.</span></h1><p>ALMA helps members reflect on coaching situations, culture, leadership, and book ideas. It supports thoughtful questions — it does not replace lived experience or professional expertise.</p><div className="aura-hero-buttons"><AuraShiftLink href="/purityos/chat" label="Open member chat" icon={<MessageCircle size={16}/>} /><Link href="/membership" className="aura-secondary-button">Membership <ArrowRight size={16}/></Link></div></div>
     <div className="aura-alma-visual" data-aura-reveal><span className="ring one"/><span className="ring two"/><span className="ring three"/><strong>alma<span>.</span></strong><small>LISTEN · REFLECT · GROW</small></div>
   </section>
   <section className="aura-section"><div className="aura-section-heading" data-aura-reveal><span className="aura-outline-pill"><MessageCircle size={15}/> What ALMA is for</span><h2>Support for <span>thoughtful practice.</span></h2><p>Members get private AI-assisted reflection with daily and monthly usage limits.</p></div><div className="aura-feature-grid">{uses.map(([Icon,title,copy])=>{const I=Icon as typeof CalendarDays;return <div className="aura-feature-card" data-aura-reveal key={title as string}><span className="aura-feature-icon"><I size={21}/></span><h3>{title as string}</h3><p>{copy as string}</p></div>})}</div></section>
   <AuraPhotoBand
     image="/purity-life-collage-2.webp"
     alt="A professional workshop, thoughtful writing session, and focused coaching conversation"
     eyebrow="HUMAN FIRST"
     title="AI supports the conversation. It does not replace it."
     body="ALMA helps members organize questions, reflections, and writing ideas so they can return to real people with more care and clarity."
     href="/membership"
     linkLabel="See how membership works"
     reverse
   />
   <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal><h2>Already a member? <span>Start a conversation.</span></h2><p>Open your private ALMA chat, or learn about the membership if you haven't joined yet.</p><div><AuraShiftLink href="/purityos/chat" label="Open ALMA" icon={<ArrowUpRight size={16}/>} /><Link href="/membership" className="aura-secondary-button">View membership <ArrowRight size={16}/></Link></div></div></section>
   <AuraFooter/>
 </main></div>
}
