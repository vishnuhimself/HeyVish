"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  blur?: boolean;
};

/** Fade + rise into view. Uses a clipped mask so text feels printed, not faded. */
export function Reveal({ children, as = "div", className, delay = 0, y = 28, once = true, amount = 0.3, blur = true }: Props) {
  const reduced = useReducedMotion();
  const M = motion[as as keyof typeof motion] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, filter: blur && !reduced ? "blur(6px)" : "none" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
    },
  };
  return (
    <M className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once, amount }}>
      {children}
    </M>
  );
}

/** Staggers direct children. Wrap items in <RevealItem>. */
export function RevealGroup({ children, className, stagger = 0.08, delay = 0, amount = 0.25, as = "div" }: {
  children: ReactNode; className?: string; stagger?: number; delay?: number; amount?: number; as?: ElementType;
}) {
  const M = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div", y = 24 }: { children: ReactNode; className?: string; as?: ElementType; y?: number }) {
  const reduced = useReducedMotion();
  const M = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </M>
  );
}
