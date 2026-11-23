import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Compass, Feather, MessageCircle, Sparkles, UsersRound } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandMark from "@/components/brand/BrandMark";

const offerings = [
  { number: "01", icon: CalendarDays, title: "Culture Calendar", text: "Turn awareness into practice with a monthly rhythm of reflection, observation, and intentional coaching.", href: "/culture#calendar" },
  { number: "02", icon: Compass, title: "Culture Insights", text: "Explore communication, belonging, leadership, and context through practical questions and guided exercises.", href: "/culture#insights" },
  { number: "03", icon: Feather, title: "Book Writing Guide", text: "Shape your experience into a book with chapter frameworks, writing prompts, and room for your own voice.", href: "/culture#writing" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FEFEFE] text-[#1B3C57]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#102B40] px-5 pb-24 pt-16 text-white sm:px-8 sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-44 -top-72 h-[55rem] w-[55rem] rounded-full border border-[#8AB0A9]/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-56 h-[45rem] w-[45rem] rounded-full border border-[#CCB074]/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 left-[-15rem] h-[32rem] w-[32rem] rounded-full bg-[#8AB0A9]/10 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.03fr_.97fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CCB074]/30 bg-[#CCB074]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#E4D4AE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCB074]" /> The next chapter of Purity of Hearts
            </div>
            <h1 className="mt-8 text-[clamp(3.4rem,6.1vw,6.3rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
              Culture shapes<br />how we <span className="text-[#CCB074]">lead.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              A learning home for coaches, leaders, and people ready to understand culture more deeply — then bring that understanding into the conversations that matter.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B8D2CB]">Guided by Susan Wagner. Built for reflection, practical learning, and meaningful growth.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/culture" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CCB074] px-7 py-4 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#DCC78F]">
                Explore Culture Studio <ArrowRight size={16} />
              </Link>
              <Link href="/consultation" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-[#8AB0A9]">
                Coach with Susan <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#CCB074]" /> Designed for coaches</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#CCB074]" /> Culture-informed tools</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#CCB074]" /> A place to keep learning</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#8AB0A9]/25 bg-[#1B3C57] p-4 shadow-[0_40px_120px_rgba(2,14,22,.45)] sm:rounded-[2.5rem] sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 px-2 pb-5">
                <div className="flex items-center gap-3"><BrandMark variant="sage" size={40}/><div><p className="text-sm font-semibold">Culture Studio</p><p className="mt-1 text-[10px] text-white/45">Your learning space · preview</p></div></div>
                <span className="rounded-full border border-[#CCB074]/25 px-3 py-1.5 text-[10px] text-[#CCB074]">PURPOSE + PRACTICE</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-[1.08fr_.92fr]">
                <div className="rounded-[1.5rem] bg-[#8AB0A9] p-5 text-[#102B40]">
                  <CalendarDays size={21} />
                  <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.2em]">Your culture calendar</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Pause. Notice. Listen.</p>
                  <p className="mt-3 text-xs leading-6 text-[#1B3C57]/80">A weekly practice: ask whose perspective you haven’t heard yet.</p>
                  <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px]">
                    {["M","T","W","T","F","S","S"].map((day,index)=><span key={index} className="text-[#1B3C57]/60">{day}</span>)}
                    {Array.from({length:21},(_,i)=><span key={i} className={i===10?"rounded-md bg-[#1B3C57] py-1.5 text-white":"py-1.5 text-[#1B3C57]/80"}>{i+1}</span>)}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex-1 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                    <Sparkles size={20} className="text-[#CCB074]" />
                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Culture insights</p>
                    <p className="mt-2 text-lg font-semibold">Understanding before assumptions.</p>
                    <p className="mt-2 text-xs leading-5 text-white/45">Reflection questions for better coaching conversations.</p>
                  </div>
                  <div className="flex-1 rounded-[1.5rem] border border-[#CCB074]/25 bg-[#CCB074] p-5 text-[#1B3C57]">
                    <Feather size={20} />
                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em]">Book writing guide</p>
                    <p className="mt-2 text-lg font-semibold">Your story has a structure.</p>
                    <p className="mt-2 text-xs leading-5 text-[#1B3C57]/75">Make room for your perspective and experience.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="flex items-center gap-3"><MessageCircle size={18} className="text-[#8AB0A9]"/><p className="text-xs text-white/65">ALMA · Your member AI reflection partner</p></div><ArrowRight size={15} className="text-[#CCB074]"/>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-3 hidden rounded-[1.4rem] border border-white/20 bg-[#FEFEFE] px-5 py-4 text-[#1B3C57] shadow-2xl sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#648C85]">Susan’s approach</p>
              <p className="mt-1 text-sm font-semibold">Learn. Reflect. Lead.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[.85fr_1.15fr] md:gap-16">
            <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#648C85]">Culture meets coaching</p><h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-5xl">More than information. <span className="text-[#8AB0A9]">A way to practice.</span></h2></div>
            <div className="flex items-center"><p className="max-w-2xl text-base leading-8 text-[#1B3C57]/65">Coaching asks us to listen carefully, recognize context, and lead with intention. The Culture Studio is designed to help you bring those skills into your practice, your writing, and your everyday decisions.</p></div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {offerings.map((offering)=><Link key={offering.title} href={offering.href} className="group flex min-h-[350px] flex-col rounded-[1.8rem] border border-[#1B3C57]/10 bg-[#F5F7F4] p-7 transition hover:-translate-y-1 hover:border-[#8AB0A9] hover:shadow-xl sm:p-8">
              <div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3C57] text-[#CCB074]"><offering.icon size={22}/></span><span className="text-[11px] tracking-[0.2em] text-[#1B3C57]/35">{offering.number}</span></div>
              <h3 className="mt-12 text-2xl font-semibold tracking-[-0.045em]">{offering.title}</h3><p className="mt-4 flex-1 text-sm leading-7 text-[#1B3C57]/65">{offering.text}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-[#517F77]">Explore the tool <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span>
            </Link>)}
          </div>
        </div>
      </section>
      <section className="bg-[#E8F0ED] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div><div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#648C85]"><UsersRound size={17}/> Coaching the coaches</div>
            <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-5xl">You can guide others without losing the curiosity to grow yourself.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#1B3C57]/70">Build thoughtful conversations around cultural awareness, belonging, communication, and leadership. Susan's coaching provides the human perspective behind the tools.</p>
            <Link href="/private-advisory" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B3C57] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2B526B]">Explore coaching <ArrowRight size={15}/></Link>
          </div>
          <div className="rounded-[2rem] border border-[#1B3C57]/10 bg-white p-8 sm:p-10">
            <BrandMark size={56} variant="navy"/>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#648C85]">The learning philosophy</p>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.035em] sm:text-3xl">“A good question can open a conversation. A thoughtful conversation can change how we lead.”</p>
            <p className="mt-6 text-sm leading-7 text-[#1B3C57]/60">A culture-centered approach starts with listening, context, and a willingness to keep learning.</p>
          </div>
        </div>
      </section>
      <section className="px-5 py-24 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#1B3C57] p-9 text-white md:flex-row md:items-center sm:p-14">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CCB074]">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Start with curiosity. Grow with intention.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Explore the learning tools or start a conversation about your coaching goals.</p></div>
        <Link href="/culture" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#CCB074] px-6 py-4 text-sm font-semibold text-[#1B3C57]">Discover Culture Studio <ArrowRight size={15}/></Link>
      </div></section>
      <Footer />
    </main>
  );
}
