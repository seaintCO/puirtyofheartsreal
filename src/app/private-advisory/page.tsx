import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check,
  Compass, Feather, HeartHandshake, MessageCircle, UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandMark from "@/components/brand/BrandMark";

export const metadata = {
  title: "Coaching for Coaches | Work with Susan Wagner",
  description: "Explore Susan Wagner's culture-centered approach to coaching coaches, leadership, learning, and authentic book writing with Purity of Hearts.",
};

const approaches = [
  { icon: Compass, num: "01", title: "Understanding culture", copy: "Consider how context, identity, and lived experience shape communication, expectations, and the way people learn." },
  { icon: MessageCircle, num: "02", title: "The art of asking", copy: "Practice questions that invite reflection without making assumptions or speaking for the people you coach." },
  { icon: HeartHandshake, num: "03", title: "Leading with awareness", copy: "Examine trust, belonging, listening, and how to facilitate conversations where different experiences matter." },
  { icon: BookOpen, num: "04", title: "Teaching what you learn", copy: "Turn ideas into usable coaching exercises, workshops, and learning paths while staying true to your own experience." },
];

const pathways = [
  { title: "For aspiring coaches", copy: "Find your voice, your approach, and the questions that help people think more clearly." },
  { title: "For practicing coaches", copy: "Deepen reflection, strengthen communication, and explore how culture may influence client experiences." },
  { title: "For leaders and educators", copy: "Build more thoughtful conversations and learning experiences within the communities you serve." },
];

export default function PrivateAdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#FEFEFE] text-[#1B3C57]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#E8F0ED] px-5 py-20 sm:px-8 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-60 -top-80 h-[45rem] w-[45rem] rounded-full border border-[#1B3C57]/10" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.07fr_.93fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#567E77]"><UsersRound size={16} /> Coaching for coaches</div>
            <h1 className="mt-7 max-w-4xl text-[clamp(3.2rem,6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.065em]">Become the coach who <span className="text-[#648C85]">listens deeper.</span></h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#1B3C57]/70 sm:text-lg">Work with Susan Wagner to explore culture, communication, leadership, and the way your own experiences shape how you guide others.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/consultation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B3C57] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#315770]">Request a coaching conversation <ArrowUpRight size={16}/></Link>
              <Link href="/culture" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B3C57]/20 bg-white px-7 py-4 text-sm font-semibold">Explore Culture Studio <ArrowRight size={16}/></Link>
            </div>
            <p className="mt-6 text-xs leading-6 text-[#1B3C57]/55">A conversation about fit and availability. Programs and pricing are shared directly by Susan.</p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-[2rem] bg-[#1B3C57] p-6 text-white shadow-[0_35px_90px_rgba(18,50,67,.20)] sm:p-8">
              <div className="flex items-center justify-between"><BrandMark size={48}/><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CCB074]">A coaching framework</span></div>
              <div className="mt-10 space-y-5">
                {["Listen before you interpret.","Understand the context.","Ask the deeper question.","Turn reflection into action."].map((line,i)=><div key={line} className="flex items-start gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"><span className="mt-0.5 text-xs font-semibold text-[#CCB074]">0{i+1}</span><p className="text-lg font-medium tracking-[-0.025em]">{line}</p></div>)}
              </div>
              <div className="mt-10 rounded-[1.3rem] bg-[#8AB0A9] p-5 text-[#102B40]"><p className="text-xs font-semibold uppercase tracking-[0.17em]">A different kind of learning</p><p className="mt-2 text-sm leading-7">Curiosity, reflection, and practical application — not quick labels or one-size-fits-all answers.</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">The approach</p><h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">Culture-informed coaching starts with better questions.</h2><p className="mt-6 text-base leading-8 text-[#1B3C57]/65">No two coaching relationships have the same context. These are the themes you can explore together, not a promise of a standardized certification.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {approaches.map(item=><article key={item.title} className="rounded-[1.8rem] border border-[#1B3C57]/10 bg-[#F7F8F5] p-8 sm:p-10"><div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B3C57] text-[#CCB074]"><item.icon size={22}/></span><span className="text-xs tracking-[0.2em] text-[#648C85]">{item.num}</span></div><h3 className="mt-9 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3><p className="mt-4 max-w-lg text-sm leading-8 text-[#1B3C57]/65">{item.copy}</p></article>)}
        </div>
      </section>
      <section className="bg-[#102B40] px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Who this is for</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Grow your practice, at your stage.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{pathways.map(item=><article key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-7"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#CCB074] text-[#1B3C57]"><Check size={17}/></span><h3 className="mt-7 text-xl font-semibold">{item.title}</h3><p className="mt-4 text-sm leading-7 text-white/60">{item.copy}</p></article>)}</div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center sm:px-8 sm:py-28">
        <div className="flex items-center justify-center rounded-[2rem] bg-[#E8F0ED] px-10 py-16"><div className="w-full max-w-sm space-y-4"><div className="flex items-center justify-between rounded-[1.2rem] bg-[#8AB0A9] px-6 py-5"><CalendarDays size={22}/><span className="text-sm font-semibold">Culture Calendar</span></div><div className="flex items-center justify-between rounded-[1.2rem] bg-[#CCB074] px-6 py-5"><Compass size={22}/><span className="text-sm font-semibold">Culture Insights</span></div><div className="flex items-center justify-between rounded-[1.2rem] bg-[#1B3C57] px-6 py-5 text-white"><Feather size={22}/><span className="text-sm font-semibold">Book Writing Guide</span></div></div></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Beyond the session</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Learning that stays with you.</h2><p className="mt-6 text-base leading-8 text-[#1B3C57]/65">The Culture Studio gives you reflection tools to use between conversations. Plan what to explore, study practical culture-informed questions, and organize your voice into a book outline.</p><Link href="/culture" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B3C57] px-6 py-3.5 text-sm font-semibold text-white">Discover the studio <ArrowRight size={16}/></Link></div>
      </section>
      <section className="bg-[#E8F0ED] px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Work with Susan</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Have a question about your next step?</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#1B3C57]/65">Start with a conversation about what you're working toward and what kind of support would help.</p></div><Link href="/consultation" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1B3C57] px-7 py-4 text-sm font-semibold text-white">Request a conversation <ArrowRight size={16}/></Link></div>
      </section>
      <Footer />
    </main>
  );
}
