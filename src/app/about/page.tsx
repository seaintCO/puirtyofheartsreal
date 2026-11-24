import Link from "next/link";
import {
  ArrowRight, Award, BookOpen, BriefcaseBusiness, Building2, Compass, Crown,
  Feather, HeartHandshake, Mic2, Scissors, Sparkles, Star, Trophy, UsersRound
} from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import AuraShiftLink from "@/components/ui/AuraShiftLink";
import AuraPhotoBand from "@/components/media/AuraPhotoBand";

export const metadata={
  title:"About Susan Harris Waggoner | Purity of Hearts",
  description:"Meet Susan Harris Waggoner — serial entrepreneur, beauty-industry executive, educator, founder, exit strategist, coach, and mentor.",
};

const milestones = [
  ["Five profitable salon exits","Total E Clips · The Parlor Salon · Curl Theory · Shades of Beauty · The Kolor Lounge",Trophy],
  ["Paul Mitchell national leadership","National Sales Leader & Platform Artist; licensed instructor and regional sales leader.",Star],
  ["Five school campuses","School Director & Part Owner across Nashville, Murfreesboro, Hendersonville, Knoxville, and Louisville.",Building2],
  ["Current business portfolio","Owner and chief executive across Main Squeeze, I Love Juice Bar, Butterfly Garden Restaurant, and consulting.",BriefcaseBusiness],
];

const expertise = [
  ["Serial Venture Creation & Exit",Crown],
  ["National Brand Strategy & Sales",Sparkles],
  ["Multi-Unit Operations",Building2],
  ["Cosmetology Education & Curriculum",BookOpen],
  ["Salon Startup Systems & Coaching",Scissors],
  ["Food & Beverage Ownership",HeartHandshake],
];

