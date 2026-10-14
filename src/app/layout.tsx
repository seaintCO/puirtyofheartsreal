import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seaintenterprises.com"),
  title: { default: "SEAINT Enterprises | Technology, Investment & Company Building", template: "%s | SEAINT Enterprises" },
  description: "SEAINT Enterprises is a technology-focused investment and operating company co-founded by Luis ‘Saint’ Altamirano and Carlos Altamirano.",
  openGraph: { type: "website", siteName: "SEAINT Enterprises", title: "SEAINT Enterprises | Technology & Private Investment", description: "Technology, company building, and private investment." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
