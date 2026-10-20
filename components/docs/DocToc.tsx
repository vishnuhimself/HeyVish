"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string };

/** Builds a sticky table of contents from the h2s in the target article, with scroll-spy. */
export function DocToc({ target }: { target: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    const hs = Array.from(root.querySelectorAll("h2"));
    const list: Item[] = hs.map((h, i) => {
      const text = h.textContent?.trim() ?? `Section ${i + 1}`;
      if (!h.id) h.id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `section-${i + 1}`;
      return { id: h.id, text };
    });
    setItems(list);
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setActive((en.target as HTMLElement).id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [target]);

  if (!items.length) return null;
  return (
    <nav className="doc__toc" aria-label="On this page">
      <span className="eyebrow">On this page</span>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>{it.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
