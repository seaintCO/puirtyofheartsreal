import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, HeartHandshake, MessageCircle, UsersRound } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata={title:"Coaching with Susan | Purity of Hearts",description:"Culture-centered coaching for coaches, leaders, and educators."};

const principles=[
  ["01","Listen first","Make space for the person's own definition of what matters."],
  ["02","Check the context","Look for history, identity, relationships, and assumptions influencing the conversation."],
  ["03","Guide with intention","Turn reflection into a next step that belongs to the person being coached."],
];

export default function PrivateAdvisoryPage(){
 return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
  <section className="aura-subhero"><div className="aura-subhero-copy" data-aura-reveal><span className="aura-outline-pill"><UsersRound size={15}/> Coaching for coaches</span><h1>Good coaching starts<br/>with <span>better questions.</span></h1><p>Work with Susan to deepen the way you listen, understand culture and context, and guide people without rushing to an answer.</p><div className="aura-hero-buttons"><AuraShiftLink href="/consultation" label="Start a conversation" icon={<ArrowUpRight size={16}/>} /><Link href="/culture" className="aura-secondary-button">Explore Culture Studio <ArrowRight size={16}/></Link></div></div><div className="aura-culture-visual" data-aura-reveal><div className="aura-culture-orbit"><span/><span/><HeartHandshake size={64} strokeWidth={1}/><small>LISTEN · CONTEXT · PRACTICE</small></div></div></section>
  <section className="aura-section"><div className="aura-section-heading" data-aura-reveal><span className="aura-outline-pill"><Compass size={15}/> Susan's approach</span><h2>Less performance.<br/><span>More understanding.</span></h2><p>The coaching experience is built around attention, curiosity, and practical reflection.</p></div><div className="aura-path-grid">{principles.map(([n,title,copy])=><div className="aura-path-card" data-aura-reveal key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
  <AuraPhotoBand
    image="/purity-life-collage.webp"
    alt="Coaching conversations in a calm modern setting with thoughtful listening and reflection"
    eyebrow="COACHING IN PRACTICE"
    title="Good coaching feels human."
    body="It looks like attention, room to think, honest questions, and enough quiet for someone to hear their own answer."
    href="/consultation"
    linkLabel="Talk with Susan"
  />
  <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal><h2>Want Susan involved in <span>your next chapter?</span></h2><p>Request a conversation and share what you're building, who you serve, and where you'd like support.</p><div><AuraShiftLink href="/consultation" label="Request a conversation" icon={<MessageCircle size={16}/>} /></div></div></section>
  <AuraFooter/>
 </main></div>
}
