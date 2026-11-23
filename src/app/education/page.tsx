import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, FileText, Layers3, NotebookPen, Play, Sparkles } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import { businessCourse, businessLessons } from "@/data/business-course";

export const metadata={title:"Learning | Purity of Hearts",description:"Guided business, leadership, and culture-centered learning inside Purity of Hearts."};

export default function EducationPage(){
 const totalMinutes=businessLessons.reduce((total,lesson)=>{const [m,s]=lesson.duration.split(":").map(Number);return total+m+s/60},0);
 const highlights=[
  ["Guided lessons",businessLessons.length+" lessons",Play],
  ["Structured modules",businessCourse.modules.length+" modules",Layers3],
  ["Notes & study tools","Save your learning",NotebookPen],
  ["Resources","Member learning library",FileText],
 ];
 return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
  <section className="aura-subhero"><div className="aura-subhero-copy" data-aura-reveal><span className="aura-outline-pill"><BookOpen size={15}/> Learning</span><h1>Learn with intention.<br/><span>Apply with context.</span></h1><p>Move through practical business and leadership lessons, then connect what you learn to culture, coaching, and the way you lead people.</p><div className="aura-hero-buttons"><Link href="/membership" className="aura-primary-button"><ArrowUpRight size={16}/> Join membership</Link><Link href="/courses" className="aura-secondary-button">View curriculum <ArrowRight size={16}/></Link></div></div>
  <div className="aura-learning-panel" data-aura-reveal><div className="aura-console-head"><span>{businessCourse.title}</span><span className="online">LEARNING</span></div><p className="aura-learning-big">{businessLessons.length} lessons</p><p className="aura-learning-copy">About {Math.round(totalMinutes)} minutes of guided video content plus quizzes, notes, resources, and saved progress.</p><div className="aura-learning-progress"><span style={{width:"42%"}}/></div><small>Member progress is saved to your private account.</small></div></section>
  <section className="aura-section"><div className="aura-section-heading" data-aura-reveal><span className="aura-outline-pill"><Sparkles size={15}/> Inside the learning space</span><h2>Practical learning, <span>without the noise.</span></h2><p>The member platform keeps lessons, study tools, and reflection in one place.</p></div><div className="aura-feature-grid">{highlights.map(([title,copy,Icon])=>{const I=Icon as typeof Play;return <div key={title as string} className="aura-feature-card" data-aura-reveal><span className="aura-feature-icon"><I size={21}/></span><h3>{title as string}</h3><p>{copy as string}</p></div>})}</div></section>
  <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal><h2>Ready to put the learning <span>into practice?</span></h2><p>Join the member experience, or explore the Culture Studio before you decide.</p><div><Link href="/membership" className="aura-primary-button"><CheckCircle2 size={16}/> View membership</Link><Link href="/culture" className="aura-secondary-button">Explore Culture Studio <ArrowRight size={16}/></Link></div></div></section>
  <AuraFooter/>
 </main></div>
}
