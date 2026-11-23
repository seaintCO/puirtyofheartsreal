import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, Eye, HeartHandshake, MessageCircle, MoveUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Coaching with Susan | A Practice of Understanding",
  description: "Culture-informed coaching and reflective leadership with Susan Wagner at Purity of Hearts.",
};

const principles = [
  { n:"01", label:"Notice the context", text:"Every person enters a conversation with their own history, perspective, and lived experience." },
  { n:"02", label:"Ask what matters", text:"Thoughtful coaching begins with a better question, not a ready-made answer." },
  { n:"03", label:"Make room to grow", text:"Turn reflection into practices you can return to, at work and in the communities you serve." },
];

export default function PrivateAdvisoryPage() {
  return (
    <main className="ph-site">
      <Navbar/>
      <section className="ph-coach-hero">
        <div className="ph-container">
          <div className="ph-section-topline"><span>COACHING / SUSAN WAGNER</span><span>UNDERSTANDING BEFORE ASSUMPTION</span></div>
          <div className="ph-coach-hero-grid">
            <div className="ph-reveal">
              <span className="ph-eyebrow">A PRACTICE ROOTED IN PEOPLE</span>
              <h1>There is more<br/>to <em>every story.</em></h1>
              <p>For coaches and leaders who want to listen more deeply, understand the culture behind the conversation, and bring intention to the way they guide others.</p>
              <div className="ph-hero-actions"><Link className="ph-btn ph-btn-navy" href="/consultation">Talk with Susan <ArrowUpRight size={16}/></Link><Link className="ph-text-link" href="/culture">Explore culture tools <ArrowRight size={16}/></Link></div>
            </div>
            <div className="ph-coach-symbol ph-reveal ph-delay-2" aria-hidden="true">
              <svg viewBox="0 0 550 550" fill="none">
                <circle cx="275" cy="275" r="239" stroke="#9AB5AD" strokeOpacity=".6"/>
                <circle cx="275" cy="275" r="205" stroke="#D4B983" strokeDasharray="3 10"/>
                <circle cx="275" cy="275" r="159" stroke="#1B3C57" strokeOpacity=".15"/>
                <circle cx="207" cy="258" r="88" fill="#8AB0A9" fillOpacity=".4" stroke="#789F97" strokeOpacity=".6"/>
                <circle cx="343" cy="258" r="88" fill="#CCB074" fillOpacity=".34" stroke="#CCB074" strokeOpacity=".7"/>
                <circle cx="275" cy="337" r="88" fill="#F5F7F3" fillOpacity=".65" stroke="#1B3C57" strokeOpacity=".26"/>
                <circle cx="275" cy="279" r="13" fill="#1B3C57"/>
                <path d="M275 52V104M275 446V498M52 275H104M446 275H498" stroke="#8BA19D"/>
                <text x="275" y="26" textAnchor="middle" fill="#84988F" fontSize="10" letterSpacing="3">THE HUMAN PERSPECTIVE</text>
                <text x="275" y="530" textAnchor="middle" fill="#84988F" fontSize="10" letterSpacing="3">LISTEN · UNDERSTAND · LEAD</text>
              </svg>
              <span className="ph-coach-symbol-note">We are more than one perspective.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="ph-coach-approach">
        <div className="ph-container">
          <div className="ph-section-topline"><span>01 / THE APPROACH</span><span>THREE PRINCIPLES</span></div>
          <div className="ph-coach-approach-intro"><h2>Coaching is not about<br/><em>having every answer.</em></h2><p>It is about paying attention to what might be missing, and helping someone hear their own voice more clearly.</p></div>
          <div className="ph-coach-list">{principles.map(item=><div className="ph-coach-line" key={item.n}><span>{item.n}</span><h3>{item.label}</h3><p>{item.text}</p><MoveUpRight size={23} strokeWidth={1.25}/></div>)}</div>
        </div>
      </section>
      <section className="ph-coach-dark">
        <div className="ph-container ph-coach-dark-grid">
          <div><span className="ph-eyebrow">WHO THIS IS FOR</span><h2>For those who<br/>help others <em>grow.</em></h2></div>
          <div><p>Whether you are developing a coaching practice, leading a team, teaching, or writing from your lived experience, the work begins in the same place: curiosity about people.</p><div className="ph-coach-dark-labels"><span><Compass size={17}/> Coaches</span><span><Eye size={17}/> Leaders</span><span><HeartHandshake size={17}/> Educators</span></div></div>
        </div>
      </section>
      <section className="ph-coach-next">
        <div className="ph-container ph-coach-next-grid">
          <div className="ph-coach-next-emblem"><MessageCircle size={54} strokeWidth={1.1}/><span>THE CONVERSATION CONTINUES</span></div>
          <div><p className="ph-eyebrow">WORK WITH SUSAN</p><h2>Start with<br/><em>a conversation.</em></h2><p>Tell Susan what you are building, who you hope to serve, and where you'd like to grow. Coaching availability and next steps can be discussed directly.</p><Link href="/consultation" className="ph-btn ph-btn-navy">Request a conversation <ArrowUpRight size={16}/></Link></div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
