"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import styles from "./Manifesto.module.css";

const TEXT =
  "I'm one person, so every app has to earn its place. Small scope. Private by default. No dashboards for the sake of it. Just tools that do one thing well, respect your time, and get out of the way.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.side}>
          <Reveal>
            <span className={styles.mark} aria-hidden="true">V</span>
          </Reveal>
          <Reveal as="p" className="eyebrow eyebrow--accent" delay={0.1}>How I work</Reveal>
        </div>
        <h2 id="about-heading" className="sr-only">How I work</h2>
        <p ref={ref} className={styles.text} aria-label={TEXT}>
          {words.map((w, i) => (
            <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} reduced={!!reduced} />
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ word, range, progress, reduced }: { word: string; range: [number, number]; progress: MotionValue<number>; reduced: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className={styles.word} aria-hidden="true">
      <motion.span style={reduced ? undefined : { opacity, y }}>{word}</motion.span>{" "}
    </span>
  );
}
