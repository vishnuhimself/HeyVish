"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import styles from "./IconField.module.css";

/**
 * The four apps as physical tiles on a tilted isometric plane. Each tile
 * hovers above its own shadow, the plane leans with the cursor, and the whole
 * set lifts away as the hero scrolls out.
 */
export function IconField({ apps, disperse }: { apps: AppStorePortfolioApp[]; disperse: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 16, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 50, damping: 16, mass: 0.9 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  const rotateX = useTransform(sy, [-1, 1], [58, 50]);
  const rotateZ = useTransform(sx, [-1, 1], [-40, -30]);
  const y = useTransform(disperse, [0, 1], [0, -160]);
  const opacity = useTransform(disperse, [0, 0.75], [1, 0]);
  const scale = useTransform(disperse, [0, 1], [1, 0.85]);

  return (
    <motion.div className={styles.field} aria-hidden="true" style={{ y, opacity, scale }}>
      <span className={styles.glow} />
      <motion.div className={styles.plane} style={reduced ? { rotateX: 54, rotateZ: -35 } : { rotateX, rotateZ }}>
        {apps.slice(0, 4).map((app, i) => (
          <a
            key={app.id}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cell}
            style={{ ["--d" as string]: `${-i * 1.6}s`, ["--hue" as string]: app.hue, ["--chroma" as string]: app.chroma }}
            aria-label={`${app.name} on the App Store`}
            tabIndex={-1}
          >
            <span className={styles.shadow} />
            <span className={styles.lift}>
              <span className={styles.tile}>
                <Image src={app.icon} alt="" width={180} height={180} priority />
              </span>
            </span>
            <span className={styles.label}>
              <strong>{app.name}</strong>
              <small>{app.tagline}</small>
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
