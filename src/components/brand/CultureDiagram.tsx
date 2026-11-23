"use client";

import { useState } from "react";

type Principle = "listen" | "understand" | "lead";

const principles: Record<Principle, { number: string; title: string; description: string }> = {
  listen: { number: "01", title: "Listen", description: "Every story deserves the space to be heard." },
  understand: { number: "02", title: "Understand", description: "Find the context before forming a conclusion." },
  lead: { number: "03", title: "Lead", description: "Let what you learn change how you show up." },
};

export default function CultureDiagram({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<Principle>("listen");
  const selected = principles[active];

  return (
    <div className={"ph-diagram" + (compact ? " ph-diagram--compact" : "")}>
      <div className="ph-diagram-surface">
        <svg className="ph-diagram-orbit" viewBox="0 0 560 560" role="img" aria-label="An animated culture compass illustrating listening, understanding and leading">
          <defs>
            <linearGradient id="ph-orbit-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#8AB0A9" stopOpacity=".7" />
              <stop offset="1" stopColor="#CCB074" stopOpacity=".35" />
            </linearGradient>
            <radialGradient id="ph-orbit-core">
              <stop stopColor="#E4EDE9" />
              <stop offset="1" stopColor="#F4F6F1" />
            </radialGradient>
          </defs>
          <circle cx="280" cy="280" r="232" fill="none" stroke="#1B3C57" strokeOpacity=".07" />
          <circle className="ph-orbit-spin" cx="280" cy="280" r="205" fill="none" stroke="url(#ph-orbit-stroke)" strokeWidth="1.2" strokeDasharray="250 1050" strokeLinecap="round" />
          <circle cx="280" cy="280" r="162" fill="none" stroke="#1B3C57" strokeOpacity=".13" strokeDasharray="2 8" />
          <circle className="ph-orbit-spin ph-orbit-spin--reverse" cx="280" cy="280" r="135" fill="none" stroke="#C6AD78" strokeWidth="1.1" strokeDasharray="140 750" strokeLinecap="round" />
          <circle cx="280" cy="280" r="102" fill="url(#ph-orbit-core)" stroke="#8AB0A9" strokeOpacity=".35" strokeWidth="1" />
          <path d="M280 48V75M280 485V512M48 280H75M485 280H512" stroke="#1B3C57" strokeOpacity=".18" strokeWidth="1.2" />
          <path d="M280 81L280 165M161 399L225 336M400 399L335 335" stroke="#8AB0A9" strokeOpacity=".3" strokeDasharray="3 7" fill="none" />
          <g className="ph-orbit-emblem" transform="translate(220 212) scale(1.5)">
            <path d="M40 5C37 13 28 18 28 28c0 6 4 11 12 17 8-6 12-11 12-17 0-10-9-15-12-23Z" fill="#1B3C57"/>
            <path d="M38.5 67C29 53 19 45 7 46c6-9 16-13 24-10 5 2 8 5 9 10 1 7 0 13-1.5 21Z" fill="#1B3C57"/>
            <path d="M41.5 67C51 53 61 45 73 46c-6-9-16-13-24-10-5 2-8 5-9 10-1 7 0 13 1.5 21Z" fill="#1B3C57"/>
          </g>
          <circle cx="280" cy="48" r="4" fill="#CCB074"/>
          <circle cx="78" cy="395" r="3" fill="#8AB0A9"/>
          <circle cx="484" cy="398" r="3" fill="#CCB074"/>
          <text x="280" y="32" fontSize="9" letterSpacing="4" textAnchor="middle" fill="#738B88">CULTURE / PRACTICE</text>
          <text x="280" y="535" fontSize="10" letterSpacing="4" textAnchor="middle" fill="#738B88">PURITY OF HEARTS</text>
        </svg>
        <div className="ph-diagram-innerline" aria-hidden="true"/>
        <div className="ph-diagram-controls" aria-label="Explore three principles">
          {(["listen", "understand", "lead"] as Principle[]).map(key => (
            <button
              key={key}
              type="button"
              aria-pressed={key === active}
              onClick={() => setActive(key)}
              className={"ph-diagram-point ph-diagram-point--" + key + (key === active ? " is-active" : "")}
            >
              <span className="ph-diagram-point-dot" aria-hidden="true"/>
              <span>{principles[key].title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="ph-diagram-caption" aria-live="polite">
        <span className="ph-diagram-count">{selected.number} / 03</span>
        <span><strong>{selected.title}.</strong> {selected.description}</span>
      </div>
    </div>
  );
}
