import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Compass, Feather, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Culture Studio | Learning Tools for Coaches",
  description: "Explore the Culture Calendar, Culture Insights, and Book Writing Guide with Purity of Hearts. Culture-centered coaching tools for thoughtful leaders and writers.",
};

const tools = [
  { id: "calendar", icon: CalendarDays, number: "01", title: "Culture Calendar", subtitle: "A rhythm for intentional learning", description: "Choose a date, plan a coaching reflection, and track the conversations you want to have. The calendar is a personal planning tool — not an authoritative list of cultural holidays.", examples: ["What traditions or practices matter to this community?", "Who should be part of the conversation?", "What will you listen for and learn?"] },
  { id: "insights", icon: Compass, number: "02", title: "Culture Insights", subtitle: "Questions before conclusions", description: "Explore themes like identity, belonging, communication, context, and power. Each theme comes with practical coaching questions and reflection exercises.", examples: ["What assumptions am I bringing?", "Whose perspective may be missing?", "How will I check my understanding?"] },
  { id: "writing", icon: Feather, number: "03", title: "Book Writing Guide", subtitle: "Make space for your story", description: "Outline chapters, choose your reader, and reflect on how your lived experience informs your message without speaking for an entire group.", examples: ["Who am I writing for?", "Which experiences are mine to tell?", "What do I want the reader to practice?"] },
];

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-[#FEFEFE] text-[#1B3C57]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#E8F0ED] px-5 pb-20 pt-20 sm:px-8 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-44 -top-60 h-[40rem] w-[40rem] rounded-full border border-[#1B3C57]/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex max-w-3xl items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]"><Sparkles size={16}/> Purity of Hearts · Culture Studio</div>
          <h1 className="mt-7 max-w-4xl text-[clamp(3.2rem,6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.065em]">Understand more. <span className="text-[#648C85]">Coach better.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#1B3C57]/70 sm:text-lg">One place to study culture, plan intentional conversations, and develop your voice as a coach or writer. Built around reflection, context, and thoughtful action.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/login?next=/dashboard/culture" className="inline-flex items-center gap-2 rounded-full bg-[#1B3C57] px-7 py-4 text-sm font-semibold text-white hover:bg-[#2B526B]">Open member tools <ArrowRight size={16}/></Link>
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full border border-[#1B3C57]/20 bg-white/70 px-7 py-4 text-sm font-semibold">Talk with Susan <ArrowUpRight size={16}/></Link>
          </div>
          <p className="mt-5 text-xs text-[#1B3C57]/60">Member tools require an eligible account. The previews below show the learning approach.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Three ways to learn</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">A toolkit with purpose.</h2></div>
          <p className="max-w-md text-sm leading-7 text-[#1B3C57]/65">Use each space on its own, or move between them as you learn, teach, and write.</p>
        </div>
        <div className="mt-12 space-y-6">
          {tools.map((tool,index)=>(
            <article id={tool.id} key={tool.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#1B3C57]/10 bg-[#F7F8F5]">
              <div className="grid lg:grid-cols-[1fr_.86fr]">
                <div className="p-8 sm:p-12">
                  <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3C57] text-[#CCB074]"><tool.icon size={23}/></span><span className="text-xs tracking-[0.24em] text-[#648C85]">{tool.number} / CULTURE STUDIO</span></div>
                  <h3 className="mt-8 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">{tool.title}</h3><p className="mt-3 text-sm font-semibold text-[#648C85]">{tool.subtitle}</p><p className="mt-6 max-w-xl text-sm leading-8 text-[#1B3C57]/70">{tool.description}</p>
                  <Link href="/login?next=/dashboard/culture" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3C57] underline decoration-[#CCB074] underline-offset-8">Try the member tool <ArrowRight size={15}/></Link>
                </div>
                <div className={index===1?"flex flex-col justify-center bg-[#1B3C57] p-8 text-white sm:p-12":index===2?"flex flex-col justify-center bg-[#CCB074] p-8 text-[#1B3C57] sm:p-12":"flex flex-col justify-center bg-[#8AB0A9] p-8 text-[#1B3C57] sm:p-12"}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">Practice prompts</p>
                  <div className="mt-6 space-y-3">{tool.examples.map((text,i)=><div key={text} className="flex items-start gap-4 rounded-2xl border border-current/10 bg-white/10 px-5 py-4"><span className="text-sm font-semibold opacity-70">0{i+1}</span><p className="text-sm leading-6">{text}</p></div>)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#102B40] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_.9fr] md:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Your reflection companion</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Meet ALMA.</h2><p className="mt-5 max-w-xl text-base leading-8 text-white/65">Inside the member experience, ALMA helps you brainstorm reflection questions, structure chapters, and think through coaching situations. It is an AI assistant, not a substitute for lived experience or qualified cultural expertise.</p><Link href="/purityos" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57]">Explore ALMA <ArrowRight size={16}/></Link></div>
          <div className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 sm:p-10"><div className="flex items-center gap-3"><MessageCircle className="text-[#CCB074]"/><span className="text-sm font-semibold">Example reflection</span></div><p className="mt-8 rounded-2xl bg-[#8AB0A9] px-5 py-4 text-sm leading-7 text-[#1B3C57]">“Help me develop five open-ended coaching questions about belonging without making assumptions.”</p><p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-white/65">Start by inviting a person’s own definition of belonging. Ask what support or practices they find meaningful, and listen for what you may not yet understand.</p><p className="mt-5 text-xs text-white/45">Illustrative example, not a live AI response.</p></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-[#1B3C57]/10 bg-[#F7F8F5] p-8 md:grid-cols-[.9fr_1.1fr] md:items-center sm:p-12">
          <div className="flex h-52 items-center justify-center rounded-[1.6rem] bg-[#E8F0ED]"><BookOpen size={74} strokeWidth={1.2} className="text-[#648C85]"/></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Learn with care</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Culture is lived, not a checklist.</h2><p className="mt-5 text-sm leading-8 text-[#1B3C57]/65">The studio encourages curiosity, context, and listening. It does not claim to define an entire culture, replace community knowledge, or provide verified holiday listings.</p><Link href="/private-advisory" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore coaching with Susan <ArrowRight size={16}/></Link></div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
