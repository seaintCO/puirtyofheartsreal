import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Mic2, Sparkles, Ticket, UsersRound } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";

export const metadata = {
  title: "See Susan Speak | Purity of Hearts",
  description: "Upcoming speaking appearances for Susan Harris Waggoner, including the 2027 Be Brilliant in the Basics Leadership Summit in Nashville.",
};

export default function SpeakingPage(){
  return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
    <section className="speaking-hero">
      <div className="speaking-hero-copy" data-aura-reveal>
        <span className="aura-outline-pill"><Mic2 size={15}/> SEE HER · HEAR HER TALK</span>
        <h1>Susan on stage.<br/><span>Ideas in the room.</span></h1>
        <p>
          Follow Susan’s upcoming speaking appearances, leadership conversations, and live events around
          entrepreneurship, culture, people, business, and purposeful leadership.
        </p>
        <div className="aura-hero-buttons"><AuraShiftLink href="#next-event" label="See Next Event" icon={<CalendarDays size={15}/>} /><Link href="/about" className="aura-secondary-button">About Susan <ArrowRight size={15}/></Link></div>
      </div>
      <div className="speaking-stage-visual" data-aura-reveal>
        <span className="stage-ring one"/><span className="stage-ring two"/><span className="stage-ring three"/>
        <Mic2 size={68} strokeWidth={1}/>
        <strong>LIVE</strong>
        <small>BUSINESS · CULTURE · LEADERSHIP</small>
      </div>
    </section>

    <section id="next-event" className="speaking-event">
      <div className="speaking-event-date" data-aura-reveal><span>SEP</span><strong>09</strong><small>2027</small></div>
      <div className="speaking-event-main" data-aura-reveal>
        <span className="speaker-kicker"><Sparkles size={14}/> SCHEDULED SPEAKING APPEARANCE</span>
        <h2>Be Brilliant in the Basics Leadership Summit 2027</h2>
        <p>
          Susan is scheduled to participate and speak at the Nashville leadership summit focused on practical
          leadership behaviors, workplace culture, people, trust, and performance.
        </p>
        <div className="speaking-event-meta">
          <span><CalendarDays size={15}/> Thursday, September 9, 2027</span>
          <span><MapPin size={15}/> Music City Center · Nashville, Tennessee</span>
          <span><UsersRound size={15}/> Leadership Summit</span>
        </div>
        <div className="speaking-event-actions">
          <a href="https://www.bebrilliantinthebasics.com" target="_blank" rel="noreferrer" className="speaker-site-button">Official Summit Site <ArrowUpRight size={15}/></a>
          <a href="https://www.eventbrite.com/e/be-brilliant-in-the-basics-leadership-summit-nashville-2027-tickets-1991792036599" target="_blank" rel="noreferrer" className="speaker-event-link"><Ticket size={14}/> Tickets / Eventbrite</a>
        </div>
        <small className="speaking-program-note">Speaker and program details are managed by the event organizer and may be updated before the summit.</small>
      </div>
    </section>

    <section className="course-section">
      <div className="course-section-heading" data-aura-reveal>
        <span className="aura-outline-pill"><Mic2 size={15}/> WHY HEAR SUSAN</span>
        <h2>She speaks from <span>operator experience.</span></h2>
        <p>Susan’s perspective comes from building and exiting companies, national brand leadership, professional education, multi-unit operations, and direct mentorship.</p>
      </div>
      <div className="speaking-topic-grid">
        {[
          ["Building from zero","What it takes to move from an idea to a business with systems, customers, and value."],
          ["Culture that people feel","Why culture is experienced through everyday leadership behavior, not slogans."],
          ["Leadership through relationships","How trust, service, clarity, and follow-through shape long-term performance."],
          ["Knowing when to exit","Lessons from building and profitably selling multiple salon businesses."],
        ].map(([title,copy])=><article key={title} data-aura-reveal><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal>
      <h2>Want Susan in <span>your room?</span></h2>
      <p>Use the consultation form to discuss private mentorship, strategic work, or a future speaking opportunity.</p>
      <div><AuraShiftLink href="/consultation" label="Connect with Susan" icon={<ArrowRight size={15}/>} /><Link href="/about" className="aura-secondary-button">Read Her Story <ArrowRight size={15}/></Link></div>
    </div></section>
    <AuraFooter/>
  </main></div>
}
