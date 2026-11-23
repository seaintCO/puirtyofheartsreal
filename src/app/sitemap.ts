import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/culture",
  "/private-advisory",
  "/purityos",
  "/education",
  "/courses",
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
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path === "/culture" ? 0.9 : 0.7,
  }));
}
