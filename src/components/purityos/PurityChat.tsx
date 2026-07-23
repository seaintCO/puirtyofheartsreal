"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  BookHeart,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  HeartHandshake,
  LoaderCircle,
  Menu,
  MessageCircle,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { DISCORD_URL, PURITYOS_DAILY_LIMIT } from "@/lib/purityos";

type Conversation = {
  id: string;
  title: string;
  updated_at: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

const starters = [
  {
    icon: BriefcaseBusiness,
    label: "Business clarity",
    prompt: "Help me think through the biggest bottleneck in my business.",
  },
  {
    icon: HeartHandshake,
    label: "A hard season",
    prompt: "I’m going through a hard season and need a grounded next step.",
  },
  {
    icon: BookHeart,
    label: "Faith & motivation",
    prompt: "Give me faith-centered encouragement for what I’m facing today.",
  },
];

export default function PurityChat({
  conversations: initialConversations,
  messages: initialMessages,
  activeConversationId: initialConversationId,
  memberName,
}: {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  memberName: string;
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function newChat() {
    setConversationId(null);
    setMessages([]);
    setInput("");
    setNotice("");
    setMenuOpen(false);
    window.history.replaceState({}, "", "/purityos/chat");
  }

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    preset?: string,
  ) {
    event?.preventDefault();
    const outgoing = (preset ?? input).trim();
    if (!outgoing || loading) return;

    setInput("");
    setNotice("");
    setLoading(true);
    const optimisticId = `optimistic-${Date.now()}`;
    setMessages((current) => [
      ...current,
      {
        id: optimisticId,
        role: "user",
        content: outgoing,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      const response = await fetch("/api/purityos/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: outgoing }),
      });
      const data = (await response.json()) as {
        conversationId?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.message || !data.conversationId) {
        throw new Error(data.error || "PurityOS could not respond.");
      }

      setConversationId(data.conversationId);
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message!,
          created_at: new Date().toISOString(),
        },
      ]);

      if (!conversationId) {
        const title = outgoing.split(/\s+/).slice(0, 7).join(" ").slice(0, 80);
        setConversations((current) => [
          {
            id: data.conversationId!,
            title,
            updated_at: new Date().toISOString(),
          },
          ...current,
        ]);
        window.history.replaceState(
          {},
          "",
          `/purityos/chat?conversation=${data.conversationId}`,
        );
      }
    } catch (reason) {
      setMessages((current) =>
        current.filter((message) => message.id !== optimisticId),
      );
      setInput(outgoing);
      setNotice(reason instanceof Error ? reason.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteConversation(id: string) {
    if (!window.confirm("Delete this conversation permanently?")) return;

    const response = await fetch(`/api/purityos/conversations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setNotice("That conversation could not be deleted.");
      return;
    }

    setConversations((current) => current.filter((item) => item.id !== id));
    if (conversationId === id) newChat();
  }

  async function manageBilling() {
    const response = await fetch("/api/purityos/billing", { method: "POST" });
    const data = (await response.json()) as { url?: string; error?: string };
    if (data.url) window.location.href = data.url;
    else setNotice(data.error || "Billing could not be opened.");
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <Link href="/" className="text-sm font-semibold tracking-[0.12em]">
          PURITY<span className="text-[#dfbe70]">OS</span>
        </Link>
        <button
          onClick={() => setMenuOpen(false)}
          className="rounded-full p-2 text-white/60 lg:hidden"
          aria-label="Close conversations"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={newChat}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#dfbe70]/30 bg-[#dfbe70]/10 px-4 py-3 text-sm font-medium text-[#efd58e] transition hover:bg-[#dfbe70]/20"
        >
          <Plus size={17} />
          New conversation
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
        {conversations.length === 0 ? (
          <p className="px-3 py-6 text-xs leading-5 text-white/35">
            Your saved conversations will appear here.
          </p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-1 rounded-xl ${
                conversation.id === conversationId
                  ? "bg-white/10"
                  : "hover:bg-white/[0.05]"
              }`}
            >
              <Link
                href={`/purityos/chat?conversation=${conversation.id}`}
                onClick={() => setMenuOpen(false)}
                className="min-w-0 flex-1 truncate px-3 py-3 text-sm text-white/65"
              >
                {conversation.title}
              </Link>
              <button
                type="button"
                onClick={() => deleteConversation(conversation.id)}
                className="mr-2 rounded-lg p-2 text-white/25 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                aria-label={`Delete ${conversation.title}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="space-y-2 border-t border-white/10 p-4">
        <button
          type="button"
          onClick={manageBilling}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-white/45 transition hover:bg-white/5 hover:text-white/70"
        >
          <CreditCard size={15} />
          Manage membership
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-white/45 transition hover:bg-white/5 hover:text-white/70"
        >
          <ChevronLeft size={15} />
          Back to Purity of Hearts
        </Link>
      </div>
    </div>
  );

  return (
    <main className="flex h-screen overflow-hidden bg-[#0d0c0b] text-white">
      <aside className="hidden h-full w-72 shrink-0 border-r border-white/10 bg-black/20 lg:block">
        {sidebar}
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <aside className="relative h-full w-[86%] max-w-xs border-r border-white/10 bg-[#11100e]">
            {sidebar}
          </aside>
        </div>
      )}

      <section className="relative flex min-w-0 flex-1 flex-col">
        <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#b9954a]/10 blur-[130px]" />

        <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/10 bg-[#0d0c0b]/75 px-4 backdrop-blur-2xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-white/10 p-2.5 text-white/60 lg:hidden"
              aria-label="Open conversations"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-sm font-medium">PurityOS</p>
              <p className="text-[11px] text-white/35">
                Faith-centered clarity for {memberName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={DISCORD_URL}
              target="_blank"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/55 transition hover:bg-white/5 sm:flex"
            >
              <MessageCircle size={14} />
              Discord
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-2 rounded-full bg-[#dfbe70] px-4 py-2 text-xs font-semibold text-[#17130c]"
            >
              <CalendarDays size={14} />
              1:1 with Susan
            </Link>
          </div>
        </header>

        <div className="relative z-10 min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex min-h-full max-w-3xl flex-col px-4 py-8 sm:px-6">
            {messages.length === 0 ? (
              <div className="my-auto py-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dfbe70]/25 bg-[#dfbe70]/10 text-[#e2c477] shadow-[0_0_50px_rgba(216,182,101,0.12)]">
                  <Sparkles size={25} />
                </div>
                <h1 className="mt-6 text-center font-serif text-3xl sm:text-4xl">
                  What’s on your heart?
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-white/42">
                  Talk through business decisions, life pressure, personal
                  growth, or a season where you need perspective.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {starters.map(({ icon: Icon, label, prompt }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => sendMessage(undefined, prompt)}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#dfbe70]/25 hover:bg-white/[0.06]"
                    >
                      <Icon size={19} className="text-[#d8b665]" />
                      <p className="mt-4 text-sm font-medium">{label}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/35">
                        {prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-7 pb-8">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={
                        message.role === "user"
                          ? "max-w-[88%] rounded-[1.4rem] rounded-br-md bg-[#d8b665] px-5 py-4 text-sm leading-6 text-[#17130c]"
                          : "max-w-[92%] whitespace-pre-wrap text-sm leading-7 text-white/72"
                      }
                    >
                      {message.content}
                    </div>
                  </article>
                ))}
                {loading && (
                  <div className="flex items-center gap-3 text-sm text-white/35">
                    <LoaderCircle size={16} className="animate-spin text-[#d8b665]" />
                    PurityOS is reflecting…
                  </div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-[#0d0c0b]/85 px-4 pb-4 pt-3 backdrop-blur-2xl sm:px-6">
          <form
            onSubmit={sendMessage}
            className="mx-auto flex max-w-3xl items-end gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-2 pl-4 shadow-2xl transition focus-within:border-[#d8b665]/35"
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              rows={1}
              maxLength={4000}
              placeholder="Ask about business, life, faith, or what you’re facing…"
              className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent py-3 text-sm leading-5 text-white outline-none placeholder:text-white/25"
            />
            <button
              disabled={!input.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d8b665] text-[#17130c] transition hover:bg-[#efd386] disabled:opacity-30"
              aria-label="Send message"
            >
              <ArrowUp size={18} />
            </button>
          </form>
          <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between gap-4 text-[10px] leading-4 text-white/25">
            <p>
              AI support, not therapy or emergency care. Verify important advice.
            </p>
            <p className="hidden shrink-0 sm:block">
              Up to {PURITYOS_DAILY_LIMIT} messages/day
            </p>
          </div>
          {notice && (
            <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-red-300">
              {notice}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

