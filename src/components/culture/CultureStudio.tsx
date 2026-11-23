"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDownToLine, ArrowRight, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Compass, Feather, MessageCircle, Save, Trash2 } from "lucide-react";

type Tab = "calendar" | "insights" | "writing";
type BookDraft = { title: string; audience: string; purpose: string; chapters: Record<string, string> };
const chapterPrompts = [
  { id: "opening", title: "1 · The story behind the work", prompt: "Begin with a scene or moment that shaped your understanding. What changed for you?" },
  { id: "context", title: "2 · Culture, context & experience", prompt: "What can you speak to from your own experience? Where should you invite other perspectives?" },
  { id: "learning", title: "3 · What I had to unlearn", prompt: "Name an assumption you questioned. What evidence or conversation challenged it?" },
  { id: "practice", title: "4 · Coaching in practice", prompt: "Describe a question or exercise a reader could actually try. Avoid making promises for everyone." },
  { id: "invitation", title: "5 · An invitation to grow", prompt: "What do you want the reader to notice, ask, or practice after finishing your book?" },
];
const themes = [
  { title: "Listening across difference", area: "Communication", summary: "Listen for the meaning behind words and make space for perspectives that differ from your own.", questions: ["What would help this person feel heard?", "Which part of their meaning should I check before responding?", "Am I listening to understand or to solve?"], exercise: "In your next coaching conversation, summarize what you heard and ask whether you understood it correctly before offering advice." },
  { title: "Belonging & psychological safety", area: "Belonging", summary: "Explore what supports participation and whether people feel able to speak without undue fear.", questions: ["Who feels comfortable speaking here?", "What happens when someone disagrees?", "What would belonging look like to this person?"], exercise: "Invite someone to describe one change that would make participation easier. Do not assume you already know the answer." },
  { title: "Identity without assumptions", area: "Awareness", summary: "Avoid treating one person's experience as a definition of an entire culture or community.", questions: ["What am I assuming based on a label?", "Which aspects of identity matter to the person themselves?", "How might context change the situation?"], exercise: "Write down an assumption you have heard. Rewrite it as an open-ended question that invites the other person's own account." },
  { title: "Power & voice", area: "Leadership", summary: "Notice how roles, history, and decision-making authority influence who is heard and who participates.", questions: ["Who gets to define the problem?", "Whose input is missing from the decision?", "How will feedback change the outcome?"], exercise: "Map stakeholders in one decision. Identify a person who has little formal power but meaningful lived experience, and invite their input." },
  { title: "Traditions & community context", area: "Context", summary: "Learn about practices by asking local people and checking reliable sources rather than relying on shortcuts.", questions: ["What is the context of this tradition?", "Whom could I ask respectfully?", "What should I verify before teaching it?"], exercise: "Choose a practice relevant to your community. Research its context, then make note of what remains uncertain." },
  { title: "Coaching with humility", area: "Practice", summary: "Approach each coaching relationship as a collaboration rather than a claim to know another person's identity.", questions: ["What does this person want from coaching?", "How should I adapt to their goals?", "What is mine to guide, and what is theirs to decide?"], exercise: "Co-create a coaching agreement that includes how you will handle misunderstandings and feedback." },
];
const emptyBook: BookDraft = { title: "", audience: "", purpose: "", chapters: {} };
const formatKey = (date: Date) => [date.getFullYear(), String(date.getMonth()+1).padStart(2, "0"), String(date.getDate()).padStart(2,"0")].join("-");
const beginningOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const formatMonth = (date: Date) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function encodeIcs(text: string) { return text.replace(/\\/g, "\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"); }

