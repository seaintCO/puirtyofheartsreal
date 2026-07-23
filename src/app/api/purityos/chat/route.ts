import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PURITYOS_SYSTEM_PROMPT } from "@/lib/purityos";

export const runtime = "nodejs";

const crisisPattern =
  /\b(kill myself|suicide|suicidal|end my life|hurt myself|self[- ]harm|don'?t want to live|want to die|in immediate danger)\b/i;

const crisisResponse =
  "I’m really sorry you’re carrying this right now. Your immediate safety matters more than continuing this chat. Please move away from anything you could use to hurt yourself, contact your local emergency services or a local crisis line now, and reach a trusted person who can stay with you in person. PurityOS is not an emergency or mental-health service.";
const moderatedResponse =
  "I can’t help with that request. I can still support you with a safe next step, a business decision, a grounded reflection, or faith-centered encouragement.";

type IncomingBody = {
  conversationId?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "PurityOS is not configured yet." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as IncomingBody;
    const message = body.message?.trim();

    if (!message || message.length > 4000) {
      return NextResponse.json(
        { error: "Please enter a message between 1 and 4,000 characters." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please log in." }, { status: 401 });
    }

    const { data: hasAccess } = await supabase.rpc("has_purityos_access");
    if (!hasAccess) {
      return NextResponse.json(
        { error: "An active PurityOS membership is required." },
        { status: 403 },
      );
    }

    let conversationId = body.conversationId;
    if (conversationId) {
      const { data: ownedConversation } = await supabase
        .from("purityos_conversations")
        .select("id")
        .eq("id", conversationId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (!ownedConversation) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 },
        );
      }
    }

    const { error: usageError } = await supabase.rpc(
      "consume_purityos_message",
    );
    if (usageError) {
      return NextResponse.json(
        { error: "You’ve reached today’s 30-message limit. Come back tomorrow." },
        { status: 429 },
      );
    }

    if (!conversationId) {
      const title = message.split(/\s+/).slice(0, 7).join(" ").slice(0, 80);
      const { data: conversation, error } = await supabase
        .from("purityos_conversations")
        .insert({ user_id: user.id, title: title || "New conversation" })
        .select("id")
        .single();

      if (error || !conversation) throw error ?? new Error("Conversation failed");
      conversationId = conversation.id;
    }

    const { error: userMessageError } = await supabase
      .from("purityos_messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "user",
        content: message,
      });
    if (userMessageError) throw userMessageError;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const moderation = await openai.moderations.create({
      model: "omni-moderation-latest",
      input: message,
    });
    const moderationResult = moderation.results[0];
    const selfHarm =
      moderationResult?.categories["self-harm"] ||
      moderationResult?.categories["self-harm/intent"] ||
      moderationResult?.categories["self-harm/instructions"];
    const safetyMessage =
      selfHarm || crisisPattern.test(message)
        ? crisisResponse
        : moderatedResponse;

    if (moderationResult?.flagged || crisisPattern.test(message)) {
      const { error } = await supabase.from("purityos_messages").insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "assistant",
        content: safetyMessage,
      });
      if (error) throw error;

      return NextResponse.json({
        conversationId,
        message: safetyMessage,
        safety: true,
      });
    }

    const { data: history, error: historyError } = await supabase
      .from("purityos_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(12);
    if (historyError) throw historyError;

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
      instructions: PURITYOS_SYSTEM_PROMPT,
      input: (history ?? []).map((item) => ({
        role: item.role as "user" | "assistant",
        content: item.content,
      })),
      reasoning: { effort: "low" },
      max_output_tokens: 650,
      store: false,
    });

    const assistantMessage =
      response.output_text?.trim() ||
      "I’m here with you. Could you share a little more about what feels most important right now?";

    const outputModeration = await openai.moderations.create({
      model: "omni-moderation-latest",
      input: assistantMessage,
    });
    const finalMessage = outputModeration.results[0]?.flagged
      ? "I want to respond carefully, but I can’t provide that answer here. If this involves your safety or health, please contact an appropriate licensed professional or local emergency support."
      : assistantMessage;

    const { error: assistantError } = await supabase
      .from("purityos_messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "assistant",
        content: finalMessage,
      });
    if (assistantError) throw assistantError;

    await supabase
      .from("purityos_conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return NextResponse.json({
      conversationId,
      message: finalMessage,
      safety: false,
    });
  } catch (error) {
    console.error("PurityOS chat error:", error);
    return NextResponse.json(
      { error: "PurityOS could not respond. Please try again." },
      { status: 500 },
    );
  }
}
