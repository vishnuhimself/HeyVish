"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scramble } from "@/components/site/Scramble";
import { Reveal } from "@/components/site/Reveal";
import { SplitText } from "@/components/site/SplitText";
import { Magnetic } from "@/components/site/Magnetic";
import styles from "./ContactCta.module.css";

const EMAIL = "hey@heyvish.com";

export function ContactCta({ heading = "Say hey.", compact = false }: { heading?: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* fall through to mailto */
    }
  };

  return (
    <section className={`${styles.section} ${compact ? styles.compact : ""}`} aria-labelledby="contact-heading">
      <div className={`container ${styles.inner}`}>
        {!compact && <Reveal as="p" className="eyebrow eyebrow--accent">Contact</Reveal>}
        <h2 id="contact-heading" className={`display-xl ${styles.title}`}>
          <SplitText text={heading} italic={["hey."]} />
        </h2>
        <Reveal as="p" className={`lede ${styles.lede}`} delay={0.1}>
          App support, a bug, an idea, or just hello. I read everything and usually reply within a day.
        </Reveal>

        <Reveal className={styles.emailWrap} delay={0.2}>
          <a href={`mailto:${EMAIL}`} className={styles.email} onClick={copy} aria-label={`Email ${EMAIL} (click to copy)`}>
            <Scramble text={EMAIL} hover duration={700} className={styles.emailText} />
            <AnimatePresence>
              {copied && (
                <motion.span
                  key="copied"
                  className={styles.copied}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <span className={styles.hint}>Click to copy, or it opens your mail app.</span>
        </Reveal>

        <Reveal className={styles.alt} delay={0.3}>
          <Magnetic>
            <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer" className="btn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
              @VishHimself
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
