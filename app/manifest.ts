import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HeyVish — Srivishnu Ramakrishnan",
    short_name: "HeyVish",
    description:
      "Independent iOS developer building Stepsly, Expenly, GrowthKit, and MNML.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f2",
    theme_color: "#1c1916",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
