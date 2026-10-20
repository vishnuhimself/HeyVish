import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DocToc } from "./DocToc";

type Props = {
  kind: "privacy" | "support";
  title: string;
  subtitle?: string;
  app: string;
  icon?: string;
  /** Shown as a callout above the body, e.g. for discontinued apps. */
  notice?: string;
  children: ReactNode;
};

/** Shared layout for app privacy policies and support pages. */
export function DocPage({ kind, title, subtitle, app, icon, notice, children }: Props) {
  const sibling = kind === "privacy" ? "support" : "privacy";
  const lastUpdated = subtitle?.startsWith("Last updated") ? subtitle : null;
  return (
    <main id="main" className="container doc">
      <header className="doc__head">
        {icon && <Image src={icon} alt={`${app} app icon`} width={56} height={56} className="doc__icon" />}
        <h1 className="doc__title">{title}</h1>
        <div className="doc__meta">
          {lastUpdated ? <span>{lastUpdated}</span> : subtitle ? <span>{subtitle}</span> : null}
          <a href="mailto:hey@heyvish.com">hey@heyvish.com</a>
          {hasSibling(app, sibling) && (
            <Link href={`/${sibling}/${slugOf(app)}`}>{sibling === "support" ? "Support page" : "Privacy policy"}</Link>
          )}
        </div>
      </header>
      <div className="doc__grid">
        <article className="doc__body" id="doc-body">
          {notice && (
            <p className="doc__notice" role="note">
              <span aria-hidden="true" />
              <span dangerouslySetInnerHTML={{ __html: notice }} />
            </p>
          )}
          {children}
        </article>
        <DocToc target="doc-body" />
      </div>
    </main>
  );
}

const PAGES: Record<string, string[]> = {
  applio: ["privacy", "support"],
  expensekit: ["privacy", "support"],
  growthkit: ["privacy", "support"],
  moosh: ["privacy"],
  "nova-widgets": ["privacy", "support"],
  steps: ["privacy", "support"],
};

function hasSibling(app: string, kind: string) {
  return (PAGES[slugOf(app)] ?? []).includes(kind);
}

function slugOf(app: string) {
  const map: Record<string, string> = {
    Applio: "applio",
    Expenly: "expensekit",
    GrowthKit: "growthkit",
    Moosh: "moosh",
    "Nova Widgets": "nova-widgets",
    Stepsly: "steps",
  };
  return map[app] ?? app.toLowerCase().replace(/\s+/g, "-");
}
