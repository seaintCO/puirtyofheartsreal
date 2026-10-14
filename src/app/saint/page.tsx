import type { Metadata } from "next";
import InternalPage from "@/components/internal/InternalPage";

export const metadata: Metadata = {
  title: "Luis ‘Saint’ Altamirano | Technology Founder & SEAINT Co-Founder",
  description: "Meet Luis ‘Saint’ Altamirano, technology entrepreneur and co-founder of SEAINT Enterprises. His work spans AI, enterprise software, automation and investment initiatives.",
  alternates: { canonical: "/saint" },
  openGraph: { title: "Luis ‘Saint’ Altamirano | SEAINT Co-Founder", description: "Technology entrepreneur focused on AI, software, automation and company building.", url: "/saint", type: "profile" },
};

export default function SaintPage() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "ProfilePage", "@id": "https://seaintenterprises.com/saint#profile",
    url: "https://seaintenterprises.com/saint", mainEntity: {
      "@type": "Person", "@id": "https://seaintenterprises.com/saint#person",
      name: "Luis Altamirano", alternateName: ["Saint", "Luis Saint Altamirano", "Luis ‘Saint’ Altamirano"],
      url: "https://seaintenterprises.com/saint", jobTitle: "Technology Entrepreneur and Co-Founder",
      description: "Co-founder of SEAINT Enterprises, focused on AI, software, automation and company building.",
      worksFor: { "@type": "Organization", name: "SEAINT Enterprises", url: "https://seaintenterprises.com" },
      sameAs: ["https://www.linkedin.com/in/luis-altamirano-60b4ab3b8"],
    },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }} />
    <InternalPage eyebrow="Co-Founder · SEAINT Enterprises" title="Luis ‘Saint’" accent="Altamirano." introduction="Technology entrepreneur and co-founder of SEAINT Enterprises, working across AI, enterprise software, automation and investment initiatives." statement="Building technology-led businesses and connecting applied software with practical operations and long-term enterprise value." details={[
      { number: "01", title: "Technology & AI", meta: "Software · Automation", description: "Developing enterprise software, applied AI systems, workflow automation and technology products for operating businesses." },
      { number: "02", title: "Company Building", meta: "SEAINT Enterprises", description: "Co-founded SEAINT Enterprises with Carlos Altamirano to develop and support businesses across technology, investment and operating sectors." },
      { number: "03", title: "Entrepreneurial Background", meta: "Private Transaction · 2021", description: "His entrepreneurial background includes the sale of a company through a private transaction in 2021. Confidential counterparties and financial terms are not disclosed." },
      { number: "04", title: "Professional Profile", meta: "Verified Profile Link", description: "LinkedIn: linkedin.com/in/luis-altamirano-60b4ab3b8" },
    ]} closingTitle="Build Tomorrow, Today." closingText="Connect with SEAINT to discuss technology, business building and strategic opportunities." />
  </>;
}
