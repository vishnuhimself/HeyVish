"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

const NAV = [
  { href: "/blog", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-wordmark" aria-label="Vish, home">
          Vish<span>.</span>
        </Link>

        <p className="site-header-context">Independent iOS developer · India</p>

        <nav className="site-nav" aria-label="Primary navigation">
          {NAV.map((item) => {
            const active =
              item.href === "/blog"
                ? pathname.startsWith("/blog")
                : pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
          <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">
            X
          </a>
          <ModeToggle className="site-theme-toggle" />
        </nav>
      </div>
    </header>
  );
}
