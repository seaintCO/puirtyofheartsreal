export default function Button({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button className={`rounded-full px-6 py-3 text-sm font-medium transition ${className}`}>
      {children}
    </button>
  );
}
