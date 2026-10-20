"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { PostSummary } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import styles from "./PostList.module.css";

function cats(p: PostSummary) {
  return Array.isArray(p.category) ? p.category : [p.category];
}

export function PostList({ posts, groupByYear = true }: { posts: PostSummary[]; groupByYear?: boolean }) {
  const groups = new Map<string, PostSummary[]>();
  for (const p of posts) {
    const key = groupByYear ? format(parseISO(p.date), "yyyy") : "all";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  let n = 0;

  return (
    <div className={styles.root}>
      {[...groups.entries()].map(([year, items]) => (
        <section key={year} className={styles.group}>
          {groupByYear && <h2 className={styles.year}>{year}</h2>}
          <RevealGroup as="ol" className={styles.list} stagger={0.05} amount={0.1}>
            {items.map((post) => {
              n += 1;
              return (
                <RevealItem as="li" key={post.slug} className={styles.item} y={16}>
                  <Link href={`/blog/${post.slug}`} className={styles.row}>
                    <span className={styles.num}>{String(n).padStart(2, "0")}</span>
                    <span className={styles.body}>
                      <span className={styles.title}>{post.title}</span>
                      {post.description && <span className={styles.desc}>{post.description}</span>}
                    </span>
                    <span className={styles.meta}>
                      <span className={styles.cat}>{cats(post).join(", ")}</span>
                      <time dateTime={post.date}>{format(parseISO(post.date), "dd MMM")}</time>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7m0 0H9m8 0v8" /></svg>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>
      ))}
    </div>
  );
}
