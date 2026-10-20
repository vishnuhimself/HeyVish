import type { ReactNode } from "react";
import styles from "./Marquee.module.css";

/** Infinite horizontal ticker. Pure CSS, pauses on hover and under reduced motion. */
export function Marquee({ children, speed = 40, reverse = false, className = "" }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={`${styles.marquee} ${className}`.trim()} style={{ ["--speed" as string]: `${speed}s` }} data-reverse={reverse}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
