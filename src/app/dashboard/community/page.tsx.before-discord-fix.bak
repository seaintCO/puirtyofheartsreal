import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ||
  "https://discord.gg/7ZZBJm7yX";

const benefits = [
  {
    icon: MessageCircle,
    title: "Member conversations",
    description:
      "Connect with other students, ask questions, and share what you are building.",
  },
  {
    icon: CalendarDays,
    title: "Live updates",
    description:
      "Receive announcements, mentorship updates, community calls, and event details.",
  },
  {
    icon: Users,
    title: "Private support",
    description:
      "Get support from the Purity of Hearts community throughout your journey.",
  },
];

export default function Page() {
  return (
    <section className="pb-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
        Student Portal
      </span>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Community
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            Join the private Purity of Hearts Discord for mentorship updates,
            member conversations, announcements, and support.
          </p>
        </div>

        <Link
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#D3B25F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E2C774]"
        >
          Join Discord
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#C9A75D]/25 bg-[#1A1812] p-7 md:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#C9A75D]/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A75D]/25 bg-[#C9A75D]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#D8BB72]">
              <Sparkles className="h-3.5 w-3.5" />
              Private Member Access
            </div>

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              You do not have to build alone.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Continue the conversation beyond the lessons. Meet other members,
              receive important updates, ask questions, and stay connected to
              the Purity of Hearts mentorship community.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D3B25F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E2C774]"
              >
                Open the Private Discord
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="inline-flex items-center gap-2 text-sm text-white/45">
                <ShieldCheck className="h-4 w-4 text-[#C9A75D]" />
                Access reserved for members
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9A75D]/15 text-[#D3B25F]">
                <MessageCircle className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Purity of Hearts Discord
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Private student community
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Mentorship announcements",
                "Student questions and support",
                "Community conversations",
                "Live session and event updates",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A75D]" />

                  <span className="text-sm text-white/60">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A75D]/20 bg-[#C9A75D]/10 text-[#C9A75D]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/45">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
