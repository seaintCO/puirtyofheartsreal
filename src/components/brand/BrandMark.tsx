type BrandMarkProps = {
  size?: number;
  variant?: "sage" | "navy" | "gold";
  className?: string;
};

export default function BrandMark({
  size = 42,
  variant = "sage",
  className = "",
}: BrandMarkProps) {
  const background = variant === "navy" ? "#1B3C57" : variant === "gold" ? "#CCB074" : "#8AB0A9";
  const foreground = variant === "navy" ? "#CCB074" : "#FEFEFE";

  return (
    <span
      className={"inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.8rem] " + className}
      style={{ width: size, height: size, backgroundColor: background }}
      aria-hidden="true"
    >
      <svg width="76%" height="76%" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M40 5C37 13 28 18 28 28c0 6 4 11 12 17 8-6 12-11 12-17 0-10-9-15-12-23Z" fill={foreground} />
        <path d="M38.5 67C29 53 19 45 7 46c6-9 16-13 24-10 5 2 8 5 9 10 1 7 0 13-1.5 21Z" fill={foreground} />
        <path d="M41.5 67C51 53 61 45 73 46c-6-9-16-13-24-10-5 2-8 5-9 10-1 7 0 13 1.5 21Z" fill={foreground} />
      </svg>
    </span>
  );
}
