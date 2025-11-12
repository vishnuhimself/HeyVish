import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConditionalLayout from "@/components/ConditionalLayout";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Srivishnu Ramakrishnan",
  description: "Portfolio of Srivishnu Ramakrishnan. Writing about web development, Next.js, WordPress, and more.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      }
    ],
  },
  openGraph: {
      title: "Srivishnu Ramakrishnan - Engineer | Web Creator",
    description: "Portfolio of Srivishnu Ramakrishnan. Writing about web development, Next.js, WordPress, and more.",
    url: "https://heyvish.com",
    siteName: "Srivishnu Ramakrishnan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/Srivishnu-Ramakrishnan-Author.png',
        width: 1200,
        height: 630,
        alt: 'HeyVish',
      },
    ],
  },
  alternates: {
    canonical: "https://heyvish.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={beVietnamPro.className}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
