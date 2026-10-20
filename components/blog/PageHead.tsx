"use client";

import type { ReactNode } from "react";
import { SplitText } from "@/components/site/SplitText";
import { Reveal } from "@/components/site/Reveal";
import styles from "./PageHead.module.css";

/** Standard inner-page opener: eyebrow, large split title, optional lede and extras. */
export function PageHead({ eyebrow, title, italic, lede, children, size = "xl" }: {
  eyebrow?: ReactNode; title: string; italic?: string[]; lede?: ReactNode; children?: ReactNode; size?: "xl" | "l";
}) {
  return (
    <header className={styles.head}>
      {eyebrow && <Reveal as="p" className="eyebrow eyebrow--accent" y={10}>{eyebrow}</Reveal>}
      <h1 className={`${size === "xl" ? "display-xl" : "display-l"} ${styles.title}`}>
        <SplitText text={title} italic={italic} immediate delay={0.15} />
      </h1>
      {lede && <Reveal as="p" className={`lede ${styles.lede}`} delay={0.35}>{lede}</Reveal>}
      {children && <Reveal className={styles.extra} delay={0.45}>{children}</Reveal>}
    </header>
  );
}
