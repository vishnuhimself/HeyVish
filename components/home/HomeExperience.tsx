"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import styles from "@/app/page.module.css";

export function HomeExperience({ apps, year }: { apps: AppStorePortfolioApp[]; year: number }) {
  return <main className={styles.root}>
    <nav className={styles.nav} aria-label="Primary navigation">
      <Link href="/" className={styles.name}>Vish</Link>
      <div><Link href="/blog">Writing</Link><a href="mailto:hey@heyvish.com">Email</a><a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">X</a><ModeToggle className={styles.theme} /></div>
    </nav>
    <article className={styles.content}>
      <header className={styles.intro}>
        <h1>Srivishnu Ramakrishnan</h1>
        <p>I&apos;m Vish, an independent developer in India.</p>
        <p>I make focused iPhone apps for everyday life—tools for health, money, home screens, and other independent makers.</p>
        <p>You can find me on <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">X</a>, read my <Link href="/blog">writing</Link>, or reach me by <a href="mailto:hey@heyvish.com">email</a>.</p>
      </header>
      <section className={styles.apps} aria-labelledby="apps-heading">
        <h2 id="apps-heading">Apps</h2>
        <div className={styles.appList}>{apps.map((app) => <a key={app.id} href={app.href} target="_blank" rel="noopener noreferrer" className={styles.app}>
          <Image src={app.icon} alt="" width={36} height={36} />
          <span><strong>{app.name}</strong><small>{app.tagline}</small></span>
          <span aria-hidden="true">↗</span>
        </a>)}</div>
      </section>
      <footer className={styles.footer}><span>© {year} Vish</span><span>Coimbatore, India</span></footer>
    </article>
  </main>;
}
