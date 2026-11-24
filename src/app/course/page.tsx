import Link from "next/link";
import {
  ArrowRight, BookOpen, CheckCircle2, Clock3, FileText, GraduationCap,
  Layers3, MessageCircle, NotebookPen, PlayCircle, Sparkles, Trophy
} from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import CourseCheckoutButton from "@/components/course/CourseCheckoutButton";
import { businessCourse, businessLessons } from "@/data/business-course";
import { createClient } from "@/lib/supabase/server";
import { annualAccessIsActive, getAnnualCourseAccess } from "@/lib/course/annual-access";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Educational Platform | Purity of Hearts",
  description: "Get 12 months of access to the Purity of Hearts business and leadership educational platform for a one-time $200 payment.",
};

const lessonNames = new Map<number, string[]>();
for (const lesson of businessLessons) {
  const current = lessonNames.get(lesson.module) ?? [];
  current.push(lesson.title);
  lessonNames.set(lesson.module, current);
}

export default async function CoursePage() {
  const totalSeconds = businessLessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const access = user ? await getAnnualCourseAccess(supabase, user.id) : null;
  const active = annualAccessIsActive(access);

  return (
    <div className="aura-page">
      <AuraMotion/>
      <main className="aura-shell aura-inner-page course-page-shell">
        <PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>

        <section className="course-hero">
          <div className="course-hero-copy" data-aura-reveal>
            <span className="aura-outline-pill"><GraduationCap size={15}/> PURITY EDUCATIONAL PLATFORM</span>
            <h1>Learn the business.<br/><span>Build it with purpose.</span></h1>
            <p>
              A structured online business and leadership platform built around practical video lessons,
              founder-focused frameworks, quizzes, study tools, action steps, and saved progress.
            </p>
            <div className="course-price-line">
              <strong>$200</strong><span>one time</span><i>12 months of access</i>
            </div>
            <div className="course-hero-actions">
              {active ? (
                <Link href="/dashboard/courses" className="course-enter-button">Enter Your Course <ArrowRight size={15}/></Link>
              ) : (
                <CourseCheckoutButton/>
              )}
              <Link href="/consultation" className="course-mentor-link">Work 1-on-1 with Susan <ArrowRight size={15}/></Link>
            </div>
            <p className="course-small-note">Secure checkout is hosted by Stripe. Course access begins after verified payment.</p>
          </div>

          <div className="course-hero-console" data-aura-reveal>
            <div className="course-console-top">
              <span>BUSINESS MANAGEMENT & LEADERSHIP</span>
              <span className="course-console-live">12 MONTH ACCESS</span>
            </div>
            <div className="course-console-main">
              <PlayCircle size={38}/>
              <strong>{businessLessons.length}</strong>
              <span>guided video lessons</span>
            </div>
            <div className="course-console-stats">
              <div><strong>{businessCourse.modules.length}</strong><span>modules</span></div>
              <div><strong>{hours}h {minutes}m</strong><span>video</span></div>
              <div><strong>72</strong><span>flashcards</span></div>
              <div><strong>18</strong><span>cheat-sheet sections</span></div>
            </div>
          </div>
        </section>

        <section className="course-proof-strip">
          <span><CheckCircle2 size={14}/> 32 lesson action steps</span>
          <span><NotebookPen size={14}/> Notes + saved progress</span>
          <span><FileText size={14}/> Quizzes + study tools</span>
          <span><Trophy size={14}/> Certificate tracking</span>
        </section>

        <section className="course-section">
          <div className="course-section-heading" data-aura-reveal>
            <span className="aura-outline-pill"><Layers3 size={15}/> THE CURRICULUM</span>
            <h2>Nine modules from foundation <span>to leadership.</span></h2>
            <p>
              The platform is designed as a progression: understand the numbers, build the operating system,
              find customers, validate demand, market clearly, launch, and lead.
            </p>
          </div>
          <div className="course-module-list">
            {businessCourse.modules.map((module) => {
              const lessons = lessonNames.get(module.number) ?? [];
              return (
                <details className="course-module" key={module.number} data-aura-reveal>
                  <summary>
                    <span className="course-module-number">{String(module.number).padStart(2,"0")}</span>
                    <span className="course-module-title"><strong>{module.title}</strong><small>{module.description}</small></span>
                    <span className="course-module-count">{lessons.length} lessons</span>
                    <span className="course-module-plus">+</span>
                  </summary>
                  <div className="course-module-lessons">
                    {lessons.map((lesson, index) => <div key={lesson}><span>{String(index + 1).padStart(2,"0")}</span><p>{lesson}</p></div>)}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="course-section course-included">
          <div className="course-section-heading" data-aura-reveal>
            <span className="aura-outline-pill"><Sparkles size={15}/> MORE THAN VIDEO</span>
            <h2>The educational platform <span>keeps you working.</span></h2>
          </div>
          <div className="course-included-grid">
            {[
              [BookOpen,"32 guided lessons","Finance, strategy, marketing, operations, people, accounting, growth, customer discovery, digital marketing, launch, and leadership."],
              [NotebookPen,"Action steps + notes","Each lesson gives you a practical next step, while your private account keeps your notes and progress organized."],
              [FileText,"Quizzes + study tools","Review the material with lesson quizzes, 72 business flashcards, and 18 quick-reference cheat-sheet sections."],
              [Trophy,"Completion tracking","Your lesson completion is tracked across the platform, with certificate issuance once the program requirements are completed."],
            ].map(([Icon,title,copy])=>{
              const I=Icon as typeof BookOpen;
              return <article key={title as string} data-aura-reveal><I size={22}/><h3>{title as string}</h3><p>{copy as string}</p></article>;
            })}
          </div>
        </section>

        <section className="course-two-paths">
          <div className="course-path-card course-path-product" data-aura-reveal>
            <span>SELF-PACED</span>
            <h2>Buy the Educational Platform</h2>
            <p>Get the complete online business course and learning tools for 12 months.</p>
            <div className="course-path-price">$200 <small>one time</small></div>
            {active ? <Link href="/dashboard/courses" className="course-enter-button">Enter Course <ArrowRight size={15}/></Link> : <CourseCheckoutButton compact/>}
          </div>
          <div className="course-path-card course-path-mentor" data-aura-reveal>
            <span>HIGHER TOUCH</span>
            <h2>Work 1-on-1 with Susan</h2>
            <p>Book a consultation to explore private mentorship, strategy, coaching, accountability, and a more personalized path.</p>
            <Link href="/consultation" className="course-consult-button"><MessageCircle size={16}/> Book a Consultation</Link>
          </div>
        </section>

        <section className="course-disclaimer">
          <Clock3 size={16}/>
          <p>
            Course access lasts 12 months from verified purchase. The educational platform uses curated business
            educators and entrepreneur-focused frameworks; it does not imply endorsement by any individual entrepreneur.
          </p>
        </section>

        <AuraFooter/>
      </main>
    </div>
  );
}
