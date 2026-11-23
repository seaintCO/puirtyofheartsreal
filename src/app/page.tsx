import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2,
  Compass, Feather, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, UsersRound
} from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import PurityFloatingCards from "@/components/home/PurityFloatingCards";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

const features = [
  { icon: Compass, title:"Culture insights", copy:"Explore identity, belonging, communication, context, and leadership through better questions.", href:"/culture#insights" },
  { icon: CalendarDays, title:"Culture calendar", copy:"Plan reflection, observations, and conversations around the communities you serve.", href:"/culture#calendar" },
  { icon: Feather, title:"Book writing guide", copy:"Shape your lived experience into chapters without losing your own voice.", href:"/culture#writing" },
  { icon: BookOpen, title:"Learning library", copy:"Work through lessons, resources, quizzes, notes, and saved progress.", href:"/education" },
  { icon: MessageCircle, title:"ALMA", copy:"A private member AI companion for reflection, coaching questions, and writing support.", href:"/purityos" },
  { icon: HeartHandshake, title:"Coaching with Susan", copy:"Go deeper with private coaching for coaches, leaders, and educators.", href:"/private-advisory" },
];

const paths = [
  ["01","Learn","Study culture, coaching, communication, and leadership with context."],
  ["02","Reflect","Use prompts and the calendar to slow down before you make assumptions."],
  ["03","Practice","Turn what you learn into better conversations and coaching habits."],
  ["04","Write","Develop your own story, chapters, and ideas with structured guidance."],
];

