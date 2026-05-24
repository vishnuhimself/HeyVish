import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

const APPS = [
  {
    id: "01",
    name: "Stepsly",
    tagline: "Pedometer & widgets",
    description: "A simple step counter for the iPhone. Live activity, lock-screen widgets, no nonsense.",
    icon: "/stepsly-icon.webp",
    href: "https://apps.apple.com/us/app/steps-app-pedometer-widgets/id6753876664",
    platform: "iOS",
  },
  {
    id: "02",
    name: "Expenly",
    tagline: "Expense tracker",
    description: "Track every spend. Offline-first, fully private, lives on your device.",
    icon: "/expenly-icon.webp",
    href: "https://apps.apple.com/us/app/expense-tracker-expensekit/id6756433597",
    platform: "iOS",
  },
  {
    id: "03",
    name: "GrowthKit",
    tagline: "Height & weight tracker",
    description: "Plot your kid's growth curves. WHO percentiles, clean charts, no accounts.",
    icon: "/growthkit-icon.webp",
    href: "https://apps.apple.com/us/app/growthkit-track-height-weight/id6740914430",
    platform: "iOS",
  },
];

const META = [
  { k: "ROLE", v: "Indie iOS Developer" },
  { k: "BASED", v: "India" },
];

const TICKER_ITEMS = [
  "Built solo",
  "Shipped on iOS",
  "No bloat",
  "Private by default",
  "Made in India",
  "Three apps live",
];

const CTAS = [
  {
    n: "A",
    label: "Follow on X",
    sub: "@VishHimself",
    href: "https://x.com/VishHimself",
    external: true,
    icon: (
      <svg viewBox="0 0 300 300.251" className="w-5 h-5 fill-current">
        <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
      </svg>
    ),
  },
  {
    n: "B",
    label: "Send email",
    sub: "hey@heyvish.com",
    href: "mailto:hey@heyvish.com",
    external: false,
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <rect x="3" y="5" width="18" height="14" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    ),
  },
  {
    n: "C",
    label: "Read the blog",
    sub: "Notes & essays",
    href: "/blog",
    external: false,
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M4 4h11a3 3 0 0 1 3 3v13" />
        <path d="M4 4v14a2 2 0 0 0 2 2h12" />
        <path d="M8 9h7M8 13h7" />
      </svg>
    ),
  },
];

