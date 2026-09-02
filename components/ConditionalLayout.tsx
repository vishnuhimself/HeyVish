"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { SiteFooter } from "./SiteFooter";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ownsItsShell = pathname === "/" || pathname === "/gold" || pathname === "/dashboard";

  if (ownsItsShell) return <>{children}</>;

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