export default function Home(){
  return (
    <div className="aura-page">
      <AuraMotion/>
      <main className="aura-shell">
        <PurityAuraBackdrop/>
        <div className="aura-hatch" aria-hidden="true"/>
        <AuraHeader/>

        <section className="aura-hero" id="hero">
          <div className="aura-hero-copy">
            <Link href="/culture" className="aura-outline-pill" data-aura-reveal>
              <Sparkles size={15}/> Explore the Culture Studio
            </Link>
            <h1 data-aura-reveal>
              Learn to lead with <span>understanding.</span>
            </h1>
            <p data-aura-reveal>
              Purity of Hearts is a culture-centered learning and coaching experience for coaches, leaders, and writers who want to listen better, ask better questions, and guide people with more intention.
            </p>
            <div className="aura-hero-buttons" data-aura-reveal>
              <AuraShiftLink href="/membership" label="Join membership" icon={<ArrowUpRight size={16}/>} />
              <Link href="/private-advisory" className="aura-secondary-button">Work with Susan <ArrowRight size={16}/></Link>
            </div>
            <div className="aura-trust-row" data-aura-reveal>
              <span><ShieldCheck size={15}/> Secure member access</span>
              <span><CheckCircle2 size={15}/> Culture · learning · ALMA</span>
            </div>
          </div>
          <div className="aura-hero-visual" data-aura-reveal>
            <PurityFloatingCards/>
          </div>
        </section>

        <section className="aura-network-strip" aria-label="Purity of Hearts pillars">
          {[
            [Compass,"Culture"],
            [UsersRound,"Coaching"],
            [BookOpen,"Learning"],
            [CalendarDays,"Reflection"],
            [Feather,"Writing"],
            [MessageCircle,"ALMA"]
          ].map(([Icon,label],index)=>{
            const ItemIcon = Icon as typeof Compass;
            return <Link key={label as string} href={index===0?"/culture":index===1?"/private-advisory":index===2?"/education":index===3?"/culture#calendar":index===4?"/culture#writing":"/purityos"}><ItemIcon size={22}/><span>{label as string}</span></Link>
          })}
        </section>

        <section className="aura-section aura-features" id="features">
          <div className="aura-section-heading" data-aura-reveal>
            <Link href="/culture" className="aura-outline-pill"><Compass size={15}/> Why Purity of Hearts</Link>
            <h2>Everything you need to <span>learn, reflect and grow.</span></h2>
            <p>The experience connects Susan's coaching approach with practical tools people can actually use between conversations.</p>
          </div>
          <div className="aura-feature-grid">
            {features.map(feature=><Link key={feature.title} href={feature.href} className="aura-feature-card" data-aura-reveal>
              <span className="aura-feature-icon"><feature.icon size={21}/></span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <span className="aura-feature-link">Explore <ArrowUpRight size={14}/></span>
            </Link>)}
          </div>
        </section>

        <AuraPhotoBand
          image="/purity-life-collage.webp"
          alt="Coaches and leaders in thoughtful conversation, reflective writing, and one-on-one coaching"
          eyebrow="PEOPLE IN PRACTICE"
          title="Culture becomes real in conversation."
          body="The work is not abstract. It happens around a table, in a quiet notebook, and in the moments when a coach chooses to listen before answering."
          href="/private-advisory"
          linkLabel="Explore coaching with Susan"
        />

        <section className="aura-section aura-story" id="story">
          <div className="aura-story-visual" data-aura-reveal>
            <div className="aura-story-orbit">
              <span className="ring one"/><span className="ring two"/><span className="ring three"/>
              <Compass size={72} strokeWidth={1}/>
              <small>LISTEN · UNDERSTAND · LEAD</small>
            </div>
          </div>
          <div className="aura-story-copy" data-aura-reveal>
            <Link href="/about" className="aura-outline-pill"><BookOpen size={15}/> The approach</Link>
            <h2>Culture isn't a checklist. <span>It's context.</span></h2>
            <p>People bring history, values, language, relationships, and lived experience into every conversation. Purity of Hearts helps coaches slow down long enough to notice what they may be missing.</p>
            <p>The goal isn't to memorize cultures. It's to build the habit of listening, checking assumptions, and making room for another person's own definition of what matters.</p>
            <div className="aura-story-stats">
              <div><strong>3</strong><span>Culture Studio tools</span></div>
              <div><strong>30</strong><span>ALMA messages / day</span></div>
              <div><strong>1</strong><span>Connected membership</span></div>
            </div>
          </div>
        </section>

        <section className="aura-section aura-paths">
          <div className="aura-section-heading centered" data-aura-reveal>
            <Link href="/education" className="aura-outline-pill"><UsersRound size={15}/> Your learning path</Link>
            <h2>A practice designed to <span>stay with you.</span></h2>
            <p>Move through the platform at your own pace, then use what you learn in real conversations.</p>
          </div>
          <div className="aura-path-grid">
            {paths.map(([number,title,copy])=><div key={number} className="aura-path-card" data-aura-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}
          </div>
        </section>

        <AuraPhotoBand
          image="/purity-life-collage-2.webp"
          alt="A warm culture coaching workshop, writing session, and one-on-one reflective conversation"
          eyebrow="LEARN · REFLECT · WRITE"
          title="A learning space that feels lived in."
          body="Use the platform between real conversations: study, write, ask better questions, and return to your work with more clarity."
          href="/education"
          linkLabel="Explore the learning experience"
          reverse
        />

        <section className="aura-section aura-membership-preview">
          <div className="aura-membership-copy" data-aura-reveal>
            <Link href="/membership" className="aura-outline-pill"><CheckCircle2 size={15}/> Member experience</Link>
            <h2>One membership. <span>Everything connected.</span></h2>
            <p>Members can access learning resources, Culture Studio tools, saved progress, and ALMA from one private account.</p>
            <div className="aura-check-list">
              {["Culture Calendar + Culture Insights","Book Writing Guide","Lessons, notes, quizzes and resources","ALMA member assistant","Stripe-hosted subscription and billing portal"].map(item=><span key={item}><CheckCircle2 size={15}/>{item}</span>)}
            </div>
            <AuraShiftLink href="/membership" label="See membership" icon={<ArrowUpRight size={16}/>} />
          </div>
          <div className="aura-membership-console" data-aura-reveal>
            <div className="aura-console-head"><span>Purity member space</span><span className="online">PRIVATE</span></div>
            <Link href="/dashboard/culture" className="aura-console-row"><CalendarDays size={17}/><div><strong>Culture Studio</strong><small>Calendar · Insights · Writing</small></div><ArrowUpRight size={15}/></Link>
            <Link href="/dashboard" className="aura-console-row"><BookOpen size={17}/><div><strong>Learning dashboard</strong><small>Lessons · Quizzes · Notes</small></div><ArrowUpRight size={15}/></Link>
            <Link href="/purityos/chat" className="aura-console-row"><Sparkles size={17}/><div><strong>ALMA</strong><small>Private reflection assistant</small></div><ArrowUpRight size={15}/></Link>
            <Link href="/membership/manage" className="aura-console-row"><ShieldCheck size={17}/><div><strong>Membership</strong><small>Secure Stripe billing portal</small></div><ArrowUpRight size={15}/></Link>
          </div>
        </section>

        <section className="aura-cta" id="cta">
          <div className="aura-cta-inner" data-aura-reveal>
            <h2>Ready to build a more <span>thoughtful practice?</span></h2>
            <p>Start with the Culture Studio, join the member experience, or talk directly with Susan about coaching.</p>
            <div><AuraShiftLink href="/membership" label="Join membership" icon={<ArrowUpRight size={16}/>} /><Link href="/consultation" className="aura-secondary-button">Talk with Susan <ArrowRight size={16}/></Link></div>
          </div>
        </section>

        <AuraFooter/>
      </main>
    </div>
  );
}
