import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Srivishnu Ramakrishnan - Engineer | Web Creator",
  description: "Portfolio of Srivishnu Ramakrishnan. Writing about web development, Next.js, WordPress, and more.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
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
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
