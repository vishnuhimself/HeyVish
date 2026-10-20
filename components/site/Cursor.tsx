"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/**
 * A small ink dot that follows the pointer with a soft lag and swells over
 * anything interactive. Desktop with a fine pointer only; the native cursor
 * stays visible so nothing is lost if this is slow or disabled.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = -100, ty = -100, x = tx, y = ty, raf = 0, visible = false;
    let scale = 1, targetScale = 1;

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      scale += (targetScale - scale) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) { visible = true; el.dataset.visible = "true"; x = tx; y = ty; }
      const t = e.target as Element | null;
      const interactive = t?.closest("a, button, [role=button], input, textarea, label, [data-cursor]");
      const kind = interactive?.getAttribute("data-cursor");
      targetScale = kind === "big" ? 6 : interactive ? 2.6 : 1;
      el.dataset.mode = kind === "big" ? "big" : interactive ? "hover" : "";
    };
    const onLeave = () => { visible = false; el.dataset.visible = "false"; };
    const onDown = () => { targetScale *= 0.7; };
    const onUp = () => { targetScale /= 0.7; };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div ref={ref} className={styles.cursor} aria-hidden="true" />;
}
