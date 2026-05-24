"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "./Header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isGoldPage = pathname === "/gold";

  if (isHomePage || isGoldPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {children}
      </main>
      <footer className="border-t border-foreground">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 text-[11px] uppercase tracking-[0.2em]">
          <Link
            href="/"
            className="px-4 sm:px-6 py-4 border-r border-foreground hover:bg-foreground hover:text-background transition-colors font-bold flex items-center gap-2"
          >
            ← HEYVISH
          </Link>
          <a
            href="mailto:hey@heyvish.com"
            className="px-4 sm:px-6 py-4 md:border-r border-foreground hover:bg-foreground hover:text-background transition-colors truncate flex items-center"
          >
            hey@heyvish.com
          </a>
          <a
            href="https://x.com/VishHimself"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-6 py-4 md:border-r border-foreground hover:bg-foreground hover:text-background transition-colors border-t md:border-t-0 border-r flex items-center"
          >
            @VishHimself
          </a>
          <div className="px-4 sm:px-6 py-4 border-t md:border-t-0 font-bold text-muted-foreground flex items-center">
            © {year}
          </div>
        </div>
      </footer>
    </div>
  );
}
