"use client";

import Image from "next/image";
import Link from "next/link";
import { createRef, useEffect, useMemo, useState, type RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import { SplitText } from "@/components/site/SplitText";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import { Tilt } from "./Tilt";
import styles from "./AppsStack.module.css";

export function AppsStack({ apps }: { apps: AppStorePortfolioApp[] }) {
  // One static slot per card; each card fades as the *next* slot scrolls over it.
  const slotRefs = useMemo(() => apps.map(() => createRef<HTMLDivElement>()), [apps]);

  return (
    <section id="apps" className={styles.section} aria-labelledby="apps-heading">
      <div className={`container ${styles.head}`}>
        <Reveal as="p" className="eyebrow eyebrow--accent">Apps · {String(apps.length).padStart(2, "0")}</Reveal>
        <h2 id="apps-heading" className={`display-l ${styles.title}`}>
          <SplitText text="Four apps. One person. No filler." italic={["one", "person."]} />
        </h2>
        <Reveal as="p" className={`lede ${styles.lede}`} delay={0.15}>
          Each one does a single job well and stays out of your way. Scroll through the stack.
        </Reveal>
      </div>

      <div className={styles.stack}>
        {/* Invisible markers mirror each card's natural position, so scroll
            measurements stay correct while the cards themselves are sticky. */}
        <div className={styles.markers} aria-hidden="true">
          {apps.map((app, i) => <div key={app.id} ref={slotRefs[i]} className={styles.marker} />)}
        </div>
        {apps.map((app, i) => (
          <div key={app.id} className={styles.slot} style={{ ["--i" as string]: i }}>
            <Card app={app} index={i} isLast={i === apps.length - 1} nextSlot={slotRefs[i + 1] ?? null} />
          </div>
        ))}
      </div>
    </section>
  );
}

/** True when the cards stack (sticky) rather than flow; below this they must not fade. */
function useStacks() {
  const [stacks, setStacks] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 801px)");
    const sync = () => setStacks(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return stacks;
}

function Card({ app, index, isLast, nextSlot }: { app: AppStorePortfolioApp; index: number; isLast: boolean; nextSlot: RefObject<HTMLDivElement | null> | null }) {
  const reduced = useReducedMotion();
  const stacks = useStacks();
  const still = reduced || !stacks || isLast;
  // 0 when the next slot's top is at the bottom of the viewport, 1 when it reaches the top.
  const { scrollYProgress: cover } = useScroll({ target: nextSlot ?? undefined, offset: ["start end", "start start"] });
  const scale = useTransform(cover, [0.1, 0.95], [1, still ? 1 : 0.92]);
  const dim = useTransform(cover, [0.25, 0.95], [1, still ? 1 : 0.4]);
  const blur = useTransform(cover, [0.35, 0.95], ["blur(0px)", still ? "blur(0px)" : "blur(3px)"]);

  return (
    <div className={styles.pin}>
      <motion.article
        className={styles.card}
        style={{
          scale: still ? 1 : scale,
          opacity: still ? 1 : dim,
          filter: still ? "none" : blur,
          ["--hue" as string]: app.hue,
          ["--chroma" as string]: app.chroma,
        }}
      >
        <div className={styles.cardInner}>
          <div className={styles.text}>
            <div className={styles.topline}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span className="eyebrow">{app.category}</span>
            </div>
            <h3 className={`display-m ${styles.name}`}>{app.name}</h3>
            <p className={styles.tagline}>{app.tagline}</p>
            <p className={styles.note}>{app.note}</p>
            <div className={styles.links}>
              <Magnetic strength={0.25}>
                <a href={app.href} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                  App Store
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7m0 0H9m8 0v8" /></svg>
                </a>
              </Magnetic>
              {app.support && <Link href={app.support} className={`u-link u-link--draw ${styles.minor}`}>Support</Link>}
              {app.privacy && <Link href={app.privacy} className={`u-link u-link--draw ${styles.minor}`}>Privacy</Link>}
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <span className={styles.halo} />
            <span className={styles.orbit} />
            <span className={styles.orbit2} />
            <Tilt className={styles.iconWrap}>
              <Image src={app.icon} alt="" width={200} height={200} className={styles.icon} priority={index === 0} />
            </Tilt>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
