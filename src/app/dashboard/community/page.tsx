import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const DISCORD_URL = "https://discord.gg/7ZZBJm7yX";

const communityFeatures = [
  {
    title: "Member Conversations",
    description:
      "Connect with other students, share your progress, and ask questions.",
    icon: MessageCircle,
  },
  {
    title: "Mentorship Updates",
    description:
      "Receive announcements about calls, workshops, lessons, and events.",
    icon: CalendarDays,
  },
  {
    title: "Private Support",
    description:
      "Stay connected to the Purity of Hearts mentorship community.",
    icon: Users,
  },
];

export default function Page() {
  return (
    <section className="pb-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#ff75b8]">
        Student Portal
      </span>

      <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Community
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/[0.45]">
            Join the private Discord for mentorship updates, community
            conversations, announcements, and student support.
          </p>
        </div>

        <Link
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#f472b6] px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#ff9ac8]"
        >
          Join Discord
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#ff75b8]/[0.25] bg-[#111019] p-7 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#ff75b8]/[0.10] blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff75b8]/[0.25] bg-[#ff75b8]/[0.10] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#f472b6]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Private Member Community
            </div>

            <h2 className="mt-6 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Continue your journey with the community.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.55] md:text-base">
              The private Purity of Hearts Discord is where students can stay
              connected, receive mentorship announcements, ask questions, and
              engage with other members.
            </p>

            <Link
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#f472b6] px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#ff9ac8]"
            >
              Open Private Discord
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[1.5rem] border border-white/[0.10] bg-black/[0.20] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff75b8]/[0.15] text-[#f472b6]">
                <MessageCircle className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Purity of Hearts Discord
                </h3>

                <p className="mt-1 text-xs text-white/[0.40]">
                  Private access for enrolled members
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Mentorship and program announcements",
                "Member questions and conversations",
                "Live calls, workshops, and event updates",
                "Private student support",
              ].map((item) => (
                <div
                  key={item}
                  className="liquid-subcard-dark rounded-2xl px-4 py-3 text-sm text-white/[0.60]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {communityFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="rounded-[1.5rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff75b8]/[0.10] text-[#f472b6]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/[0.45]">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
