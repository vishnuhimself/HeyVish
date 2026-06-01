import Image from "next/image"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { JsonLd } from "@/components/JsonLd"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com"

export const metadata = genMeta({
  title: "Contact",
  description:
    "Get in touch with Srivishnu Ramakrishnan via email or X. Usually responds within 24 hours.",
  path: "/contact",
})

const contactMethods = [
  {
    id: "01",
    name: "Email",
    handle: "hey@heyvish.com",
    description: "Best for everything — questions, app support, work, hellos.",
    href: "mailto:hey@heyvish.com",
    cta: "Compose →",
  },
  {
    id: "02",
    name: "X / Twitter",
    handle: "@VishHimself",
    description: "Follow along for app updates, shipping notes, and short takes.",
    href: "https://x.com/VishHimself",
    cta: "Follow →",
  },
]

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: "Contact — HeyVish",
    description:
      "Reach Srivishnu Ramakrishnan via email or X.",
    mainEntity: {
      "@type": "Person",
      name: "Srivishnu Ramakrishnan",
      url: SITE_URL,
      email: "hey@heyvish.com",
      sameAs: ["https://x.com/VishHimself"],
    },
  }

  return (
    <div className="max-w-xl">
      <JsonLd data={contactSchema} />
      <div className="mb-12">
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight mb-3">
          Say hi.
        </h1>
        <p className="text-base text-muted-foreground">
          Two ways to reach me. Usually responds within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        {contactMethods.map((m) => (
          <a
            key={m.id}
            href={m.href}
            target={m.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group block p-6 rounded-xl border border-border bg-secondary/30 hover:border-foreground/25 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {m.name}
                </p>
                <p className="font-display font-semibold text-xl text-foreground tracking-tight">
                  {m.handle}
                </p>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1">
                {m.cta}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {m.description}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
          <Image
            src="/Srivishnu-Ramakrishnan-Author.png"
            alt="Srivishnu Ramakrishnan"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Usually responds within 24 hours · Based in India.
        </p>
      </div>
    </div>
  )
}
