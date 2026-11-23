import SiteGuide from "@/components/site/SiteGuide";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Purity of Hearts | Culture, Coaching & Clarity",
    template: "%s | Purity Of Hearts",
  },
  description:
    "Explore culture-centered coaching, education, writing tools, and ALMA with Susan Wagner at Purity of Hearts.",
  openGraph: {
    title: "Purity Of Hearts",
    description:
      "Culture-centered education, coaching, and reflective tools for thoughtful leaders and writers.",
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
      <body className="antialiased selection:bg-[#8AB0A9]/25 selection:text-[#1B3C57]">
        {children}
        <SiteGuide />
      </body>
    </html>
  );
}
