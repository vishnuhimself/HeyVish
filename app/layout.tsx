import type { Metadata, Viewport } from "next";
import { Alata } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConditionalLayout from "@/components/ConditionalLayout";

const alata = Alata({
  subsets: ["latin"],
  variable: "--font-alata",
  display: "swap",
  weight: "400",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Srivishnu Ramakrishnan — Indie iOS App Developer",
    template: "%s — HeyVish",
  },
  description:
    "Srivishnu Ramakrishnan (HeyVish) — indie iOS developer building Calmraine, MNML, Applio, Nova Widgets, Expenly, Stepsly, and GrowthKit.",
  applicationName: "HeyVish",
  authors: [{ name: "Srivishnu Ramakrishnan", url: SITE_URL }],
  creator: "Srivishnu Ramakrishnan",
  publisher: "Srivishnu Ramakrishnan",
  keywords: [
    "Srivishnu Ramakrishnan",
    "HeyVish",
    "indie developer",
    "iOS apps",
    "Stepsly",
    "Expenly",
    "GrowthKit",
    "Calmraine",
    "MNML",
    "Applio",
    "Nova Widgets",
    "Swift",
    "React Native",
    "Next.js",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/Vish_DP.webp", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Srivishnu Ramakrishnan — Indie iOS App Developer",
    description:
      "Indie developer building focused iOS apps — Calmraine, MNML, Applio, Nova Widgets, Expenly, Stepsly, and GrowthKit.",
    url: SITE_URL,
    siteName: "HeyVish",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Srivishnu-Ramakrishnan-Author.png",
        width: 1200,
        height: 630,
        alt: "Srivishnu Ramakrishnan — HeyVish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srivishnu Ramakrishnan — Indie iOS App Developer",
    description:
      "Indie developer building focused iOS apps — Calmraine, MNML, Applio, Nova Widgets, Expenly, Stepsly, and GrowthKit.",
    creator: "@VishHimself",
    images: ["/Srivishnu-Ramakrishnan-Author.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={alata.variable}>
      <body className={`${alata.className} antialiased`}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
