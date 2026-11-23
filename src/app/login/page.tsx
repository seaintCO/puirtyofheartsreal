import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import { safeInternalPath } from "@/lib/security/redirects";
import AuraHeader from "@/components/layout/AuraHeader";
import PurityAuraBackdrop from "@/components/effects/PurityAuraBackdrop";

export const metadata={title:"Member Sign In",robots:{index:false,follow:false}};

export default async function LoginPage({searchParams}:{searchParams:Promise<{next?:string}>}){
 const next=safeInternalPath((await searchParams).next,"/dashboard");
 return <div className="aura-page"><main className="aura-shell aura-login-shell"><PurityAuraBackdrop/><div className="aura-hatch" aria-hidden="true"/><AuraHeader/>
  <section className="aura-login-grid"><div className="aura-login-copy"><span className="aura-outline-pill"><ShieldCheck size={15}/> Private member access</span><h1>Your learning.<br/><span>Your account.</span></h1><p>Sign in to continue to Culture Studio, lessons, saved notes, writing tools, and ALMA. New here? Create your account, verify your email, then return to Membership.</p><Link href="/membership" className="aura-secondary-button"><ArrowLeft size={15}/> Membership details</Link></div><div className="aura-auth-shell"><AuthForm next={next}/></div></section>
 </main></div>
}
