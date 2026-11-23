import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Compass, Feather, MessageCircle, Sparkles } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata = {
  title: "Culture Studio | Purity of Hearts",
  description: "Culture Calendar, Culture Insights, and Book Writing Guide for thoughtful coaches and leaders.",
};

const tools = [
  { id:"calendar", icon:CalendarDays, title:"Culture Calendar", copy:"Choose dates for reflection, observation, research, and coaching conversations.", href:"/login?next=/dashboard/culture" },
  { id:"insights", icon:Compass, title:"Culture Insights", copy:"Explore context, belonging, communication, leadership, and the questions behind them.", href:"/login?next=/dashboard/culture" },
  { id:"writing", icon:Feather, title:"Book Writing Guide", copy:"Organize your lived experience into chapters and prompts without losing your voice.", href:"/login?next=/dashboard/culture" },
];

export default function CulturePage(){
  return (
    <div className="aura-page">
      <AuraMotion/>
      <main className="aura-shell aura-inner-page">
        <PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
        <section className="aura-subhero">
          <div className="aura-subhero-copy" data-aura-reveal>
            <span className="aura-outline-pill"><Sparkles size={15}/> The Culture Studio</span>
            <h1>Understand more.<br/><span>Coach better.</span></h1>
            <p>A focused space for learning, reflection, and writing — built around context, curiosity, and the people you actually serve.</p>
            <div className="aura-hero-buttons"><AuraShiftLink href="/login?next=/dashboard/culture" label="Open member workspace" icon={<ArrowUpRight size={16}/>} /><Link href="/private-advisory" className="aura-secondary-button">Talk with Susan <ArrowRight size={16}/></Link></div>
          </div>
          <div className="aura-culture-visual" data-aura-reveal>
            <div className="aura-culture-orbit"><span/><span/><Compass size={66} strokeWidth={1}/><small>CONTEXT · CURIOSITY · PRACTICE</small></div>
          </div>
        </section>
        <section className="aura-section">
          <div className="aura-section-heading" data-aura-reveal><span className="aura-outline-pill"><BookOpen size={15}/> Three connected tools</span><h2>Quiet tools for <span>meaningful work.</span></h2><p>Each part of the studio is designed to help you slow down, notice context, and put what you learn into practice.</p></div>
          <div className="aura-feature-grid">
            {tools.map(tool=><Link key={tool.id} id={tool.id} href={tool.href} className="aura-feature-card" data-aura-reveal><span className="aura-feature-icon"><tool.icon size={21}/></span><h3>{tool.title}</h3><p>{tool.copy}</p><span className="aura-feature-link">Open in member workspace <ArrowUpRight size={14}/></span></Link>)}
          </div>
        </section>
        <AuraPhotoBand
          image="/purity-life-collage.webp"
          alt="A diverse group discussing ideas, a woman writing reflections, and a coaching conversation"
          eyebrow="CULTURE IN REAL LIFE"
          title="Context lives in people, not categories."
          body="The Studio is built to support the human work: listening closely, noticing what is missing, and making room for someone else's perspective."
          href="/login?next=/dashboard/culture"
          linkLabel="Use the Culture Studio"
        />
        <section className="aura-section aura-membership-preview">
          <div className="aura-membership-copy" data-aura-reveal><span className="aura-outline-pill"><MessageCircle size={15}/> ALMA + Culture Studio</span><h2>Think through what <span>you're learning.</span></h2><p>Members can move from a Culture Insight into ALMA to brainstorm respectful questions, then save their reflections in the member workspace.</p><AuraShiftLink href="/purityos" label="Explore ALMA" icon={<ArrowUpRight size={16}/>} /></div>
          <div className="aura-membership-console" data-aura-reveal>
            <div className="aura-console-head"><span>Culture Studio</span><span className="online">MEMBER TOOLS</span></div>
            {tools.map(tool=><Link key={tool.id} href={tool.href} className="aura-console-row"><tool.icon size={17}/><div><strong>{tool.title}</strong><small>{tool.copy}</small></div><ArrowUpRight size={15}/></Link>)}
          </div>
        </section>
        <AuraFooter/>
      </main>
    </div>
  );
}
