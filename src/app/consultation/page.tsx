import { CalendarDays, Clock3, Compass, MessageCircle, Target } from "lucide-react";
import AuraHeader from "@/components/layout/AuraHeader";
import AuraFooter from "@/components/layout/AuraFooter";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";
import AuraMotion from "@/components/effects/AuraMotion";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export const metadata={title:"Talk with Susan | Purity of Hearts",description:"Request a private conversation with Susan Wagner."};

export default function ConsultationPage(){
 const reasons=[[MessageCircle,"Coaching practice"],[Compass,"Culture & leadership"],[Target,"Growth & direction"],[CalendarDays,"Programs & availability"]];
 return <div className="aura-page"><AuraMotion/><main className="aura-shell aura-inner-page"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
   <section className="aura-consult-grid">
    <div className="aura-consult-copy" data-aura-reveal><span className="aura-outline-pill"><MessageCircle size={15}/> Start a conversation</span><h1>Tell Susan what<br/>you're <span>building.</span></h1><p>Share where you are, who you serve, and what kind of support would be useful. This form sends a real consultation request into the Purity admin workflow.</p><div className="aura-consult-reasons">{reasons.map(([Icon,label])=>{const I=Icon as typeof MessageCircle;return <span key={label as string}><I size={16}/>{label as string}</span>})}</div><p className="aura-consult-note"><Clock3 size={15}/> Availability, fit, and pricing are discussed directly with Susan.</p></div>
    <div className="aura-form-shell" data-aura-reveal><ConsultationForm/></div>
   </section>
   <AuraFooter/>
 </main></div>
}
