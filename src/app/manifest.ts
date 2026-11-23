import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Purity of Hearts | Culture Studio",
    short_name: "Purity",
    description: "Culture-centered learning, coaching, and reflective tools.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FEFEFE",
    theme_color: "#1B3C57",
    icons: [
      { src: "/purity-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
