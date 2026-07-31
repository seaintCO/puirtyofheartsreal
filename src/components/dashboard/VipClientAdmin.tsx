"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, LoaderCircle } from "lucide-react";

type Client = { id: string; full_name: string | null; email: string | null; vip_access: boolean; paid: boolean; updated_at: string };

export default function VipClientAdmin({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState(initialClients);
  const [saving, setSaving] = useState("");

  async function toggle(client: Client) {
    setSaving(client.id);
    const enabled = !client.vip_access;
    try {
      const response = await fetch("/api/admin/vip", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: client.id, enabled }) });
      if (!response.ok) throw new Error("Could not update");
      setClients((current) => current.map((item) => item.id === client.id ? { ...item, vip_access: enabled, paid: enabled || item.paid } : item));
    } finally { setSaving(""); }
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">Susan’s CRM</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">VIP client access</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">Grant GTTF VIP access. VIP clients automatically receive the full course platform and their private interactive growth dashboard.</p></div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/45">{clients.filter((client) => client.vip_access).length} active VIP clients</div>
      </div>
      <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035]">
        {clients.map((client) => (
          <div key={client.id} className="flex flex-col gap-4 border-b border-white/10 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4"><span className={`flex h-11 w-11 items-center justify-center rounded-full ${client.vip_access ? "bg-gradient-to-br from-[#f45aa4] to-[#8b5cf6]" : "bg-white/[0.06]"}`}><Crown size={17} /></span><div><p className="text-sm font-semibold">{client.full_name || "Member"}</p><p className="mt-1 text-xs text-white/35">{client.email}</p></div></div>
            <div className="flex items-center gap-2">{client.vip_access && <Link href={`/dashboard/admin/vip/${client.id}`} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6] px-5 py-2.5 text-xs font-semibold text-white">Open client room <ArrowRight size={14}/></Link>}<button onClick={() => toggle(client)} disabled={saving === client.id} className={`rounded-full px-5 py-2.5 text-xs font-semibold ${client.vip_access ? "border border-white/10 text-white/55" : "bg-white text-black"}`}>{saving === client.id ? <LoaderCircle size={14} className="animate-spin" /> : client.vip_access ? "Remove VIP" : "Grant VIP"}</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
