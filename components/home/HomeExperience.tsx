"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, NotebookPen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/SiteFooter";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import styles from "@/app/page.module.css";

function XIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
}

export function HomeExperience({ apps }: { apps: AppStorePortfolioApp[] }) {
  return <main className={styles.root}>
    <nav className={styles.nav} aria-label="Primary navigation">
      <Link href="/" className={styles.name}>Vish</Link>
      <div>
        <Link className={styles.utility} href="/blog" aria-label="Writing" title="Writing"><NotebookPen /></Link>
        <a className={styles.utility} href="mailto:hey@heyvish.com" aria-label="Email Vish" title="Email"><Mail /></a>
        <a className={styles.utility} href="https://x.com/VishHimself" target="_blank" rel="noreferrer" aria-label="Vish on X" title="X"><XIcon /></a>
        <ModeToggle className={styles.theme} />
      </div>
    </nav>
    <article className={styles.content}>
      <header className={styles.intro}>
        <h1>Srivishnu Ramakrishnan</h1>
        <p>I&apos;m Vish, an independent developer.</p>
        <p>I make focused iPhone apps for everyday life—tools for health, money, home screens, and other independent makers.</p>
        <p>You can find me on <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">X</a>, read my <Link href="/blog">writing</Link>, or reach me by <a href="mailto:hey@heyvish.com">email</a>.</p>
      </header>
      <section className={styles.apps} aria-labelledby="apps-heading">
        <h2 id="apps-heading">Apps</h2>
        <div className={styles.appList}>{apps.map((app) => <a key={app.id} href={app.href} target="_blank" rel="noopener noreferrer" className={styles.app}>
          <Image src={app.icon} alt="" width={36} height={36} />
          <span><strong>{app.name}</strong><small>{app.tagline}</small></span>
          <ArrowUpRight className={styles.external} aria-hidden="true" />
        </a>)}</div>
      </section>
    </article>
    <SiteFooter className={styles.homeFooter} />
  </main>;
}
