import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Purity Of Hearts | Business, Faith & Legacy",
    template: "%s | Purity Of Hearts",
  },
  description:
    "Learn business through the Purity of Hearts education platform, discover PurityOS, or book a private growth strategy call with Susan Wagner.",
  openGraph: {
    title: "Purity Of Hearts",
    description:
      "Education, clarity, and private growth strategy for founders building with purpose.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#ff4fa3]/25 selection:text-[#111116]">
        {children}
      </body>
    </html>
  );
}
