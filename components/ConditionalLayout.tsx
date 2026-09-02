"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "./Header";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ownsItsShell = pathname === "/" || pathname === "/gold" || pathname === "/dashboard";

  if (ownsItsShell) return <>{children}</>;

  const year = new Date().getFullYear();

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-callout">
            <span>Built independently in India.</span>
            <a href="mailto:hey@heyvish.com">Come say hey.</a>
          </div>
          <div className="site-footer-meta">
            <Link href="/" className="site-wordmark">
              Vish<span>.</span>
            </Link>
            <div>
              <a href="mailto:hey@heyvish.com">Email</a>
              <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">
                @VishHimself
              </a>
              <span>© {year}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
