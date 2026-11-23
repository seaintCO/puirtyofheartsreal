import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/login", "/purityos/chat", "/success", "/enroll"],
    },
    sitemap: (process.env.NEXT_PUBLIC_SITE_URL || "https://gettothef.com") + "/sitemap.xml",
  };
}
