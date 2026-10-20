"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@._-0123456789";

/**
 * Text that decodes from noise. Runs once when it enters view (or on hover
 * when `hover` is set). Reduced-motion users just get the text.
 */
export function Scramble({ text, className = "", hover = false, auto = false, duration = 900, as: Tag = "span" }: {
  text: string; className?: string; hover?: boolean; auto?: boolean; duration?: number; as?: "span" | "div";
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const run = useCallback(() => {
    if (reduced.current) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const len = text.length;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * len);
      let s = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        if (ch === " " || i < settled) s += ch;
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (auto) run();
    return () => cancelAnimationFrame(raf.current);
  }, [auto, run]);

  return (
    <Tag className={className} onPointerEnter={hover ? run : undefined} data-scramble>
      {out}
    </Tag>
  );
}
