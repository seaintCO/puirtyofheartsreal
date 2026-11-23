import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, ChevronRight, Compass, Feather, MoveUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CultureDiagram from "@/components/brand/CultureDiagram";
import StudioPreview from "@/components/culture/StudioPreview";
import BrandMark from "@/components/brand/BrandMark";

const disciplines = [
  {
    index: "01",
    category: "THE PRACTICE",
    title: "Coaching the coaches",
    description: "Grow the confidence to lead thoughtful conversations, approach difference with care, and guide others without losing your own curiosity.",
    href: "/private-advisory",
    label: "Discover Susan's approach",
    symbol: "coaching",
  },
  {
    index: "02",
    category: "THE RESEARCH",
    title: "Learning culture",
    description: "Ask better questions about context, communication, belonging, and the stories that shape the way we work together.",
    href: "/culture",
    label: "Explore the studio",
    symbol: "culture",
  },
  {
    index: "03",
    category: "THE WORK",
    title: "Writing what matters",
    description: "Bring your experiences into focus. Shape your voice, find a direction for your book, and make space for a reader to reflect.",
    href: "/culture#writing",
    label: "Meet the writing guide",
    symbol: "writing",
  },
] as const;

export default function Home() {
  return (
    <main className="ph-site">
      <Navbar/>
      <section className="ph-hero" aria-labelledby="ph-hero-title">
        <div className="ph-hero-grain" aria-hidden="true" />
        <div className="ph-container">
          <div className="ph-hero-kicker ph-reveal"><span className="ph-kicker-line"/><span>THE PURITY OF HEARTS EXPERIENCE</span><span className="ph-kicker-side">EST. IN PURPOSE</span></div>
          <div className="ph-hero-layout">
            <div className="ph-hero-content">
              <p className="ph-eyebrow ph-reveal ph-delay-1">A THOUGHTFUL PRACTICE IN CULTURE & COACHING</p>
              <h1 id="ph-hero-title" className="ph-hero-heading ph-reveal ph-delay-2">
                The art of<br/> <em>understanding</em><span className="ph-hero-heading-last">people<span className="ph-hero-period">.</span></span>
              </h1>
              <p className="ph-hero-intro ph-reveal ph-delay-3">
                A place to learn, reflect, and grow into the kind of coach who sees beyond the obvious. Rooted in culture, guided by curiosity, and shaped by Susan Wagner.
              </p>
              <div className="ph-hero-actions ph-reveal ph-delay-4">
                <Link className="ph-btn ph-btn-navy" href="/culture">Explore the culture studio <ArrowUpRight size={17}/></Link>
                <Link className="ph-text-link" href="/private-advisory">Coaching with Susan <ArrowRight size={16}/></Link>
              </div>
            </div>
            <div className="ph-hero-graphic ph-reveal ph-delay-3">
              <CultureDiagram/>
            </div>
          </div>
          <div className="ph-hero-base ph-reveal ph-delay-4">
            <p><span className="ph-star-dingbat" aria-hidden="true">✳</span> LISTEN FIRST. LEAD WITH INTENTION.</p>
            <Link href="#our-practice">SCROLL TO DISCOVER <ArrowDown size={15}/></Link>
            <span>01 — 04</span>
          </div>
        </div>
      </section>

      <section id="our-practice" className="ph-practice" aria-labelledby="ph-practice-title">
        <div className="ph-container">
          <div className="ph-section-topline">
            <span>01 / THE EXPERIENCE</span><span>THREE WAYS TO GROW</span>
          </div>
          <div data-ph-animate className="ph-practice-intro">
            <h2 id="ph-practice-title">Not more information.<br/><em>A different perspective.</em></h2>
            <p>Learning can be something you return to, not something you rush through. Start with the questions that change how you see.</p>
          </div>
          <div className="ph-discipline-list">
            {disciplines.map((item) => (
              <Link href={item.href} data-ph-animate className="ph-discipline" key={item.index}>
                <div className="ph-discipline-index"><span>{item.index}</span><span>{item.category}</span></div>
                <div className="ph-discipline-main">
                  <div className="ph-discipline-symbol" aria-hidden="true">
                    {item.symbol === "coaching" ? <Compass size={33} strokeWidth={1.15}/> : item.symbol === "culture" ? <BookOpen size={33} strokeWidth={1.15}/> : <Feather size={33} strokeWidth={1.15}/>}
                  </div>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </div>
                <div className="ph-discipline-end"><span>{item.label}</span><span className="ph-discipline-arrow"><MoveUpRight size={22} strokeWidth={1.4}/></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ph-belief" aria-labelledby="ph-belief-title">
        <div className="ph-belief-lines" aria-hidden="true"><i/><i/><i/></div>
        <div className="ph-container ph-belief-inner">
          <div className="ph-belief-aside"><span>02 / A POINT OF VIEW</span><div className="ph-belief-mark"><BrandMark size={64} variant="navy"/></div><span>BEYOND ASSUMPTIONS</span></div>
          <div data-ph-animate className="ph-belief-content">
            <h2 id="ph-belief-title">Before we teach,<br/>we should <em>listen.</em></h2>
            <p>Culture is not a set of boxes to check. It is lived experience, context, and the meaning people make together. Coaching becomes more useful when we leave room for all three.</p>
            <Link href="/private-advisory" className="ph-text-link ph-text-link-light">Our approach to coaching <ArrowUpRight size={16}/></Link>
          </div>
        </div>
        <div className="ph-belief-caption ph-container"><span>LISTEN</span><span>UNDERSTAND</span><span>LEAD</span></div>
      </section>

      <section className="ph-studio-section" id="studio" aria-labelledby="ph-studio-title">
        <div className="ph-container">
          <div className="ph-section-topline"><span>03 / THE CULTURE STUDIO</span><span>DESIGNED FOR PRACTICE</span></div>
          <div data-ph-animate className="ph-studio-intro">
            <div><p className="ph-eyebrow">YOUR SPACE TO DO THE WORK</p><h2 id="ph-studio-title">A thoughtful tool<br/>for <em>every chapter.</em></h2></div>
            <div><p>Move between reflection, learning, and writing. Everything has a place, without getting in the way of the work itself.</p><Link href="/culture" className="ph-text-link">Discover the studio <ArrowUpRight size={16}/></Link></div>
          </div>
          <StudioPreview/>
          <div className="ph-studio-footnote"><span>01 — PLAN</span><span>02 — LEARN</span><span>03 — WRITE</span><span>THE CULTURE STUDIO / PURITY OF HEARTS</span></div>
        </div>
      </section>

      <section className="ph-susan" aria-labelledby="ph-susan-title">
        <div className="ph-container ph-susan-grid">
          <div className="ph-susan-graphic">
            <div className="ph-susan-square ph-susan-square-one"/>
            <div className="ph-susan-square ph-susan-square-two"/>
            <div className="ph-susan-emblem"><BrandMark size={105} variant="sage"/></div>
            <span className="ph-susan-graphic-caption">PEOPLE • PERSPECTIVE • PURPOSE</span>
          </div>
          <div data-ph-animate className="ph-susan-content">
            <span className="ph-eyebrow">04 / COACHING WITH SUSAN WAGNER</span>
            <h2 id="ph-susan-title">Good coaching<br/>begins with<br/><em>good questions.</em></h2>
            <p>For coaches, leaders, and people who want their work to mean something. Develop a deeper understanding of culture and of the people you hope to serve.</p>
            <div className="ph-susan-links"><Link className="ph-btn ph-btn-navy" href="/consultation">Start a conversation <ArrowUpRight size={17}/></Link><Link className="ph-text-link" href="/private-advisory">Explore coaching <ArrowRight size={17}/></Link></div>
          </div>
        </div>
      </section>

      <section className="ph-final" aria-labelledby="ph-final-title">
        <div data-ph-animate className="ph-container ph-final-inner">
          <div><span className="ph-overline">CULTURE / COACHING / CLARITY</span><h2 id="ph-final-title">There's always more<br/><em>to understand.</em></h2></div>
          <Link href="/culture" className="ph-final-link" aria-label="Explore the Culture Studio"><ArrowUpRight size={35} strokeWidth={1.2}/></Link>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