export default function CultureStudio({ userId }: { userId: string }) {
  const [tab, setTab] = useState<Tab>("calendar");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [date, setDate] = useState(() => formatKey(new Date()));
  const [notes, setNotes] = useState<Record<string,string>>({});
  const [noteDraft, setNoteDraft] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [book, setBook] = useState<BookDraft>(emptyBook);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("purity-culture-calendar-v1:" + userId);
      const storedBook = localStorage.getItem("purity-culture-book-v1:" + userId);
      if (storedNotes) {
        const value = JSON.parse(storedNotes);
        if (value && typeof value === "object" && !Array.isArray(value)) setNotes(value);
      }
      if (storedBook) {
        const value = JSON.parse(storedBook);
        if (value && typeof value === "object") setBook({ ...emptyBook, ...value, chapters: value.chapters || {} });
      }
    } catch { /* Private browsing may prevent persistent storage. */ }
    setLoaded(true);
  }, [userId]);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("purity-culture-calendar-v1:" + userId, JSON.stringify(notes)); } catch { /* Export remains available. */ }
  }, [notes, loaded, userId]);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("purity-culture-book-v1:" + userId, JSON.stringify(book)); } catch { /* Export remains available. */ }
  }, [book, loaded, userId]);
  useEffect(() => { setNoteDraft(notes[date] || ""); setSaved(false); }, [notes, date]);

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay()+6)%7;
    const count = new Date(month.getFullYear(), month.getMonth()+1,0).getDate();
    return Array.from({length:Math.ceil((count+offset)/7)*7},(_,i)=>{
      const day=i-offset+1;
      if(day<1||day>count) return null;
      const value=new Date(month.getFullYear(),month.getMonth(),day);
      return {day,key:formatKey(value)};
    });
  },[month]);
  const selectedTheme=themes[themeIndex];
  const selectedChapter=chapterPrompts[chapterIndex];

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotes((previous)=> {
      const next={...previous};
      if (noteDraft.trim()) next[date]=noteDraft.trim();
      else delete next[date];
      return next;
    });
    setSaved(true);
  }
  function exportCalendar() {
    const events = Object.entries(notes).filter(([,value])=>value.trim()).sort(([a],[b])=>a.localeCompare(b)).flatMap(([day,value])=>{
      const [year,m,d]=day.split("-").map(Number);
      const next=beginningOfDay(new Date(year,m-1,d+1));
      return ["BEGIN:VEVENT","UID:"+day+"-purity-culture@purityofhearts","DTSTAMP:"+formatKey(new Date()).replace(/-/g,"")+"T120000Z","DTSTART;VALUE=DATE:"+day.replace(/-/g,""),"DTEND;VALUE=DATE:"+formatKey(next).replace(/-/g,""),"SUMMARY:Culture reflection","DESCRIPTION:"+encodeIcs(value),"END:VEVENT"];
    });
    downloadFile("culture-calendar.ics", ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Purity of Hearts//Culture Studio//EN","CALSCALE:GREGORIAN",...events,"END:VCALENDAR"].join("\r\n"),"text/calendar;charset=utf-8");
  }
  function exportBook() {
    const content = ["# "+(book.title.trim()||"My Culture & Coaching Book"),"","**Intended reader:** "+(book.audience.trim()||"To define"),"","**Purpose:** "+(book.purpose.trim()||"To define"),"",
      ...chapterPrompts.flatMap(chapter=>["## "+chapter.title,"",book.chapters[chapter.id]||"_Draft your thoughts here._",""])].join("\n");
    downloadFile("my-culture-book-outline.md",content,"text/markdown;charset=utf-8");
  }
  const almaLink = (prompt: string) => "/purityos/chat?prompt="+encodeURIComponent(prompt.slice(0,600));

  return (
    <div className="mx-auto max-w-7xl pb-16 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-[#1B3C57] p-6 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Member workspace · Culture Studio</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">Your practice, in progress.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">Plan thoughtful conversations, study culture with curiosity, and develop your book — all from one workspace.</p></div>
          <Link href="/purityos/chat" className="inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-5 py-3 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#DCC78F]"><MessageCircle size={16}/> Open ALMA</Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Culture Studio tools">
          {([{id:"calendar",label:"Culture Calendar",icon:CalendarDays},{id:"insights",label:"Culture Insights",icon:Compass},{id:"writing",label:"Book Writing",icon:Feather}] as const).map(item=><button key={item.id} type="button" role="tab" aria-selected={tab===item.id} onClick={()=>setTab(item.id)} className={tab===item.id?"inline-flex items-center gap-2 rounded-full bg-[#8AB0A9] px-5 py-3 text-xs font-semibold text-[#102B40]":"inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-medium text-white/70 hover:bg-white/10"}><item.icon size={15}/>{item.label}</button>)}
        </div>
      </div>
      {tab==="calendar"&& <section className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-[#15354C] p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8AB0A9]">Culture calendar</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em]">{formatMonth(month)}</h2></div>
            <div className="flex gap-2"><button type="button" aria-label="Previous month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))} className="rounded-full border border-white/20 p-2 hover:bg-white/10"><ChevronLeft size={19}/></button>
            <button type="button" aria-label="Next month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))} className="rounded-full border border-white/20 p-2 hover:bg-white/10"><ChevronRight size={19}/></button></div>
          </div>
          <div className="mt-8 grid grid-cols-7 gap-1.5 sm:gap-2">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=><span key={day} className="pb-3 text-center text-[10px] font-medium text-white/50">{day}</span>)}
            {days.map((item,i)=>item?<button key={item.key} type="button" onClick={()=>setDate(item.key)} aria-pressed={date===item.key} className={date===item.key?"relative flex min-h-11 flex-col items-center justify-center rounded-xl bg-[#CCB074] text-sm font-semibold text-[#1B3C57] sm:min-h-14":"relative flex min-h-11 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/75 transition hover:border-[#8AB0A9] sm:min-h-14"}>
              {item.day}{notes[item.key]&&<span aria-label="Note saved" className={date===item.key?"absolute bottom-1.5 h-1 w-1 rounded-full bg-[#1B3C57]":"absolute bottom-1.5 h-1 w-1 rounded-full bg-[#CCB074]"}/>}</button>:<span key={"empty"+i}/>)}
          </div>
          <button type="button" onClick={exportCalendar} disabled={Object.values(notes).every(value=>!value.trim())} className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#CCB074] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"><ArrowDownToLine size={15}/> Export your saved reflections as calendar file (.ics)</button>
        </div>
        <form onSubmit={saveNote} className="flex flex-col rounded-[1.8rem] border border-white/10 bg-[#15354C] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CCB074]">Your reflection</p><h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{new Intl.DateTimeFormat("en-US",{dateStyle:"long"}).format(new Date(date+"T12:00:00"))}</h2>
          <p className="mt-3 text-sm leading-7 text-white/55">Plan a discussion, a coaching observation, or something you want to research. These are your notes — not automatic cultural observances.</p>
          <label htmlFor="culture-note" className="mt-8 text-xs font-semibold text-white/80">What would you like to explore?</label>
          <textarea id="culture-note" value={noteDraft} onChange={event=>{setNoteDraft(event.target.value);setSaved(false);}} rows={6} maxLength={2000} placeholder="Whose perspective should I invite? What will I listen for?" className="mt-3 min-h-[170px] w-full resize-y rounded-2xl border border-white/15 bg-[#102B40] p-4 text-sm leading-7 text-white outline-none placeholder:text-white/30 focus:border-[#CCB074]"/>
          <div className="mt-5 flex flex-wrap gap-3"><button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#8AB0A9] px-5 py-3 text-xs font-semibold text-[#102B40]"><Save size={15}/> Save reflection</button><button type="button" onClick={()=>{setNoteDraft("");setNotes(previous=>{const next={...previous};delete next[date];return next;});}} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-xs text-white/70"><Trash2 size={14}/> Clear</button></div>
          {saved&&<p role="status" className="mt-4 inline-flex items-center gap-2 text-xs text-[#8AB0A9]"><Check size={14}/> Saved to this browser</p>}
        </form>
      </section>}
      {tab==="insights"&&<section className="mt-6 grid gap-5 xl:grid-cols-[.75fr_1.25fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-[#15354C] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CCB074]">Explore a theme</p>
          <div className="mt-7 space-y-2">{themes.map((theme,index)=><button key={theme.title} type="button" onClick={()=>setThemeIndex(index)} className={themeIndex===index?"w-full rounded-2xl bg-[#8AB0A9] px-5 py-4 text-left text-sm font-semibold text-[#102B40]":"w-full rounded-2xl border border-white/10 px-5 py-4 text-left text-sm text-white/75 hover:bg-white/5"}>{theme.title}</button>)}</div>
        </div>
        <div className="rounded-[1.8rem] border border-white/10 bg-[#15354C] p-6 sm:p-9">
          <span className="inline-block rounded-full bg-[#CCB074]/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#CCB074]">{selectedTheme.area}</span>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em]">{selectedTheme.title}</h2><p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">{selectedTheme.summary}</p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6"><h3 className="text-sm font-semibold text-[#CCB074]">Questions to take into coaching</h3><div className="mt-5 space-y-4">{selectedTheme.questions.map((q,i)=><div key={q} className="flex items-start gap-4"><span className="text-xs text-[#8AB0A9]">0{i+1}</span><p className="text-sm leading-7 text-white/80">{q}</p></div>)}</div></div>
          <div className="mt-5 rounded-[1.5rem] bg-[#8AB0A9] p-6 text-[#1B3C57]"><p className="text-xs font-semibold uppercase tracking-[0.18em]">Try this in practice</p><p className="mt-3 text-sm leading-7">{selectedTheme.exercise}</p></div>
          <Link href={almaLink("Help me design a respectful, culture-informed coaching exercise about "+selectedTheme.title+". Ask me about the group and context before making recommendations. Avoid stereotypes.")} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#CCB074]">Explore this with ALMA <ArrowRight size={16}/></Link>
        </div>
      </section>}
      {tab==="writing"&&<section className="mt-6 grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-[#15354C] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CCB074]">Your book foundation</p>
          <label className="mt-7 block text-xs font-semibold text-white/70" htmlFor="book-title">Working title</label>
          <input id="book-title" value={book.title} onChange={e=>setBook(b=>({...b,title:e.target.value}))} maxLength={140} placeholder="What will you call your book?" className="mt-2 w-full rounded-xl border border-white/15 bg-[#102B40] px-4 py-3 text-sm text-white outline-none focus:border-[#CCB074]"/>
          <label className="mt-5 block text-xs font-semibold text-white/70" htmlFor="book-reader">Who is this book for?</label>
          <textarea id="book-reader" value={book.audience} onChange={e=>setBook(b=>({...b,audience:e.target.value}))} maxLength={500} rows={3} placeholder="Describe the reader you want to serve." className="mt-2 w-full rounded-xl border border-white/15 bg-[#102B40] px-4 py-3 text-sm text-white outline-none focus:border-[#CCB074]"/>
          <label className="mt-5 block text-xs font-semibold text-white/70" htmlFor="book-purpose">What change do you hope to inspire?</label>
          <textarea id="book-purpose" value={book.purpose} onChange={e=>setBook(b=>({...b,purpose:e.target.value}))} maxLength={500} rows={3} placeholder="What question or action should readers take away?" className="mt-2 w-full rounded-xl border border-white/15 bg-[#102B40] px-4 py-3 text-sm text-white outline-none focus:border-[#CCB074]"/>
          <p className="mt-6 text-xs leading-6 text-white/45">Draft text auto-saves in this browser. Export regularly to keep a copy.</p>
          <button type="button" onClick={exportBook} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-5 py-3 text-xs font-semibold text-[#102B40]"><ArrowDownToLine size={15}/> Export manuscript outline</button>
        </div>
        <div className="rounded-[1.8rem] border border-white/10 bg-[#15354C] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8AB0A9]">Chapter by chapter</p>
          <div className="mt-5 flex flex-wrap gap-2">{chapterPrompts.map((chapter,i)=><button type="button" key={chapter.id} onClick={()=>setChapterIndex(i)} aria-pressed={chapterIndex===i} className={chapterIndex===i?"h-10 w-10 rounded-full bg-[#8AB0A9] text-sm font-semibold text-[#102B40]":"h-10 w-10 rounded-full border border-white/20 text-sm text-white/75 hover:bg-white/10"}>{i+1}</button>)}</div>
          <h2 className="mt-7 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{selectedChapter.title}</h2><p className="mt-3 text-sm leading-7 text-white/55">{selectedChapter.prompt}</p>
          <label htmlFor="chapter-draft" className="mt-7 block text-xs font-semibold text-[#CCB074]">Your notes or first draft</label>
          <textarea id="chapter-draft" rows={13} value={book.chapters[selectedChapter.id]||""} onChange={e=>setBook(b=>({...b,chapters:{...b.chapters,[selectedChapter.id]:e.target.value}}))} placeholder="Write freely. You can revise your voice and structure later." className="mt-3 w-full resize-y rounded-2xl border border-white/15 bg-[#102B40] p-5 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-[#CCB074]"/>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><span className="text-xs text-white/45">{(book.chapters[selectedChapter.id]||"").trim().split(/\s+/).filter(Boolean).length} words</span><Link href={almaLink("Help me outline a thoughtful culture-centered coaching book chapter titled '"+selectedChapter.title+"'. Ask me for my own experiences, intended reader, and sources; do not invent events or speak for other cultures.")} className="inline-flex items-center gap-2 text-xs font-semibold text-[#CCB074]"><MessageCircle size={15}/> Think it through with ALMA</Link></div>
        </div>
      </section>}
      <div className="mt-6 flex flex-col gap-3 rounded-[1.4rem] border border-[#CCB074]/20 bg-[#CCB074]/10 p-5 text-xs leading-6 text-white/60 md:flex-row md:items-center md:justify-between">
        <p><strong className="text-[#CCB074]">Early workspace preview.</strong> Notes and book drafts are stored locally in this browser, not synced between phone and laptop. Export important work. Cultural insights are reflective prompts, not authoritative cultural facts.</p>
        <Link href="/culture" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#CCB074]">About the studio <ArrowRight size={14}/></Link>
      </div>
    </div>
  );
}
