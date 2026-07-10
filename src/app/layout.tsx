import "./globals.css";

export const metadata = {
  title: "Purity of Heart | Spiritual Journey",
  description: "Courses, coaching, devotionals, community, and biblical teachings.",
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
