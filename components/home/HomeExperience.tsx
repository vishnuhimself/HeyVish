"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import styles from "@/app/page.module.css";

type HomeExperienceProps = {
  apps: AppStorePortfolioApp[];
  year: number;
};

const APP_ACCENTS: Record<string, string> = {
  calmraine: "255 102 72",
  mnml: "130 132 113",
  applio: "37 141 255",
  "nova-widgets": "218 43 63",
  expenly: "125 98 238",
  stepsly: "76 105 246",
  growthkit: "70 164 117",
};

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={styles.arrow}>
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

export function HomeExperience({ apps, year }: HomeExperienceProps) {
  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.wordmark} aria-label="Vish, home">
          Vish<span>.</span>
        </Link>
        <p className={styles.role}>Independent iOS developer · India</p>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">
            X
          </a>
          <Link href="/blog">Notes</Link>
          <Link href="/contact">Contact</Link>
          <ModeToggle className={styles.themeButton} />
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="home-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>A small studio of one</p>
            <h1 id="home-heading">
              I make small software
              <br />
              <em>for everyday life.</em>
            </h1>
            <p className={styles.intro}>
              I&apos;m Srivishnu—Vish is easier. I design and build focused iPhone
              apps from India, one useful little idea at a time.
            </p>
            <a href="#apps" className={styles.heroLink}>
              See what I&apos;ve made <span aria-hidden="true">↓</span>
            </a>
          </div>

          <figure className={styles.portraitObject}>
            <div className={styles.portraitImage}>
              <Image
                src="/Vish_DP.webp"
                alt="Portrait of Srivishnu Ramakrishnan"
                fill
                priority
                sizes="(max-width: 760px) 86vw, 38vw"
              />
            </div>
            <figcaption>
              <span>Srivishnu Ramakrishnan</span>
              <span>Seven apps, independently made</span>
            </figcaption>
            <span className={styles.portraitIndex} aria-hidden="true">
              01
            </span>
          </figure>
        </section>

        <section className={styles.appsSection} id="apps" aria-labelledby="apps-heading">
          <div className={styles.appsHeading}>
            <div>
              <p className={styles.eyebrow}>Selected software · 2025—now</p>
              <h2 id="apps-heading">Seven small ideas, shipped.</h2>
            </div>
            <p>
              Health, money, widgets, and tools for other independent makers.
              Each app is intentionally narrow and made to earn its place.
            </p>
          </div>

          <div className={styles.appGallery}>
            {apps.map((app, index) => (
              <a
                key={app.id}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.appPoster} ${styles[`poster${index + 1}`]}`}
                style={
                  {
                    "--poster-accent": APP_ACCENTS[app.id] ?? "126 126 126",
                  } as React.CSSProperties
                }
              >
                <span className={styles.posterWash} aria-hidden="true" />
                <div className={styles.posterTopline}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{app.category}</span>
                </div>
                <div className={styles.posterArtwork}>
                  <div className={styles.posterIcon}>
                    <Image
                      src={app.icon}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 36vw, 14vw"
                    />
                  </div>
                </div>
                <div className={styles.posterCopy}>
                  <div>
                    <h3>{app.name}</h3>
                    <p>{app.tagline}</p>
                  </div>
                  <span className={styles.posterArrow}>
                    <Arrow />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerStatement}>
          <span>Have a thought?</span>
          <a href="mailto:hey@heyvish.com">Come say hey.</a>
        </div>
        <div className={styles.footerMeta}>
          <span>© {year} Srivishnu Ramakrishnan</span>
          <div>
            <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">
              @VishHimself
            </a>
            <Link href="/blog">Notes</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