export default function AboutPage(){
  return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
    <section className="aura-subhero">
      <div className="aura-subhero-copy" data-aura-reveal>
        <span className="aura-outline-pill"><HeartHandshake size={15}/> ABOUT SUSAN HARRIS WAGGONER</span>
        <h1>Built from zero.<br/><span>Repeatedly.</span></h1>
        <p>
          Susan Harris Waggoner is a serial entrepreneur, beauty-industry executive, licensed educator,
          founder, exit strategist, coach, and mentor whose career spans salon ownership, national brand
          leadership, multi-state school operations, food and beverage ventures, consulting, and professional education.
        </p>
        <div className="aura-hero-buttons">
          <AuraShiftLink href="/consultation" label="Work with Susan" icon={<ArrowRight size={16}/>} />
          <Link href="/speaking" className="aura-secondary-button"><Mic2 size={15}/> See Susan Speak</Link>
        </div>
      </div>
      <div className="aura-about-visual" data-aura-reveal><div className="aura-about-monogram">SW</div><span>SERIAL ENTREPRENEUR · EDUCATOR · EXIT STRATEGIST</span></div>
    </section>

    <section className="about-executive-profile course-section">
      <div className="about-bio-label" data-aura-reveal><span>EXECUTIVE PROFILE</span></div>
      <div className="about-bio-copy" data-aura-reveal>
        <h2>Three decades of building <span>what others study.</span></h2>
        <p>
          Susan has built and profitably exited five independent salon companies, led national sales and stage
          education for Paul Mitchell Professional, and directed multi-campus school operations across Tennessee
          and Kentucky. Her career combines hands-on technical mastery with the operating discipline required to
          build, scale, teach, and sell real businesses.
        </p>
        <p>
          Today, she operates and advises businesses across hospitality, wellness, food and beverage, education,
          and consulting. Through BOW Enterprise LLC, a Tennessee Certified Women-Owned Business, she helps
          founders translate vision into systems, positioning, execution, and sustainable growth.
        </p>
      </div>
    </section>

    <section className="about-milestones course-section">
      <div className="course-section-heading" data-aura-reveal>
        <span className="aura-outline-pill"><Award size={15}/> CAREER AT A GLANCE</span>
        <h2>From the salon floor to <span>national leadership.</span></h2>
      </div>
      <div className="about-milestone-grid">
        {milestones.map(([title,copy,Icon])=>{const I=Icon as typeof Trophy;return <article key={title as string} data-aura-reveal><I size={22}/><h3>{title as string}</h3><p>{copy as string}</p></article>})}
      </div>
    </section>

    <section className="about-career course-section">
      <div className="about-career-column" data-aura-reveal>
        <span>CURRENT VENTURES</span>
        <h3>Owner & Chief Executive</h3>
        <p><strong>Main Squeeze · I Love Juice Bar · Butterfly Garden Restaurant</strong></p>
        <p>Susan operates a portfolio of food and beverage concepts centered on community, wellness, hospitality, and relationship-driven business.</p>
        <h3>Principal Consultant</h3>
        <p><strong>BOW Enterprise LLC</strong></p>
        <p>Executive consulting and operating strategy for emerging enterprises, with an emphasis on turning founder vision into scalable systems.</p>
      </div>
      <div className="about-career-column" data-aura-reveal>
        <span>PAUL MITCHELL</span>
        <h3>National Sales Leader & Platform Artist</h3>
        <p>Susan rose to national sales leadership while serving on professional stages as a Platform Artist, combining education, artistry, relationships, and sales performance.</p>
        <h3>School Director & Part Owner</h3>
        <p>She held leadership and ownership roles across Paul Mitchell Schools in Nashville, Murfreesboro, Hendersonville, Knoxville, and Louisville.</p>
      </div>
    </section>

    <section className="course-section">
      <div className="course-section-heading" data-aura-reveal>
        <span className="aura-outline-pill"><Compass size={15}/> AREAS OF EXPERTISE</span>
        <h2>Operator experience across <span>business and education.</span></h2>
      </div>
      <div className="about-work-grid">
        {expertise.map(([title,Icon])=>{const I=Icon as typeof Compass;return <article key={title as string} data-aura-reveal><I size={22}/><h3>{title as string}</h3></article>})}
      </div>
    </section>

    <AuraPhotoBand
      image="/purity-one-on-one.webp"
      alt="A thoughtful one-on-one coaching conversation"
      eyebrow="LICENSED EXPERTISE"
      title="A career grounded in technical mastery and teaching."
      body="Susan is a Tennessee-licensed cosmetologist and instructor with advanced expertise spanning Great Lengths, Deva Curl Level 4, Paul Mitchell Color, hair replacement, laser hair growth, and national curl specialization. Her career also includes celebrity styling and an Official Salon partnership with the Tennessee Titans."
      href="/consultation"
      linkLabel="Book a conversation with Susan"
    />

    <section className="about-recognition course-section">
      <div className="course-section-heading" data-aura-reveal>
        <span className="aura-outline-pill"><Award size={15}/> RECOGNITION</span>
        <h2>Business leadership with <span>real operating history.</span></h2>
      </div>
      <div className="about-recognition-list">
        {["Murf VIP Business Woman of the Year","Featured Entrepreneur — The Blox TV Show","Amazon Commercial Appearance","Official Salon Partner — Tennessee Titans","Tennessee Certified Women-Owned Business"].map(item=><span key={item}><Award size={14}/>{item}</span>)}
      </div>
    </section>

    <section className="about-speaking-card" data-aura-reveal>
      <div>
        <span><Mic2 size={15}/> UPCOMING APPEARANCE</span>
        <h2>Hear Susan speak in Nashville.</h2>
        <p>Be Brilliant in the Basics Leadership Summit 2027 · September 9, 2027 · Music City Center.</p>
      </div>
      <Link href="/speaking" className="speaker-site-button">See Speaking Details <ArrowRight size={15}/></Link>
    </section>

    <section className="about-book-2027" data-aura-reveal>
      <div className="about-book-year">2027</div>
      <div className="about-book-copy">
        <span><Feather size={15}/> BOOK COMING SOON</span>
        <h2>Susan is writing the next chapter.</h2>
        <p>
          A forthcoming book planned for 2027 will bring together Susan’s life experiences, culture, faith,
          entrepreneurship, leadership, coaching, purpose, and the lessons that shaped the philosophy behind Purity of Hearts.
        </p>
      </div>
    </section>

    <section className="aura-cta"><div className="aura-cta-inner" data-aura-reveal>
      <h2>Learn from the platform.<br/><span>Or learn directly from Susan.</span></h2>
      <p>Explore the $200 educational platform, book private mentorship, or see where Susan is speaking next.</p>
      <div><AuraShiftLink href="/course" label="Explore the $200 Course" icon={<BookOpen size={16}/>} /><Link href="/speaking" className="aura-secondary-button"><Mic2 size={15}/> See Susan Speak</Link></div>
    </div></section>
    <AuraFooter/>
  </main></div>
}
