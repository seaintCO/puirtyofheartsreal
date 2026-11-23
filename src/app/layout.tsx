import type { Metadata } from "next";
import SiteGuide from "@/components/site/SiteGuide";
import ScrollMotion from "@/components/animations/ScrollMotion";
import PwaRegister from "@/components/pwa/PwaRegister";
import "./globals.css";
import "./purity-editorial.css";
import "./aura-reference.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gettothef.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Purity of Hearts | Culture, Coaching & Clarity",
    template: "%s | Purity of Hearts",
  },
  description:
    "Explore culture-centered coaching, education, writing tools, and ALMA with Susan Wagner at Purity of Hearts.",
  applicationName: "Purity of Hearts",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Purity", statusBarStyle: "black-translucent" },
  icons: { apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    siteName: "Purity of Hearts",
    url: siteUrl,
    title: "Purity of Hearts | Culture, Coaching & Clarity",
    description:
      "Culture-centered education, coaching, and reflective tools for thoughtful leaders and writers.",
  },
  twitter: { card: "summary", title: "Purity of Hearts | Culture, Coaching & Clarity" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#8AB0A9]/25 selection:text-[#1B3C57]">
        {children}
        <SiteGuide />
        <ScrollMotion />
        <PwaRegister />
      </body>
    </html>
  );
}
