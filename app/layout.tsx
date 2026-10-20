import type { Metadata, Viewport } from "next";
import { Alata, Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConditionalLayout from "@/components/ConditionalLayout";

// Alata stays loaded for the internal dashboard, which reads --font-alata.
const alata = Alata({ subsets: ["latin"], variable: "--font-alata", display: "swap", weight: "400" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";
const TITLE = "Srivishnu Ramakrishnan — Indie iOS App Developer";
const DESCRIPTION =
  "Srivishnu Ramakrishnan (Vish) is an independent developer who designs and ships focused iPhone apps: Stepsly, Expenly, GrowthKit, and MNML.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — HeyVish" },
  description: DESCRIPTION,
  applicationName: "HeyVish",
  authors: [{ name: "Srivishnu Ramakrishnan", url: SITE_URL }],
  creator: "Srivishnu Ramakrishnan",
  publisher: "Srivishnu Ramakrishnan",
  keywords: [
    "Srivishnu Ramakrishnan",
    "HeyVish",
    "Vish",
    "indie developer",
    "iOS apps",
    "Stepsly",
    "Expenly",
    "GrowthKit",
    "MNML",
    "Swift",
    "SwiftUI",
    "React Native",
    "Next.js",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "HeyVish",
    locale: "en_US",
    type: "website",
    images: [{ url: "/Srivishnu-Ramakrishnan-Author.png", width: 1200, height: 630, alt: "Srivishnu Ramakrishnan — HeyVish" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@VishHimself",
    images: ["/Srivishnu-Ramakrishnan-Author.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alata.variable} ${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
