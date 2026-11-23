import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Compass, Feather, LockKeyhole, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandMark from "@/components/brand/BrandMark";
import PurityWaitlistForm from "@/components/purityos/PurityWaitlistForm";

export const metadata = {
  title: "ALMA | A Thoughtful AI Companion",
  description: "ALMA by Purity of Hearts is a member AI reflection companion for culture-informed coaching, learning, book writing, and purposeful leadership.",
};

const examples = [
  { icon: Compass, title: "Understand a coaching situation", prompt: "Help me look at this conversation from different perspectives without making assumptions." },
  { icon: CalendarDays, title: "Plan a month of reflection", prompt: "Help me create a culture reflection calendar for my coaching community." },
  { icon: Feather, title: "Shape the next chapter", prompt: "Help me outline a chapter of my book using my experience and my readers' needs." },
];

export default function PurityOSPage() {
  return (
    <main className="min-h-screen bg-[#102B40] text-white">
      <Navbar dark />
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-44 -top-56 h-[45rem] w-[45rem] rounded-full border border-[#8AB0A9]/15" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCB074]"><Sparkles size={17}/> Purity of Hearts · ALMA</p>
            <h1 className="mt-8 text-[clamp(3.4rem,6vw,6rem)] font-semibold leading-[0.97] tracking-[-0.06em]">A thoughtful mind. <span className="text-[#CCB074]">A place to grow.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/65 sm:text-lg">Meet ALMA, a private AI reflection partner for coaches, educators, and writers. Explore culture, think through conversations, and develop ideas with more clarity.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B4D1CA]">Powered by AI. Grounded in reflection, care, and the belief that better questions lead to better decisions.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/purityos/chat" className="inline-flex items-center gap-2 rounded-full bg-[#CCB074] px-7 py-4 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#DBC68F]">Member chat <ArrowRight size={16}/></Link>
              <Link href="/culture" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold">Explore Culture Studio</Link>
            </div>
            <p className="mt-6 text-xs leading-6 text-white/45">ALMA chat requires an eligible account and an active service connection. It is not a professional cultural assessment or a substitute for qualified advice.</p>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-white/15 bg-[#1B3C57] p-5 shadow-[0_45px_110px_rgba(5,20,32,.42)] sm:p-7">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6"><BrandMark size={46} /><div><p className="text-sm font-semibold">ALMA</p><p className="mt-1 text-xs text-white/45">Culture · Coaching · Writing</p></div><span className="ml-auto rounded-full border border-[#CCB074]/30 px-3 py-1.5 text-[10px] text-[#CCB074]">MEMBER AI</span></div>
            <div className="mt-7 space-y-4">
              <p className="mr-10 rounded-2xl rounded-tl-md border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">What are you trying to understand, and whose perspective might be missing?</p>
              <p className="ml-8 rounded-2xl rounded-tr-md bg-[#8AB0A9] p-5 text-sm leading-7 text-[#102B40]">I’m preparing a workshop for coaches who serve people from different backgrounds.</p>
              <p className="mr-8 rounded-2xl rounded-tl-md border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">Begin by defining the community and context. Then invite participants to share how they describe their own experiences.</p>
            </div>
            <p className="mt-7 text-right text-[10px] text-white/35">Illustrative conversation · not a live response</p>
          </div>
        </div>
      </section>
      <section className="bg-[#FEFEFE] px-5 py-20 text-[#1B3C57] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Designed for your work</p><h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-5xl">The companion for curious coaches and creators.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{examples.map(item=><article key={item.title} className="rounded-[1.8rem] border border-[#1B3C57]/10 bg-[#F7F8F5] p-8"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3C57] text-[#CCB074]"><item.icon size={22}/></span><h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#1B3C57]/60">“{item.prompt}”</p><Link href={"/purityos/chat?prompt="+encodeURIComponent(item.prompt)} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#648C85]">Explore in member chat <ArrowRight size={15}/></Link></article>)}</div>
        </div>
      </section>
      <section className="bg-[#E8F0ED] px-5 py-20 text-[#1B3C57] sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648C85]">Culture Studio + ALMA</p><h2 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-5xl">Tools to practice. A partner to think with.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[#1B3C57]/65">Use the calendar to plan your observations, culture insights to shape better questions, and the writing guide to develop your own book. Ask ALMA for prompts and guidance along the way.</p><Link href="/culture" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B3C57] px-6 py-3.5 text-sm font-semibold text-white">Discover the studio <ArrowRight size={16}/></Link></div>
          <div className="space-y-3">{[{icon:CalendarDays,title:"Culture Calendar",body:"Build your own learning rhythm."},{icon:BookOpen,title:"Culture Insights",body:"Study context and practical coaching questions."},{icon:Feather,title:"Book Writing Guide",body:"Organize your experience into chapters."}].map(item=><div key={item.title} className="flex items-center gap-5 rounded-[1.3rem] bg-white px-6 py-5"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8AB0A9]/25 text-[#1B3C57]"><item.icon size={22}/></span><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-[#1B3C57]/60">{item.body}</p></div></div>)}</div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/15 bg-[#1B3C57] p-7 md:grid-cols-[1fr_.8fr] md:items-center sm:p-12">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Access updates</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">A new way to learn is taking shape.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/60">Get news about ALMA and upcoming member experiences. Subscribing to updates does not purchase a membership or guarantee access.</p></div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-7"><PurityWaitlistForm dark /></div>
        </div>
      </section>
      <Footer dark />
    </main>
  );
}
