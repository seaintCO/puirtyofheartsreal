import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/saint", "/about", "/team", "/founders", "/portfolio", "/focus-areas", "/investment-approach", "/operating-model", "/business-owners", "/contact"].map(path => ({ url: `https://seaintenterprises.com${path}`, changeFrequency: "monthly" as const, priority: path === "" || path === "/saint" ? 1 : 0.6 }));
}
