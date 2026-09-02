"use client";

import { usePathname } from "next/navigation";
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
      <footer className="site-footer"><div className="site-footer-inner"><span>© {year} Vish</span><div><a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">X</a><a href="mailto:hey@heyvish.com">Email</a></div></div></footer>
    </div>
  );
}
