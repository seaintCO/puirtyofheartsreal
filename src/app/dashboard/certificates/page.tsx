import { BadgeCheck, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requirePaidUser } from "@/lib/auth/require-paid-user";
import CertificateActions from "@/components/dashboard/CertificateActions";
import { businessLessons } from "@/data/business-course";

export default async function CertificatesPage() {
  const { user, profile } = await requirePaidUser();
  const supabase = await createClient();
  const { count } = await supabase
    .from("lesson_progress")
    .select("lesson_id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("course_id", "purity-main")
    .eq("completed", true);
  const complete = (count ?? 0) >= businessLessons.length;

  let certificate:
    | { certificate_number: string; issued_at: string }
    | null = null;

  if (complete) {
    const { data } = await supabase.rpc("issue_my_certificate");
    if (data) {
      certificate = {
        certificate_number: data.certificate_number,
        issued_at: data.issued_at,
      };
    }
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="print:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
          Completion
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
          Your certificate.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
          Complete all {businessLessons.length} lessons to unlock your verified
          course certificate.
        </p>
      </div>

      {!complete || !certificate ? (
        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[#d8b665]">
            <LockKeyhole size={24} />
          </div>
          <h2 className="mt-6 text-2xl font-medium">Certificate locked</h2>
          <p className="mt-3 text-sm text-white/38">
            {count ?? 0} of {businessLessons.length} lessons complete
          </p>
          <div className="mx-auto mt-6 h-1.5 max-w-md rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#d8b665]"
              style={{
                width: `${Math.min(
                  100,
                  ((count ?? 0) / businessLessons.length) * 100,
                )}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="certificate-sheet relative overflow-hidden rounded-[2rem] border border-[#d8b665]/30 bg-[#f8f1e7] p-8 text-center text-[#1f1f1f] shadow-2xl sm:p-16">
            <div className="absolute inset-4 rounded-[1.5rem] border border-[#a88643]/25" />
            <div className="relative">
              <BadgeCheck size={44} className="mx-auto text-[#a88643]" />
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-[#8d6e32]">
                Certificate of completion
              </p>
              <h2 className="mt-7 font-serif text-4xl sm:text-6xl">
                Business Management
                <br />& Leadership
              </h2>
              <p className="mt-8 text-sm text-[#1f1f1f]/50">
                This certificate is proudly presented to
              </p>
              <p className="mt-4 font-serif text-3xl italic sm:text-4xl">
                {profile.full_name || user.email}
              </p>
              <p className="mx-auto mt-7 max-w-2xl text-sm leading-6 text-[#1f1f1f]/48">
                for completing the full Purity of Hearts course curriculum and
                its guided learning activities.
              </p>
              <div className="mx-auto mt-10 flex max-w-lg flex-col justify-between gap-5 border-t border-[#1f1f1f]/10 pt-6 text-xs text-[#1f1f1f]/45 sm:flex-row">
                <span>
                  Issued{" "}
                  {new Date(certificate.issued_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>{certificate.certificate_number}</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <CertificateActions />
          </div>
        </div>
      )}
    </section>
  );
}
