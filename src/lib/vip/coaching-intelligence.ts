export type ClientWorkspace = Record<string, string | null | undefined>;
export type ClientGoal = { title: string; category?: string | null; success_metric?: string | null; target_date?: string | null; status?: string | null };
export type ClientAction = { title: string; due_date?: string | null; status?: string | null };
export type ClientCheckin = { wins?: string | null; blockers?: string | null; decisions?: string | null; next_commitment?: string | null; coach_question?: string | null; created_at?: string | null };

export const coachIntelligence = {
  principles: [
    { title: "Trusted partner, not answer person", copy: "Create safety, listen deeply, and help the client discover the answer they can own." },
    { title: "Coach the person, not only the problem", copy: "Explore mindset, assumptions, identity, emotion, and leadership patterns underneath the business issue." },
    { title: "Challenge without judgment", copy: "Care enough to surface contradictions, avoidance, and misalignment while preserving dignity and trust." },
    { title: "Insight must become action", copy: "End every session with a specific commitment, owner, deadline, success measure, and accountability rhythm." },
    { title: "Reflect before solving", copy: "Mirror what you hear, test meaning, and slow the conversation down before introducing options or expertise." },
  ],
  sessionFlow: [
    ["Topic", "What specifically needs attention today?"],
    ["Goal", "What would make this conversation valuable?"],
    ["Reality", "What is happening, what has been tried, and what is underneath it?"],
    ["Options", "What possibilities have not been considered?"],
    ["Will", "What will the client do, by when, and how will success be measured?"],
    ["Why", "Why does this matter enough to follow through?"],
  ],
  questionBank: [
    "What matters most right now?",
    "What decision have you been avoiding?",
    "What are you not saying that needs to be heard?",
    "What story are you telling yourself, and is it still useful?",
    "What are you tolerating that you know should change?",
    "What will it cost if nothing changes?",
    "What would the leader you are becoming do next?",
    "What have you done differently since our last conversation?",
    "What commitment are you willing to own before we meet again?",
  ],
};

const has = (value: unknown) => typeof value === "string" && value.trim().length > 0;
const short = (value: unknown, max = 280) => String(value ?? "").trim().slice(0, max);

export function buildClientCoachingBrief({ workspace, goals, actions, checkins }: {
  workspace: ClientWorkspace;
  goals: ClientGoal[];
  actions: ClientAction[];
  checkins: ClientCheckin[];
}) {
  const latest = checkins[0] ?? {};
  const openGoals = goals.filter((goal) => goal.status !== "complete");
  const openActions = actions.filter((action) => action.status !== "done");
  const missing = [
    ["Personal vision", workspace.personal_vision], ["Company vision", workspace.company_vision],
    ["Values and culture", workspace.values_culture], ["Strategic advantage", workspace.strategic_advantage],
    ["Critical success factors", workspace.critical_success_factors], ["KPIs", workspace.kpis],
    ["One-year plan", workspace.one_year_plan],
  ].filter(([, value]) => !has(value)).map(([label]) => label as string);

  const prioritySignals = [
    has(latest.blockers) ? `Blocker: ${short(latest.blockers)}` : "",
    has(latest.decisions) ? `Decision: ${short(latest.decisions)}` : "",
    has(workspace.coach_focus) ? `Requested coaching focus: ${short(workspace.coach_focus)}` : "",
    openGoals[0]?.title ? `Primary active goal: ${short(openGoals[0].title)}` : "",
  ].filter(Boolean);

  const suggestedQuestions = [
    has(latest.decisions) ? "What is making this decision difficult, and what becomes possible once it is made?" : "What decision would create the greatest movement right now?",
    has(latest.blockers) ? "How might you be contributing to or tolerating this blocker?" : "What interference is preventing stronger execution?",
    has(workspace.personal_vision) && has(workspace.company_vision) ? "Where is the business currently supporting—or competing with—the personal vision?" : "What future is this business meant to create for the owner?",
    openActions.length ? "Which open commitment matters most, and what has prevented follow-through?" : "What specific commitment should leave this session with an owner and deadline?",
  ];

  return {
    completion: Math.max(0, Math.round(((7 - missing.length) / 7) * 100)),
    executiveSummary: prioritySignals.length ? prioritySignals.join(" • ") : "The client has not yet submitted enough Playbook information for a meaningful coaching brief.",
    prioritySignals,
    missing,
    suggestedQuestions,
    sessionAgenda: [
      latest.wins ? `Acknowledge progress: ${short(latest.wins)}` : "Identify meaningful progress since the last session.",
      prioritySignals[0] || "Clarify the most important topic for this session.",
      "Reflect the underlying assumption, pattern, or leadership behavior before discussing solutions.",
      openGoals[0] ? `Reconnect to goal: ${short(openGoals[0].title)}` : "Reconnect the issue to the client’s personal and company vision.",
      openActions[0] ? `Close the accountability loop on: ${short(openActions[0].title)}` : "Define one owned next action, deadline, and success measure.",
    ],
    openGoals: openGoals.slice(0, 5),
    openActions: openActions.slice(0, 7),
    latest,
  };
}
