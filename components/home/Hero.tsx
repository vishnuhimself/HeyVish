"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { IconField } from "./IconField";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import { SplitText } from "@/components/site/SplitText";
import { LocalTime } from "@/components/site/LocalTime";
import { Magnetic } from "@/components/site/Magnetic";
import styles from "./Hero.module.css";

export function Hero({ apps }: { apps: AppStorePortfolioApp[] }) {
  const appCount = apps.length;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const disperse = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const fade = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section ref={ref} className={styles.hero} aria-label="Introduction">
      <div className={styles.portrait}>
        <IconField apps={apps} disperse={disperse} />
      </div>

      <motion.div className={styles.copy} style={{ y: textY, opacity: textOpacity }}>
        <motion.p className={`eyebrow ${styles.eyebrow}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...fade, delay: 0.2 }}>
          <b>Srivishnu Ramakrishnan</b> · Independent iOS developer
        </motion.p>

        <h1 className={`display-xl ${styles.title}`}>
          <SplitText text="Hey, I'm Vish." immediate delay={0.45} stagger={0.09} />
          <br />
          <SplitText text="I make small, sharp iPhone apps." immediate delay={0.75} stagger={0.06} italic={["sharp"]} />
        </h1>

        <motion.p className={`lede ${styles.lede}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...fade, delay: 1.25 }}>
          Focused tools for health, money, and your Home Screen. Designed, built, and shipped by one person, from India.
        </motion.p>

        <motion.div className={styles.actions} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...fade, delay: 1.45 }}>
          <Magnetic>
            <a href="#apps" className="btn btn--solid">
              See the apps
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14m0 0 6-6m-6 6-6-6" /></svg>
            </a>
          </Magnetic>
          <Magnetic>
            <Link href="/blog" className="btn">Read the writing</Link>
          </Magnetic>
        </motion.div>

        <motion.div className={styles.meta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...fade, delay: 1.8 }}>
          <span><i className={styles.live} aria-hidden="true" /> Currently building</span>
          <span>{appCount} apps on the App Store</span>
          <LocalTime className={styles.time} />
        </motion.div>
      </motion.div>

      <motion.div className={styles.scrollCue} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} aria-hidden="true">
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
