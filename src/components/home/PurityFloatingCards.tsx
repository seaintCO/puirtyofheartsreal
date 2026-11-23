import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Feather,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function PurityFloatingCards() {
  return (
    <div className="aura-float-stage" aria-label="Purity of Hearts platform preview">
      <Link href="/login?next=/dashboard/culture" className="aura-float-card aura-float-calendar" data-float-card="1">
        <div className="aura-card-row"><span>Culture Calendar</span><CalendarDays size={15}/></div>
        <p className="aura-card-title">Plan with intention.</p>
        <div className="aura-mini-week" aria-hidden="true">
          {["M","T","W","T","F"].map((day,index)=><span className={index===2?"active":""} key={day+index}>{day}<b>{11+index}</b></span>)}
        </div>
      </Link>

      <Link href="/purityos" className="aura-float-card aura-float-alma" data-float-card="2">
        <div className="aura-card-row"><span>ALMA</span><Sparkles size={15}/></div>
        <p className="aura-card-copy">“Help me ask a better coaching question about belonging.”</p>
        <span className="aura-card-link">Explore reflection assistant <ArrowRight size={13}/></span>
      </Link>

      <Link href="/culture#writing" className="aura-float-card aura-float-writing" data-float-card="3">
        <div className="aura-writing-icon"><Feather size={19}/></div>
        <p>Book Writing Guide</p>
        <small>Chapter 01 · Your story</small>
        <div className="aura-writing-lines" aria-hidden="true"><i/><i/><i/></div>
      </Link>

      <Link href="/membership" className="aura-float-card aura-float-member" data-float-card="4">
        <CheckCircle2 size={18}/>
        <p>Member experience</p>
        <small>Culture Studio · Learning · ALMA</small>
      </Link>

      <Link href="/education" className="aura-float-card aura-float-learning" data-float-card="5">
        <BookOpen size={18}/>
        <div><p>Learning Library</p><small>Lessons, notes & resources</small></div>
      </Link>

      <Link href="/private-advisory" className="aura-float-card aura-float-coaching" data-float-card="6">
        <MessageCircle size={18}/>
        <div><p>Coaching with Susan</p><small>For coaches & leaders</small></div>
      </Link>
    </div>
  );
}
