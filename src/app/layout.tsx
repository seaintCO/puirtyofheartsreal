import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Purity of Hearts | Faith, Business & Personal Growth",
    template: "%s | Purity of Hearts",
  },
  description:
    "Courses, faith-centered coaching, private community, PurityOS, and practical tools for business and personal growth.",
  openGraph: {
    title: "Purity of Hearts",
    description:
      "Faith, business, and personal growth in one private member experience.",
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
      <body className="antialiased selection:bg-[#C9A75D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
