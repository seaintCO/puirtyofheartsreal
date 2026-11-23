import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Compass, Feather, MessageCircle, MoveUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudioPreview from "@/components/culture/StudioPreview";

export const metadata = {
  title: "The Culture Studio | Learn, Reflect & Write",
  description: "The Purity of Hearts Culture Studio: reflection calendar, culture insights, and book writing tools for coaches and leaders.",
};

const offerings = [
  { id:"calendar",number:"01",title:"Culture Calendar",category:"PLAN WITH INTENTION",icon:CalendarDays,detail:"A place to make time for what matters. Plan reflections, conversations, and the things you're curious to learn.",questions:["Which voices haven't I invited?","What is worth making time to notice?","What could I explore more deeply?"] },
  { id:"insights",number:"02",title:"Culture Insights",category:"STUDY WITH CURIOSITY",icon:Compass,detail:"Learn about context, communication, and belonging through thoughtful prompts, without reducing any person to a label.",questions:["What am I assuming?","Whose perspective is missing?","What does this person want me to know?"] },
  { id:"writing",number:"03",title:"Book Writing Guide",category:"WRITE WITH PURPOSE",icon:Feather,detail:"Bring your experiences into a story with chapter frameworks and space for your own words. The work should always sound like you.",questions:["What story is mine to tell?","Who am I writing for?","What do I hope a reader will carry forward?"] },
] as const;

export default function CulturePage() {
  return (
    <main className="ph-site">
      <Navbar/>
      <section className="ph-culture-hero">
        <div className="ph-container">
          <div className="ph-section-topline"><span>THE CULTURE STUDIO</span><span>AN INVITATION TO KEEP LEARNING</span></div>
          <div className="ph-culture-hero-grid">
            <div>
              <p className="ph-eyebrow ph-reveal">PURPOSEFUL TOOLS, MEANINGFUL QUESTIONS</p>
              <h1 className="ph-reveal ph-delay-1">A space to<br/><em>look deeper.</em></h1>
            </div>
            <div className="ph-culture-hero-aside ph-reveal ph-delay-2">
              <div className="ph-culture-drawing" aria-hidden="true">
                <svg viewBox="0 0 310 200" fill="none"><circle cx="155" cy="100" r="83" stroke="#8AB0A9"/><circle cx="155" cy="100" r="59" stroke="#CCB074" strokeDasharray="2 6"/><path d="M155 17V183M72 100H238" stroke="#1B3C57" strokeOpacity=".3"/><path d="M155 50L175 100L155 150L135 100Z" stroke="#1B3C57" fill="#E8F0ED"/><circle cx="155" cy="100" r="6" fill="#CCB074"/></svg>
              </div>
              <p>Reflection. Learning. A voice of your own. Three ways to turn curiosity into meaningful practice.</p>
              <Link href="#explore" className="ph-text-link">Explore the tools <ArrowDown size={16}/></Link>
            </div>
          </div>
          <div className="ph-culture-hero-bottom"><span>01 — 03</span><span>MORE HUMAN. MORE INTENTIONAL.</span></div>
        </div>
      </section>
      <section className="ph-culture-explore" id="explore">
        <div className="ph-container">
          <div className="ph-section-topline"><span>01 / DISCOVER YOUR PRACTICE</span><span>THREE INTERCONNECTED SPACES</span></div>
          <div className="ph-culture-toc">
            {offerings.map(item=>(
              <a key={item.id} href={"#"+item.id} className="ph-culture-toc-item">
                <span>{item.number}</span><span>{item.title}</span><ArrowDown size={15}/>
              </a>
            ))}
          </div>
          <div className="ph-culture-chapters">
            {offerings.map((item,i)=>(
              <article key={item.id} id={item.id} className={"ph-culture-chapter ph-culture-chapter-"+item.id}>
                <div className="ph-culture-chapter-head"><span>{item.number} / 03</span><span>{item.category}</span></div>
                <div className="ph-culture-chapter-grid">
                  <div className="ph-culture-chapter-text">
                    <div className="ph-culture-chapter-icon"><item.icon size={32} strokeWidth={1.2}/></div>
                    <h2>{item.title.split(" ").slice(0,-1).join(" ")}<br/><em>{item.title.split(" ").at(-1)}</em></h2>
                    <p>{item.detail}</p>
                    <Link href="/login?next=/dashboard/culture" className="ph-text-link">Open the member workspace <ArrowUpRight size={16}/></Link>
                  </div>
                  <div className="ph-culture-chapter-visual">
                    <div className="ph-culture-chapter-visual-title"><span>REFLECTION / {item.number}</span><span>✳</span></div>
                    <div className="ph-culture-question-list">
                      {item.questions.map((q,index)=><div className="ph-culture-question" key={q}><span>0{index+1}</span><p>{q}</p></div>)}
                    </div>
                    <span className="ph-culture-visual-footer">{i===2?"A BOOK STARTS WITH A QUESTION.":"REFLECTION BEFORE ASSUMPTION."}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ph-studio-section ph-studio-section-culture">
        <div className="ph-container">
          <div className="ph-section-topline"><span>02 / A LOOK INSIDE</span><span>THE STUDIO IN PRACTICE</span></div>
          <div className="ph-studio-intro"><div><p className="ph-eyebrow">DESIGNED TO BE USED</p><h2>Quiet tools.<br/><em>Meaningful work.</em></h2></div><div><p>Preview the calendar, prompts, and writing guide. Members can then enter their own workspace.</p><Link href="/login?next=/dashboard/culture" className="ph-text-link">Visit your workspace <ArrowUpRight size={16}/></Link></div></div>
          <StudioPreview/>
        </div>
      </section>
      <section className="ph-culture-alma">
        <div className="ph-container ph-culture-alma-inner">
          <div className="ph-culture-alma-symbol"><span className="ph-culture-alma-ring"/><MessageCircle size={40} strokeWidth={1.1}/></div>
          <div><p className="ph-eyebrow">MEET ALMA</p><h2>A place to <em>think out loud.</em></h2><p>Use the private member assistant to explore your questions, organize an outline, or think through a coaching conversation. AI can support reflection; it can't replace real lived experience.</p></div>
          <Link href="/purityos" className="ph-culture-alma-link" aria-label="Explore ALMA"><MoveUpRight size={25}/></Link>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
