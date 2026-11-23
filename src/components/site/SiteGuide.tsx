"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";

type ChatLine = { from: "guide" | "visitor"; text: string };
const starters = [
  "What is Culture Studio?",
  "How can I work with Susan?",
  "What is ALMA?",
  "How do I access courses?",
];
function responseFor(question: string) {
  const value=question.toLowerCase();
  if (/calendar|culture|insight|book|writing/.test(value)) return {text:"Culture Studio introduces a reflection calendar, culture-informed coaching prompts, and a guided book outline. Members can open these tools in their workspace.",url:"/culture",label:"Explore Culture Studio"};
  if (/coach|susan|consult|meeting|schedule/.test(value)) return {text:"Susan offers private coaching and conversations about professional growth and culture-informed leadership. You can request a session through the consultation page.",url:"/consultation",label:"Book a conversation"};
  if (/alma|ai|chat|assistant|purityos/.test(value)) return {text:"ALMA is the member AI reflection assistant within PurityOS. Access requires an eligible account and an active service connection. Learn how it is intended to support coaching and writing.",url:"/purityos",label:"Explore ALMA"};
  if (/course|learn|lesson|class|education/.test(value)) return {text:"Purity of Hearts has an education platform with lessons and learning tools. Culture Studio is a separate learning workspace for coaches and writers.",url:"/education",label:"See education"};
  if (/pay|stripe|price|cost|buy|enroll|member|sign in|login/.test(value)) return {text:"Member features require an account. Payment and access availability are confirmed through the enrollment flow; the guide cannot process payments or quote a price.",url:"/login",label:"Member login"};
  return {text:"I’m a guided site helper, not a live AI chat. I can point you toward culture tools, courses, ALMA, or a conversation with Susan.",url:"/consultation",label:"Contact Susan"};
}

export default function SiteGuide() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState<ChatLine[]>([{from:"guide",text:"Welcome to Purity of Hearts. What would you like to explore?"}]);
  const [link,setLink]=useState<{url:string;label:string}|null>(null);
  if (pathname.startsWith("/dashboard")||pathname.startsWith("/purityos/chat")||pathname.startsWith("/login")) return null;
  function ask(question: string) {
    const trimmed=question.trim().slice(0,350);
    if(!trimmed)return;
    const answer=responseFor(trimmed);
    setMessages((previous): ChatLine[] => [...previous,{from:"visitor" as const,text:trimmed},{from:"guide" as const,text:answer.text}].slice(-12));
    setLink({url:answer.url,label:answer.label});
    setInput("");
    setOpen(true);
  }
  function submit(event: FormEvent<HTMLFormElement>) {event.preventDefault();ask(input);}
  return (
    <div className="fixed bottom-4 right-4 z-[120] sm:bottom-6 sm:right-6">
      {open&&<section aria-label="Purity site guide" className="mb-3 flex max-h-[min(68vh,580px)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-[1.5rem] border border-[#8AB0A9]/25 bg-[#FEFEFE] text-[#1B3C57] shadow-[0_25px_90px_rgba(12,36,49,.25)]">
        <div className="flex items-center justify-between bg-[#1B3C57] px-5 py-4 text-white"><div className="flex items-center gap-2"><MessageCircle size={18} className="text-[#CCB074]"/><div><p className="text-sm font-semibold">Purity guide</p><p className="mt-0.5 text-[10px] text-white/55">Guided help · not live AI</p></div></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close guide" className="rounded-full p-2 hover:bg-white/10"><X size={18}/></button></div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">{messages.map((message,i)=><p key={i} className={message.from==="visitor"?"ml-10 rounded-2xl rounded-tr-sm bg-[#E8F0ED] p-3 text-xs leading-6":"mr-8 rounded-2xl rounded-tl-sm bg-[#F2F3EF] p-3 text-xs leading-6"}>{message.text}</p>)}
          {link&&<Link href={link.url} onClick={()=>setOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-4 py-2.5 text-xs font-semibold text-[#1B3C57]">{link.label}<ArrowRight size={13}/></Link>}</div>
        <div className="border-t border-[#1B3C57]/10 p-4"><div className="mb-3 flex flex-wrap gap-1.5">{starters.slice(0,3).map(p=><button key={p} type="button" onClick={()=>ask(p)} className="rounded-full border border-[#1B3C57]/15 px-2.5 py-1.5 text-[10px] text-[#1B3C57]/75 hover:bg-[#E8F0ED]">{p}</button>)}</div>
          <form onSubmit={submit} className="flex items-center gap-2"><input value={input} onChange={e=>setInput(e.target.value)} maxLength={350} aria-label="Ask the site guide" placeholder="Ask about the platform..." className="min-w-0 flex-1 rounded-full border border-[#1B3C57]/15 px-4 py-3 text-xs outline-none focus:border-[#648C85]"/><button type="submit" disabled={!input.trim()} aria-label="Send question" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C57] text-white disabled:opacity-40"><Send size={16}/></button></form>
        </div>
      </section>}
      <button type="button" onClick={()=>setOpen(!open)} aria-label={open?"Close site guide":"Open site guide"} aria-expanded={open} className="ml-auto flex items-center gap-2 rounded-full bg-[#1B3C57] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(12,36,49,.3)] transition hover:bg-[#315770]">
        {open?<X size={18}/>:<MessageCircle size={18} className="text-[#CCB074]"/>}{open?"Close":"Ask Purity"}
      </button>
    </div>
  );
}
