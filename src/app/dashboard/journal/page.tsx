"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Calendar,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  entry_date: string;
  created_at: string;
  updated_at: string;
};

function createDefaultTitle() {
  return `Reflection — ${new Date().toLocaleDateString()}`;
}

export default function JournalPage() {
  const supabase = createClient();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState(createDefaultTitle());
  const [content, setContent] = useState("");
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .select(
        "id, title, content, entry_date, created_at, updated_at",
      )
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const loadedEntries = data ?? [];
    setEntries(loadedEntries);

    if (loadedEntries.length > 0) {
      const first = loadedEntries[0];
      setActiveId(first.id);
      setTitle(first.title);
      setContent(first.content);
      setEntryDate(first.entry_date);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  function startNewEntry() {
    setActiveId(null);
    setTitle(createDefaultTitle());
    setContent("");
    setEntryDate(new Date().toISOString().slice(0, 10));
    setMessage("");
  }

  function selectEntry(entry: JournalEntry) {
    setActiveId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setEntryDate(entry.entry_date);
    setMessage("");
  }

  async function saveEntry() {
    setSaving(true);
    setMessage("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      window.location.href = "/login";
      return;
    }

    const normalizedTitle =
      title.trim() || createDefaultTitle();

    if (activeId) {
      const { error } = await supabase
        .from("journal_entries")
        .update({
          title: normalizedTitle,
          content,
          entry_date: entryDate,
        })
        .eq("id", activeId)
        .eq("user_id", user.id);

      if (error) {
        setMessage(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          title: normalizedTitle,
          content,
          entry_date: entryDate,
        })
        .select(
          "id, title, content, entry_date, created_at, updated_at",
        )
        .single();

      if (error) {
        setMessage(error.message);
        setSaving(false);
        return;
      }

      setActiveId(data.id);
    }

    await loadEntries();
    setMessage("Journal entry saved.");
    setSaving(false);
  }

  async function deleteEntry() {
    if (!activeId) {
      startNewEntry();
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", activeId)
      .eq("user_id", user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setActiveId(null);
    setTitle(createDefaultTitle());
    setContent("");
    setEntryDate(new Date().toISOString().slice(0, 10));

    await loadEntries();
  }

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Personal Journal
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Journal
          </h1>

          <p className="mt-3 text-sm text-white/45">
            Your private reflections, prayers, ideas, and coaching notes.
          </p>
        </div>

        <button
          type="button"
          onClick={startNewEntry}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-6 py-3 text-sm font-medium text-[#111]"
        >
          <Plus size={17} />
          New Entry
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
            Recent Entries
          </p>

          {loading ? (
            <div className="flex items-center gap-2 py-6 text-sm text-white/40">
              <Loader2 className="animate-spin" size={16} />
              Loading entries
            </div>
          ) : entries.length === 0 ? (
            <p className="py-6 text-sm leading-relaxed text-white/35">
              No journal entries yet. Start your first reflection.
            </p>
          ) : (
            entries.map((entry) => (
              <button
                type="button"
                key={entry.id}
                onClick={() => selectEntry(entry)}
                className={`mb-3 w-full rounded-2xl p-4 text-left transition ${
                  activeId === entry.id
                    ? "bg-[#C9A75D] text-[#111]"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                }`}
              >
                <p className="truncate text-sm font-medium">
                  {entry.title}
                </p>

                <p className="mt-2 text-xs opacity-50">
                  {new Date(
                    `${entry.entry_date}T12:00:00`,
                  ).toLocaleDateString()}
                </p>
              </button>
            ))
          )}
        </aside>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full border-0 bg-transparent text-2xl font-semibold text-white outline-none"
                placeholder="Journal title"
              />

              <label className="mt-3 flex items-center gap-2 text-xs text-white/35">
                <Calendar size={14} />

                <input
                  type="date"
                  value={entryDate}
                  onChange={(event) =>
                    setEntryDate(event.target.value)
                  }
                  className="bg-transparent outline-none"
                />
              </label>
            </div>

            {activeId ? (
              <button
                type="button"
                onClick={deleteEntry}
                className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-400/10"
              >
                <Trash2 size={15} />
                Delete
              </button>
            ) : null}
          </div>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What is God teaching you today?"
            className="min-h-[420px] w-full resize-none rounded-[1.5rem] border border-white/10 bg-[#181818] p-6 text-sm leading-relaxed text-white/75 outline-none focus:border-[#C9A75D]"
          />

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={saveEntry}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#111] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}

              {saving ? "Saving" : "Save Entry"}
            </button>

            {message ? (
              <p className="text-sm text-white/50">{message}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
