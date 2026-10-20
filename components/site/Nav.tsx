"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeSwitch } from "./ThemeSwitch";
import { docAppFromPath } from "@/lib/docApps";
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

  const doc = docAppFromPath(pathname);

  // App-specific header for privacy and support pages.
  if (doc) {
    const sibling = doc.kind === "privacy" ? "support" : "privacy";
    const hasSibling = doc.app.pages.includes(sibling);
    return (
      <header className={styles.header} data-scrolled={scrolled}>
        <div className={styles.inner}>
          <span className={styles.appmark}>
            {doc.app.icon ? (
              <Image src={doc.app.icon} alt="" width={28} height={28} className={styles.appIcon} />
            ) : (
              <span className={styles.dot} aria-hidden="true" />
            )}
            {doc.app.name}
          </span>
          <nav className={styles.nav} aria-label="App pages">
            {hasSibling && (
              <Link href={`/${sibling}/${doc.app.slug}`} className={styles.link}>
                <span className={styles.label}>{sibling === "support" ? "Support" : "Privacy policy"}</span>
              </Link>
            )}
            <ThemeSwitch className={styles.theme} />
          </nav>
        </div>
      </header>
    );
  }

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
