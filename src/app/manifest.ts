import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Purity of Hearts",
    short_name: "Purity",
    description: "Culture-centered learning, coaching, reflection, writing tools, and ALMA.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#112F42",
    theme_color: "#1B3C57",
    categories: ["education", "productivity", "lifestyle"],
    icons: [
      { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Culture Studio", short_name: "Culture", url: "/culture", icons: [{ src: "/pwa-icon-192.png", sizes: "192x192" }] },
      { name: "ALMA", short_name: "ALMA", url: "/purityos", icons: [{ src: "/pwa-icon-192.png", sizes: "192x192" }] },
      { name: "Membership", short_name: "Membership", url: "/membership", icons: [{ src: "/pwa-icon-192.png", sizes: "192x192" }] },
    ],
  };
}
