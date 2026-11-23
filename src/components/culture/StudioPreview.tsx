"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Compass, Feather, MoveUpRight } from "lucide-react";

type View = "calendar" | "insights" | "writing";
const views = [
  { id: "calendar" as const, label: "Culture Calendar", number: "01", icon: CalendarDays },
  { id: "insights" as const, label: "Culture Insights", number: "02", icon: Compass },
  { id: "writing" as const, label: "Writing Guide", number: "03", icon: Feather },
];

export default function StudioPreview() {
  const [view, setView] = useState<View>("calendar");
  const [day, setDay] = useState(3);
  return (
    <div className="ph-studio">
      <aside className="ph-studio-rail">
        <span className="ph-overline">INSIDE THE STUDIO</span>
        <div className="ph-studio-tabs" role="tablist" aria-label="Preview culture tools">
          {views.map(item => (
            <button
              key={item.id} type="button" role="tab" aria-selected={view === item.id}
              className={"ph-studio-tab" + (view === item.id ? " is-current" : "")}
              onClick={() => setView(item.id)}
            >
              <item.icon size={20} strokeWidth={1.4}/>
              <span>{item.label}</span>
              <small>{item.number}</small>
            </button>
          ))}
        </div>
        <p className="ph-studio-rail-note">A considered space to practice, not another place to scroll.</p>
      </aside>
      <div className="ph-studio-page" role="tabpanel">
        <div className="ph-studio-page-top"><span>THE CULTURE STUDIO</span><span>PREVIEW <span className="ph-status-dot"/></span></div>
        {view === "calendar" && (
          <div className="ph-preview-panel ph-preview-calendar">
            <div className="ph-preview-heading"><span className="ph-overline">PLAN WITH INTENTION</span><h3>Make room for<br/><em>reflection.</em></h3><p>Choose a moment to pause, notice, and ask a better question.</p></div>
            <div className="ph-calendar-strip" aria-label="Select a sample day">{["M","T","W","T","F","S","S"].map((d,i) => <button key={i} type="button" aria-label={"Sample day " + (i+1)} aria-pressed={day===i} onClick={()=>setDay(i)} className={day===i?"selected":""}><span>{d}</span><strong>{i+11}</strong></button>)}</div>
            <div className="ph-preview-note"><span className="ph-overline">A QUESTION FOR YOUR PRACTICE</span><p>{day===3?"Whose perspective haven't I invited into this conversation?":"What could I learn by listening before offering a solution?"}</p><span className="ph-preview-note-rule"/></div>
          </div>
        )}
        {view === "insights" && (
          <div className="ph-preview-panel ph-preview-insights"><span className="ph-overline">LESSON 01 / LISTENING</span><h3>Understanding<br/>comes <em>first.</em></h3><p className="ph-preview-reading">Culture shows up in what we notice, what we assume, and the questions we choose to ask. It asks us to look beyond a single story.</p>
            <div className="ph-insight-divider"/>
            <div className="ph-insight-question"><span>01</span><p>What assumptions am I carrying into this conversation?</p></div>
            <div className="ph-insight-question"><span>02</span><p>How might another person experience the same situation differently?</p></div>
          </div>
        )}
        {view === "writing" && (
          <div className="ph-preview-panel ph-preview-writing"><span className="ph-overline">THE WRITING TABLE</span><h3>Begin with<br/><em>your story.</em></h3><div className="ph-writing-paper"><div className="ph-writing-paper-top"><span>CHAPTER ONE</span><Feather size={19} strokeWidth={1.2}/></div><h4>The story that<br/>started it all</h4><div className="ph-writing-lines"><i/><i/><i/><i/></div><p>What did you experience that changed the way you see other people?</p></div></div>
        )}
        <div className="ph-studio-page-bottom"><span>SELECT A TOOL ABOVE TO EXPLORE</span><Link href="/login?next=/dashboard/culture">Open member workspace <MoveUpRight size={14}/></Link></div>
      </div>
    </div>
  );
}
