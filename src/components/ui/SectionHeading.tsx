export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-16 ${center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}`}>
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#C8B273]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-6 text-base font-light leading-8 text-neutral-500 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}



