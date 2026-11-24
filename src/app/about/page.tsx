import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Feather, HeartHandshake, MessageCircle, Sparkles } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata={
  title:"About Susan | Purity of Hearts",
  description:"Meet Susan Wagner, educator, coach, mentor, and founder behind Purity of Hearts.",
};

export default function AboutPage(){
  return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
    <section className="aura-subhero">
      <div className="aura-subhero-copy" data-aura-reveal>
        <span className="aura-outline-pill"><HeartHandshake size={15}/> ABOUT SUSAN WAGNER</span>
        <h1>Education with clarity.<br/><span>Coaching with purpose.</span></h1>
        <p>
          Susan Wagner is the educator, coach, mentor, and founder behind Purity of Hearts — an ecosystem
          bringing together practical business education, culture-centered coaching, faith-informed reflection,
          and private growth strategy.
        </p>
        <div className="aura-hero-buttons">
          <AuraShiftLink href="/consultation" label="Work with Susan" icon={<ArrowRight size={16}/>} />
          <Link href="/course" className="aura-secondary-button">Explore the Course <ArrowRight size={16}/></Link>
        </div>
      </div>
      <div className="aura-about-visual" data-aura-reveal><div className="aura-about-monogram">SW</div><span>FOUNDER · EDUCATOR · COACH · MENTOR</span></div>
    </section>

    <section className="about-biography course-section">
      <div className="about-bio-label" data-aura-reveal><span>THE BIOGRAPHY</span></div>
      <div className="about-bio-copy" data-aura-reveal>
        <h2>Her work is built around <span>people, perspective, and purpose.</span></h2>
        <p>
          Susan’s work centers on helping people think more clearly about the businesses they are building,
          the people they are leading, and the culture surrounding the decisions they make. Rather than treating
          business, leadership, culture, and personal development as separate conversations, Purity of Hearts
          brings them into one learning environment.
        </p>
        <p>
          Her educational work gives founders and emerging leaders practical frameworks for finance, strategy,
          marketing, operations, customer discovery, growth, and leadership. Her coaching work goes deeper:
          listening for context, challenging assumptions, building confidence, and helping people translate ideas
          into responsible action.
        </p>
        <p>
          Faith-informed reflection is part of Susan’s broader philosophy of building with purpose. The goal is
          not simply to grow faster; it is to understand why you are building, who your work affects, and how to
          lead without losing the values that made the work meaningful in the first place.
        </p>
      </div>
    </section>

    <section className="course-section">
      <div className="course-section-heading" data-aura-reveal>
        <span className="aura-outline-pill"><Compass size={15}/> THE WORK TODAY</span>
        <h2>Four expressions. <span>One philosophy.</span></h2>
      </div>
      <div className="about-work-grid">
        {[
          [BookOpen,"Education","A structured online business and leadership platform with video lessons, quizzes, study tools, notes, and progress tracking."],
          [HeartHandshake,"Private Mentorship","Direct one-on-one work for people who want strategy, accountability, clarity, and a more personalized growth path."],
          [Compass,"Culture & Coaching","A practice of listening first, understanding context, and asking better questions before leading people."],
          [Sparkles,"PurityOS / ALMA","A digital layer for reflection, culture tools, writing support, and AI-assisted member experiences as the platform expands."],
        ].map(([Icon,title,copy])=>{const I=Icon as typeof BookOpen;return <article key={title as string} data-aura-reveal><I size={22}/><h3>{title as string}</h3><p>{copy as string}</p></article>})}
      </div>
    </section>

    <AuraPhotoBand
      image="/purity-one-on-one.webp"
      alt="A thoughtful one-on-one coaching conversation"
      eyebrow="THE COACHING ROOM"
      title="The work becomes personal when the questions become real."
      body="Susan's private mentorship is designed for people who want more than another video — they want a thoughtful partner in the decisions they are making."
      href="/consultation"
      linkLabel="Book a conversation with Susan"
    />

    <section className="about-book-2027" data-aura-reveal>
      <div className="about-book-year">2027</div>
      <div className="about-book-copy">
        <span><Feather size={15}/> BOOK COMING SOON</span>
        <h2>Susan is writing the next chapter.</h2>
        <p>
          A forthcoming book planned for 2027 will bring together Susan’s life experiences, culture, faith,
          leadership, coaching, purpose, and the lessons that shaped the philosophy behind Purity of Hearts.
        </p>
      </div>
    </section>

    <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal>
      <h2>Learn from the platform.<br/><span>Or work directly with Susan.</span></h2>
      <p>Choose the self-paced $200 educational platform or start a conversation about private mentorship.</p>
      <div><AuraShiftLink href="/course" label="Explore the $200 Course" icon={<BookOpen size={16}/>} /><Link href="/consultation" className="aura-secondary-button">Book Susan <MessageCircle size={15}/></Link></div>
    </div></section>
    <AuraFooter/>
  </main></div>
}
