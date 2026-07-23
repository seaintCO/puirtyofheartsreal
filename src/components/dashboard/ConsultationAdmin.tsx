"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  topic: string;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statuses = ["new", "contacted", "scheduled", "completed", "declined"];

export default function ConsultationAdmin({
  initialRequests,
}: {
  initialRequests: Consultation[];
}) {
  const supabase = createClient();
  const [requests, setRequests] = useState(initialRequests);
  const [notice, setNotice] = useState("");

  async function updateStatus(id: string, status: string) {
    setNotice("");
    const { error } = await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id);
    if (error) {
      setNotice("That status could not be updated.");
      return;
    }
    setRequests((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  if (requests.length === 0) {
    return (
      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center text-sm text-white/40">
        No consultation requests yet.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {notice && <p className="text-xs text-red-300">{notice}</p>}
      {requests.map((request) => (
        <article
          key={request.id}
          className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-medium">{request.name}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                <a href={`mailto:${request.email}`} className="hover:text-[#d8b665]">
                  {request.email}
                </a>
                {request.phone && <span>{request.phone}</span>}
                <span>{new Date(request.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <select
              value={request.status}
              onChange={(event) => updateStatus(request.id, event.target.value)}
              className="rounded-full border border-white/10 bg-[#211f1b] px-4 py-2 text-xs capitalize text-white/65 outline-none"
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-black/15 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/25">
                Topic
              </p>
              <p className="mt-2 text-sm text-white/65">{request.topic}</p>
            </div>
            <div className="rounded-xl bg-black/15 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/25">
                Preferred date
              </p>
              <p className="mt-2 text-sm text-white/65">
                {request.preferred_date || "No preference"}
              </p>
            </div>
            <div className="rounded-xl bg-black/15 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/25">
                Preferred time
              </p>
              <p className="mt-2 text-sm text-white/65">
                {request.preferred_time || "No preference"}
              </p>
            </div>
          </div>
          {request.message && (
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/45">
              {request.message}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

