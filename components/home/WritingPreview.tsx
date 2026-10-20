"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { PostSummary } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SplitText } from "@/components/site/SplitText";
import { Magnetic } from "@/components/site/Magnetic";
import styles from "./WritingPreview.module.css";

export function WritingPreview({ posts, total }: { posts: PostSummary[]; total: number }) {
  return (
    <section className={styles.section} aria-labelledby="writing-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <Reveal as="p" className="eyebrow eyebrow--accent">Writing · {String(total).padStart(2, "0")}</Reveal>
          <h2 id="writing-heading" className={`display-l ${styles.title}`}>
            <SplitText text="Notes from the workbench." italic={["workbench."]} />
          </h2>
          <Reveal as="p" className="lede" delay={0.15}>
            Fixes I had to find the hard way, written down so you don&apos;t have to.
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic>
              <Link href="/blog" className="btn">
                All writing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6" /></svg>
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <RevealGroup as="ol" className={styles.list} stagger={0.07}>
          {posts.map((post, i) => (
            <RevealItem as="li" key={post.slug} className={styles.item}>
              <Link href={`/blog/${post.slug}`} className={styles.row}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.body}>
                  <span className={styles.rowTitle}>{post.title}</span>
                  <span className={styles.rowMeta}>
                    {(Array.isArray(post.category) ? post.category : [post.category]).join(", ")}
                    <i aria-hidden="true" />
                    <time dateTime={post.date}>{format(parseISO(post.date), "MMM yyyy")}</time>
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7m0 0H9m8 0v8" /></svg>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
