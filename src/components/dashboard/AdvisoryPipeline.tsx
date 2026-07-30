"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Building2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export type AdvisoryClientSummary = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  industry: string;
  business_stage: string;
  primary_challenge: string;
  desired_outcome: string;
  stage: string;
  next_session_at: string | null;
  created_at: string;
};

const stages = [
  "applied",
  "reviewing",
  "invited",
  "enrolled",
  "active",
  "paused",
  "completed",
  "declined",
];

export default function AdvisoryPipeline({
  initialClients,
}: {
  initialClients: AdvisoryClientSummary[];
}) {
  const supabase = createClient();
  const [clients, setClients] = useState(initialClients);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const visibleClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return clients.filter((client) => {
      const matchesStage = filter === "all" || client.stage === filter;
      const matchesQuery =
        !normalized ||
        client.name.toLowerCase().includes(normalized) ||
        client.business_name.toLowerCase().includes(normalized) ||
        client.email.toLowerCase().includes(normalized) ||
        client.industry.toLowerCase().includes(normalized);
      return matchesStage && matchesQuery;
    });
  }, [clients, filter, query]);

  async function updateStage(id: string, stage: string) {
    setNotice("");
    const { error } = await supabase
      .from("advisory_clients")
      .update({ stage })
      .eq("id", id);

    if (error) {
      setNotice("That pipeline stage could not be updated.");
      return;
    }

    setClients((current) =>
      current.map((client) => (client.id === id ? { ...client, stage } : client)),
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["all", ...stages].map((stage) => (
            <button
              type="button"
              key={stage}
              onClick={() => setFilter(stage)}
              className={`rounded-full px-4 py-2 text-[11px] font-medium capitalize transition ${
                filter === stage
                  ? "bg-[#ff75b8] text-[#ffffff]"
                  : "border border-white/[0.10] bg-white/[0.035] text-white/[0.42] hover:text-white/[0.72]"
              }`}
            >
              {stage} {stage !== "all" && `(${clients.filter((item) => item.stage === stage).length})`}
            </button>
          ))}
        </div>

        <label className="flex min-w-0 items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.035] px-4 py-2.5 text-white/[0.42] xl:w-72">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients"
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/[0.25]"
          />
        </label>
      </div>

      {notice && <p className="mt-4 text-xs text-red-300">{notice}</p>}

      {visibleClients.length === 0 ? (
        <div className="mt-6 liquid-card-dark rounded-[2rem] p-10 text-center text-sm text-white/[0.38]">
          No advisory clients match this view.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {visibleClients.map((client) => (
            <article
              key={client.id}
              className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-5 transition hover:border-white/[0.18] sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#ff75b8]">
                    <Building2 size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold tracking-[-0.02em]">{client.business_name}</p>
                    <p className="mt-1 text-xs text-white/[0.38]">{client.name} · {client.industry}</p>
                  </div>
                </div>
                <select
                  value={client.stage}
                  onChange={(event) => updateStage(client.id, event.target.value)}
                  className="rounded-full border border-white/[0.10] bg-[#12111a] px-4 py-2 text-[11px] capitalize text-white/[0.62] outline-none"
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-black/[0.15] p-4">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/[0.23]">Business stage</p>
                  <p className="mt-2 text-xs leading-5 text-white/[0.52]">{client.business_stage}</p>
                </div>
                <div className="rounded-2xl bg-black/[0.15] p-4">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/[0.23]">Next strategy call</p>
                  <p className="mt-2 text-xs leading-5 text-white/[0.52]">
                    {client.next_session_at
                      ? new Date(client.next_session_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
                      : "Not scheduled"}
                  </p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-xs leading-6 text-white/[0.38]">
                {client.primary_challenge}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.10] pt-5">
                <div className="text-[10px] text-white/[0.28]">
                  <p>{client.email}</p>
                  <p className="mt-1">Applied {new Date(client.created_at).toLocaleDateString()}</p>
                </div>
                <Link
                  href={`/dashboard/admin/advisory/${client.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-[#ff75b8]"
                >
                  Open workspace <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
