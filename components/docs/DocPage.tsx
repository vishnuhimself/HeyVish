import type { ReactNode } from "react";
import { DocToc } from "./DocToc";

type Props = {
  kind: "privacy" | "support";
  title: string;
  subtitle?: string;
  /** App name; the header derives it from the URL, kept for callers. */
  app: string;
  /** Icon is shown in the site header; kept here for callers. */
  icon?: string;
  /** Shown as a callout above the body, e.g. for discontinued apps. */
  notice?: string;
  children: ReactNode;
};

/** Shared layout for app privacy policies and support pages. */
export function DocPage({ kind, title, subtitle, notice, children }: Props) {
  const lastUpdated = subtitle?.startsWith("Last updated") ? subtitle : null;
  return (
    <main id="main" className="container doc">
      <header className="doc__head">
        <h1 className="doc__title">{title}</h1>
        <div className="doc__meta">
          {lastUpdated ? <span>{lastUpdated}</span> : subtitle ? <span>{subtitle}</span> : null}
          <a href="mailto:hey@heyvish.com">hey@heyvish.com</a>
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

