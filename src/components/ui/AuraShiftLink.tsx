import Link from "next/link";
import type { ReactNode } from "react";

export default function AuraShiftLink({
  href,
  label,
  icon,
  variant = "primary",
  className = "",
}: {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link href={href} className={"aura-shift-button aura-shift-" + variant + " " + className}>
      {icon ? <span className="aura-shift-icon">{icon}</span> : null}
      <span className="aura-shift-window" aria-label={label}>
        <span className="aura-shift-label">{label}</span>
        <span className="aura-shift-label aura-shift-label-clone" aria-hidden="true">{label}</span>
      </span>
    </Link>
  );
}
