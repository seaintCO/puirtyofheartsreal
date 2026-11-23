import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Feather, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PurityWaitlistForm from "@/components/purityos/PurityWaitlistForm";

export const metadata = {
  title: "ALMA | Your Reflection Companion",
  description: "ALMA is a private AI reflection partner within Purity of Hearts for coaches, leaders, culture, and writing.",
};

const uses = [
  { n:"01", icon:CalendarDays, title:"Make space to reflect", text:"Think through conversations, set intentions, and develop a rhythm of thoughtful coaching practice." },
  { n:"02", icon:BookOpen, title:"Understand the context", text:"Explore better questions about culture, belonging, and communication without reducing people to a label." },
  { n:"03", icon:Feather, title:"Find the words", text:"Work through chapter ideas, writing prompts, and the stories only you can tell." },
];

export default function PurityOSPage() {
  return (
    <main className="ph-site">
      <Navbar/>
      <section className="ph-alma-hero">
        <div className="ph-container">
          <div className="ph-section-topline"><span>ALMA / THE REFLECTION COMPANION</span><span>MEMBER EXPERIENCE</span></div>
          <div className="ph-alma-grid">
            <div className="ph-reveal"><p className="ph-eyebrow">A QUIETER PLACE TO THINK</p><h1>Clarity takes<br/><em>a conversation.</em></h1><p>Meet ALMA, a private companion for thinking through culture, your coaching practice, and the ideas worth putting into words.</p>
              <div className="ph-hero-actions"><Link className="ph-btn ph-btn-gold" href="/membership">Become a member <ArrowUpRight size={16}/></Link><Link href="/culture" className="ph-text-link ph-text-link-light">Explore the studio <ArrowRight size={16}/></Link></div><p className="ph-alma-access"><Link href="/purityos/chat" className="text-[#CCB074] underline underline-offset-4">Already a member? Open ALMA.</Link> Member access is required. ALMA uses AI to support reflection, not to replace cultural expertise or professional advice.</p>
            </div>
            <div className="ph-alma-visual ph-reveal ph-delay-2" aria-label="ALMA circular wordmark illustration">
              <div className="ph-alma-circle ph-alma-circle-one"/><div className="ph-alma-circle ph-alma-circle-two"/><div className="ph-alma-circle ph-alma-circle-three"/>
              <span className="ph-alma-visual-top">LISTEN · REFLECT · GROW</span>
              <span className="ph-alma-wordmark">alma<span>.</span></span>
              <span className="ph-alma-visual-bottom">A SPACE FOR THOUGHTFUL QUESTIONS</span>
            </div>
          </div>
        </div>
      </section>
      <section className="ph-alma-uses">
        <div className="ph-container">
          <div className="ph-section-topline"><span>01 / WHAT ALMA CAN HELP YOU EXPLORE</span><span>REFLECTION OVER INSTANT ANSWERS</span></div>
          <div data-ph-animate className="ph-alma-uses-intro"><h2>Questions worth<br/><em>spending time with.</em></h2><p>Three places to begin. Your conversations are your own, and the perspective behind them belongs to you.</p></div>
          <div className="ph-alma-use-list">{uses.map(item=><article key={item.n} data-ph-animate className="ph-alma-use"><span>{item.n}</span><item.icon size={28} strokeWidth={1.2}/><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>
      <section className="ph-alma-waitlist">
        <div data-ph-animate className="ph-container ph-alma-waitlist-grid">
          <div><span className="ph-eyebrow">PURITY OF HEARTS / NEWS</span><h2>The next chapter<br/><em>is taking shape.</em></h2><p>Follow along as the member experience grows. Joining the mailing list does not purchase access or guarantee a place in a program.</p></div>
          <div className="ph-alma-waitlist-form"><PurityWaitlistForm dark /></div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
