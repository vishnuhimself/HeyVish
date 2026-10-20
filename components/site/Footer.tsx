"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { LocalTime } from "./LocalTime";
import { Magnetic } from "./Magnetic";
import styles from "./Footer.module.css";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["42%", "0%"]);
  const year = new Date().getFullYear();

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.col}>
          <span className="eyebrow">Elsewhere</span>
          <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer" className="u-link u-link--draw">X / @VishHimself</a>
          <a href="https://apps.apple.com/us/developer/srivishnu-ramakrishnan/id1792193135" target="_blank" rel="noreferrer" className="u-link u-link--draw">App Store</a>
          <a href="mailto:hey@heyvish.com" className="u-link u-link--draw">hey@heyvish.com</a>
        </div>
        <div className={styles.col}>
          <span className="eyebrow">Here</span>
          <Link href="/#apps" className="u-link u-link--draw">Apps</Link>
          <Link href="/blog" className="u-link u-link--draw">Writing</Link>
          <Link href="/contact" className="u-link u-link--draw">Contact</Link>
        </div>
        <div className={styles.col}>
          <span className="eyebrow">Now</span>
          <LocalTime className={styles.time} />
          <span className={styles.muted}>Building from India</span>
        </div>
        <div className={styles.colEnd}>
          <Magnetic>
            <button type="button" className={`btn btn--ghost ${styles.topBtn}`} onClick={toTop}>
              Back to top
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" /></svg>
            </button>
          </Magnetic>
        </div>
      </div>

      <div className={styles.markWrap} aria-hidden="true">
        <motion.div className={styles.mark} style={{ y, x: "-50%" }}>HEYVISH</motion.div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} Srivishnu Ramakrishnan</span>
        <span className={styles.muted}>Designed and built by hand. No templates.</span>
      </div>
    </footer>
  );
}
