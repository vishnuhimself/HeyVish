"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import styles from "./SplitText.module.css";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "words" (default) or "chars" */
  by?: "words" | "chars";
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** Words to render in the italic display face, matched case-insensitively. */
  italic?: string[];
};

/**
 * Each word rises out of its own clipping box. The rise is slightly
 * over-rotated so the line feels set by hand rather than faded in.
 * Visibility is observed on the whole line, since the words themselves start
 * clipped out of view.
 */
export function SplitText({ text, as = "span", className = "", delay = 0, stagger = 0.045, by = "words", immediate = false, italic = [] }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -10% 0px" });
  const Tag = as as "span";
  const units = by === "chars" ? Array.from(text) : text.split(" ");
  const its = new Set(italic.map((w) => w.toLowerCase()));
  const show = immediate || inView || !!reduced;

  const anim = { y: "0%", rotate: 0, opacity: 1 };
  const init = reduced ? anim : { y: "110%", rotate: 4, opacity: 0 };

  return (
    <Tag ref={ref} className={`${styles.root} ${className}`.trim()} aria-label={text}>
      {units.map((u, i) => (
        <span className={styles.mask} key={i} aria-hidden="true">
          <motion.span
            className={`${styles.unit} ${its.has(u.toLowerCase().replace(/[^a-z]/g, "")) ? "serif-it" : ""}`}
            initial={init}
            animate={show ? anim : init}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {u}
          </motion.span>
          {by === "words" && i < units.length - 1 ? <span className={styles.space}> </span> : null}
        </span>
      ))}
    </Tag>
  );
}
