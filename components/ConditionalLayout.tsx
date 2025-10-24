"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isPrivacyPage = pathname.startsWith("/privacy");
  const isSupportPage = pathname.startsWith("/support");
  const isGoldPage = pathname === "/gold";

  if (isHomePage || isPrivacyPage || isSupportPage || isGoldPage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
} 