export type DocKind = "privacy" | "support";

export type DocApp = {
  slug: string;
  name: string;
  icon?: string;
  pages: DocKind[];
};

/** Apps with privacy and support pages, keyed by URL slug. */
export const DOC_APPS: Record<string, DocApp> = {
  steps: { slug: "steps", name: "Stepsly", icon: "/stepsly-icon.jpg", pages: ["privacy", "support"] },
  expensekit: { slug: "expensekit", name: "Expenly", icon: "/expenly-icon.jpg", pages: ["privacy", "support"] },
  growthkit: { slug: "growthkit", name: "GrowthKit", icon: "/growthkit-icon.jpg", pages: ["privacy", "support"] },
  moosh: { slug: "moosh", name: "Moosh", pages: ["privacy"] },
  applio: { slug: "applio", name: "Applio", icon: "/applio-icon.jpg", pages: ["privacy", "support"] },
  "nova-widgets": { slug: "nova-widgets", name: "Nova Widgets", icon: "/nova-widgets-icon.jpg", pages: ["privacy", "support"] },
};

export function docAppFromPath(pathname: string): { app: DocApp; kind: DocKind } | null {
  const m = pathname.match(/^\/(privacy|support)\/([^/]+)\/?$/);
  if (!m) return null;
  const app = DOC_APPS[m[2]];
  if (!app) return null;
  return { app, kind: m[1] as DocKind };
}

export function docAppByName(name: string): DocApp | undefined {
  return Object.values(DOC_APPS).find((a) => a.name === name);
}
