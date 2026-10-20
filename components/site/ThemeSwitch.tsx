"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeSwitch.module.css";

export function ThemeSwitch({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const dark = current === "dark";

  return (
    <button
      type="button"
      className={`${styles.switch} ${className}`.trim()}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      data-dark={dark}
    >
      <span className={styles.track}>
        <span className={styles.knob}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.sun}>
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" />
            </g>
          </svg>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.moon}>
            <path d="M20 14.6A8.5 8.5 0 0 1 9.4 4a8.5 8.5 0 1 0 10.6 10.6Z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  );
}
