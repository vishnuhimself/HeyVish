import { Marquee } from "@/components/site/Marquee";
import styles from "./Ticker.module.css";

const ITEMS = ["Stepsly", "Expenly", "GrowthKit", "MNML", "Swift", "SwiftUI", "React Native", "Next.js", "Independent", "Private by default", "Shipped alone"];

export function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <Marquee speed={46}>
        {ITEMS.map((t, i) => (
          <span className={styles.item} key={i}>
            {t}
            <i className={styles.sep} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
