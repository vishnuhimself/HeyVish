"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeSwitch } from "./ThemeSwitch";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/#apps", label: "Apps", match: (p: string, h: string) => p === "/" && h === "#apps" },
  { href: "/contact", label: "Contact", match: (p: string) => p === "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label="Vish, home">
          <span className={styles.dot} aria-hidden="true" />
          Vish
        </Link>

        <nav className={styles.nav} aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {LINKS.map((l) => {
            const active = l.match(pathname, hash);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => setHovered(l.href)}
              >
                {(hovered ?? (active ? l.href : null)) === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={styles.pill}
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                  />
                )}
                <span className={styles.label}>{l.label}</span>
              </Link>
            );
          })}
          <ThemeSwitch className={styles.theme} />
        </nav>
      </div>
    </header>
  );
}
