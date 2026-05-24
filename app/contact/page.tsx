import Link from "next/link"
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
    <div className="max-w-4xl mx-auto">
      <JsonLd data={contactSchema} />
      <div className="border border-foreground mb-10">
        <div className="flex items-stretch border-b border-foreground">
          <div className="px-4 py-2 border-r border-foreground text-[10px] uppercase tracking-[0.3em] font-bold">
            [ Contact / Open Channels ]
          </div>
          <div className="ml-auto px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
            Response &lt; 24h
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-none">
            Say hi.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            Two ways to reach me. Pick whichever feels right.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-foreground">
        {contactMethods.map((m, i) => (
          <Link
            key={m.id}
            href={m.href}
            target={m.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`group p-6 sm:p-8 border-foreground transition-colors hover:bg-foreground hover:text-background flex flex-col gap-6 ${
              i === 0 ? "border-b md:border-b-0 md:border-r" : ""
            }`}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>{m.id}</span>
              <span className="opacity-60 group-hover:opacity-100">Open</span>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] opacity-70 mb-2">
                {m.name}
              </div>
              <div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-none break-all">
                {m.handle}
              </div>
            </div>

            <p className="text-sm leading-relaxed opacity-80">{m.description}</p>

            <div className="mt-auto flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-bold">
              <span>{m.cta}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-foreground p-6 flex items-center gap-4">
        <div className="relative w-12 h-12 border border-foreground overflow-hidden shrink-0">
          <Image
            src="/Srivishnu-Ramakrishnan-Author.png"
            alt="Srivishnu Ramakrishnan"
            fill
            className="object-cover grayscale"
          />
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">
          Usually responds within 24 hours.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          Based in India.
        </div>
      </div>
    </div>
  )
}