export default function Home() {
  const year = new Date().getFullYear();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Srivishnu Ramakrishnan",
    alternateName: "Vish",
    url: SITE_URL,
    image: `${SITE_URL}/Srivishnu-Ramakrishnan-Author.png`,
    jobTitle: "Indie iOS App Developer",
    description:
      "Indie iOS developer building Stepsly, Expenly, and GrowthKit.",
    sameAs: [
      "https://x.com/VishHimself",
      "https://apps.apple.com/us/developer/srivishnu-ramakrishnan/id1631495886",
    ],
    knowsAbout: [
      "iOS Development",
      "Swift",
      "SwiftUI",
      "React Native",
      "Next.js",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "HeyVish",
    description:
      "Personal site of Srivishnu Ramakrishnan — indie iOS developer.",
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  const appsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apps by Srivishnu Ramakrishnan",
    itemListElement: APPS.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        operatingSystem: "iOS",
        applicationCategory: "MobileApplication",
        description: app.description,
        url: app.href,
        image: `${SITE_URL}${app.icon}`,
        author: { "@id": `${SITE_URL}/#person` },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <JsonLd data={[personSchema, websiteSchema, appsSchema]} />
      {/* ── Top bar ── */}
      <header className="border-b border-foreground">
        <div className="mx-auto max-w-6xl flex items-stretch">
          <div className="flex-1 flex items-center px-4 sm:px-6 py-3 border-r border-foreground">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
              HEYVISH<span className="cursor-blink">_</span>
            </span>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center px-4 py-3 border-r border-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hidden sm:flex items-center px-4 py-3 border-r border-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            Contact
          </Link>
          <div className="flex items-stretch">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="border-b border-foreground">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12">
          {/* Left top: portrait */}
          <div className="md:col-span-5 lg:col-span-4 md:border-r border-foreground fade-up">
            <div className="relative aspect-square w-full overflow-hidden border-b border-foreground md:border-b-0">
              <Image
                src="/Vish_DP.webp"
                alt="Srivishnu Ramakrishnan"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
                className="object-cover grayscale"
                priority
              />
              <div className="absolute top-0 left-0 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background">
                ID — 001
              </div>
              <div className="absolute bottom-0 right-0 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background">
                {year}
              </div>
            </div>
          </div>

          {/* Right top: name + intro */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col fade-up border-t md:border-t-0 border-foreground">
            <div className="px-6 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-12 flex-1">
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
                [ 001 / Introduction ]
              </div>
              <h1 className="text-[44px] sm:text-[64px] md:text-[72px] lg:text-[88px] font-bold leading-[0.92] tracking-tight uppercase">
                Srivishnu
                <br />
                Ramakrishnan
              </h1>
              <div className="mt-8 max-w-xl text-sm sm:text-base leading-relaxed text-foreground/85">
                <span className="font-bold text-foreground">I make apps.</span>{" "}
                Tiny, focused, fast — the kind that earn a permanent spot on
                someone&apos;s home screen. Three live on the App Store right now.
              </div>
            </div>
          </div>

          {/* Bottom strip: META (left) + CTAs (right) — siblings in same grid row → guaranteed equal height */}
          <div className="md:col-span-5 lg:col-span-4 border-t border-foreground">
            <dl className="grid grid-cols-2">
              {META.map((m, i) => {
                // inline styles — avoids Tailwind border utility conflicts entirely
                // 0=ROLE, 1=STATUS, 2=BASED, 3=APPS
                const style: React.CSSProperties = {
                  borderColor: "var(--foreground)",
                  borderRightWidth: i === 0 ? "1px" : undefined,
                  borderBottomWidth: "0px",
                  borderStyle: "solid",
                };
                const desktopExtra = i === 0 ? "md:border-l md:border-l-foreground" : "md:border-r md:border-r-foreground";
                return (
                  <div
                    key={m.k}
                    style={style}
                    className={`flex flex-col justify-between gap-2 px-4 sm:px-5 py-3 text-[11px] uppercase tracking-[0.25em] min-h-[68px] ${desktopExtra}`}
                  >
                    <dt className="text-muted-foreground">{m.k}</dt>
                    <dd className="font-bold text-sm tracking-tight normal-case">
                      {m.v}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="md:col-span-7 lg:col-span-8 border-t border-foreground grid grid-cols-1 sm:grid-cols-3">
            {CTAS.map((c, i) => (
              <Link
                key={c.n}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`group relative flex items-center gap-4 px-4 sm:px-5 py-4 transition-colors hover:bg-foreground hover:text-background
                  ${i === 0 ? "border-b sm:border-b-0 sm:border-r border-foreground" : ""}
                  ${i === 1 ? "border-b sm:border-b-0 sm:border-r border-foreground" : ""}
                  ${i === 2 ? "md:border-r border-foreground" : ""}`}
              >
                <div className="shrink-0 w-9 h-9 border border-current flex items-center justify-center">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 mb-0.5">
                    {c.n}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-tight leading-none truncate">
                    {c.label}
                  </div>
                </div>
                <span className="text-[11px] shrink-0 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section header: Apps ── */}
      <section className="border-b border-foreground">
        <div className="mx-auto max-w-6xl flex items-stretch">
          <div className="flex-1 px-6 sm:px-8 py-3 flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold">
              [ 002 / Shipped Apps ]
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:inline">
              {APPS.length.toString().padStart(2, "0")} live · App Store
            </span>
          </div>
          <div className="hidden sm:flex items-center px-5 border-l border-foreground text-[11px] uppercase tracking-[0.2em]">
            ↓
          </div>
        </div>
      </section>

      {/* ── Apps grid ── */}
      <section className="border-b border-foreground">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3">
          {APPS.map((app, i) => (
            <Link
              key={app.id}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col p-6 sm:p-8 border-foreground transition-colors hover:bg-foreground hover:text-background
                ${i !== APPS.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] mb-10">
                <span className="font-bold">{app.id}</span>
                <span className="opacity-60 group-hover:opacity-100">{app.platform}</span>
              </div>

              <div className="relative w-16 h-16 border border-current overflow-hidden mb-7">
                <Image
                  src={app.icon}
                  alt={app.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-none mb-3">
                {app.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.25em] opacity-70 mb-6">
                {app.tagline}
              </p>
              <p className="text-sm leading-relaxed opacity-85 mb-10">
                {app.description}
              </p>

              <div className="mt-auto pt-6 border-t border-current/30 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-bold">
                <span>Open in App Store</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Ticker ── */}
      <section className="overflow-hidden">
        <div className="flex whitespace-nowrap ticker py-3 text-[11px] uppercase tracking-[0.4em] font-bold">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0" aria-hidden={i === 1}>
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, j) => (
                <span key={`${i}-${j}`} className="flex items-center">
                  <span className="px-6">{t}</span>
                  <span className="opacity-40">◇</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
