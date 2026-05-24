import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HeyVish — Srivishnu Ramakrishnan",
    short_name: "HeyVish",
    description:
      "Indie iOS developer building Stepsly, Expenly, and GrowthKit.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
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
    ],
  };
}
