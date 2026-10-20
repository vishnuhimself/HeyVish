"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Live clock in India Standard Time, where Vish is based. */
export function LocalTime({ withSeconds = true, className = "" }: { withSeconds?: boolean; className?: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const parts = fmt.format(new Date());
      setNow(withSeconds ? parts : parts.slice(0, 5));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [withSeconds]);
  return (
    <time className={className} suppressHydrationWarning aria-label="Local time in India">
      {now || "--:--"}
      <span style={{ opacity: 0.6 }}>&nbsp;IST</span>
    </time>
  );
}
