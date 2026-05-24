import type { Metadata, Viewport } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConditionalLayout from "@/components/ConditionalLayout";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
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
    "Srivishnu Ramakrishnan (HeyVish) — indie iOS developer building Stepsly, Expenly, and GrowthKit. Tiny, focused apps and notes on shipping software.",
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
      "Indie developer building tiny, focused iOS apps — Stepsly, Expenly, GrowthKit. Notes & essays on shipping software.",
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
      "Indie developer building tiny, focused iOS apps — Stepsly, Expenly, GrowthKit.",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceMono.variable}>
      <body className={`${spaceMono.className} antialiased`}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
