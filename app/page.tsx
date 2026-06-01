import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

const APPS = [
  {
    id: "stepsly",
    name: "Stepsly",
    tagline: "Pedometer & step widgets",
    description: "A simple step counter for iPhone. Live activity, lock-screen widgets, no nonsense.",
    icon: "/stepsly-icon.webp",
    href: "https://apps.apple.com/us/app/steps-app-pedometer-widgets/id6753876664",
  },
  {
    id: "expenly",
    name: "Expenly",
    tagline: "Expense tracker",
    description: "Track every spend. Offline-first, fully private, lives on your device.",
    icon: "/expenly-icon.webp",
    href: "https://apps.apple.com/us/app/expense-tracker-expensekit/id6756433597",
  },
  {
    id: "growthkit",
    name: "GrowthKit",
    tagline: "Height & weight tracker",
    description: "Plot your kid's growth curves. WHO percentiles, clean charts, no accounts.",
    icon: "/growthkit-icon.webp",
    href: "https://apps.apple.com/us/app/growthkit-track-height-weight/id6740914430",
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
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[personSchema, websiteSchema, appsSchema]} />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 h-12 flex items-center justify-between">
          <span className="font-display text-sm font-semibold tracking-tight">Vish</span>
          <nav className="flex items-center gap-0.5">
            <Link href="/blog" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link href="/contact" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <div className="ml-1"><ModeToggle /></div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 sm:px-8">

        {/* ── Intro ── */}
        <div className="pt-12 pb-10 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-muted shrink-0">
              <Image src="/Vish_DP.webp" alt="Vish" fill sizes="36px" className="object-cover" priority />
            </div>
            <span className="text-sm text-muted-foreground">Indie iOS developer · India</span>
          </div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-foreground tracking-tight mb-3">
            <span className="text-foreground/100">Sri</span>vish<span className="text-foreground/100">nu Ramakrishnan</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            I make small, focused apps — the kind that earn a permanent spot on your home screen.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="https://x.com/VishHimself" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:opacity-50 transition-opacity">
              X / Twitter →
            </a>
            <a href="mailto:hey@heyvish.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              hey@heyvish.com
            </a>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>
        </div>

        {/* ── Apps ── */}
        <div className="py-8">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">Apps</p>
          <div>
            {APPS.map((app) => (
              <a
                key={app.id}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3.5 border-b border-border last:border-b-0 hover:opacity-60 transition-opacity"
              >
                <div className="relative w-10 h-10 shrink-0 overflow-hidden shadow-sm" style={{ borderRadius: "22%" }}>
                  <Image src={app.icon} alt={app.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-display font-medium text-sm text-foreground">{app.name}</span>
                  <span className="text-sm text-muted-foreground"> — {app.tagline}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 group-hover:text-foreground transition-colors">
                  App Store →
                </span>
              </a>
            ))}
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="mx-auto max-w-2xl px-5 sm:px-8 py-5 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">© {year} Vish</span>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="mailto:hey@heyvish.com" className="hover:text-foreground transition-colors">Email</a>
          <a href="https://x.com/VishHimself" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
