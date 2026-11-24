import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/course",
  "/culture",
  "/private-advisory",
  "/purityos",
  "/education",
  "/about",
  "/consultation",
  "/community",
  "/shop",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://gettothef.com";
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: path === "/" || path === "/course" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path === "/course" ? 0.95 : path === "/culture" ? 0.85 : 0.7,
  }));
}
