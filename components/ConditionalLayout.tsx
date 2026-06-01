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
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
        {children}
      </main>
      <footer className="border-t border-border py-8 mt-8">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display font-semibold text-sm text-foreground hover:opacity-60 transition-opacity"
          >
            HeyVish
          </Link>
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <a
              href="mailto:hey@heyvish.com"
              className="hover:text-foreground transition-colors"
            >
              hey@heyvish.com
            </a>
            <a
              href="https://x.com/VishHimself"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              @VishHimself
            </a>
            <span>© {year}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
