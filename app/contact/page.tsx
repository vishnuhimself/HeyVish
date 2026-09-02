import Image from "next/image";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

export const metadata = genMeta({
  title: "Contact",
  description:
    "Get in touch with Srivishnu Ramakrishnan via email or X. Usually responds within 24 hours.",
  path: "/contact",
});

const contactMethods = [
  {
    name: "Email",
    handle: "hey@heyvish.com",
    description: "Best for questions, app support, work, ideas, and hellos.",
    href: "mailto:hey@heyvish.com",
    cta: "Compose →",
  },
  {
    name: "X / Twitter",
    handle: "@VishHimself",
    description: "App updates, shipping notes, experiments, and short takes.",
    href: "https://x.com/VishHimself",
    cta: "Open X →",
  },
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: "Contact — HeyVish",
    description: "Reach Srivishnu Ramakrishnan via email or X.",
    mainEntity: {
      "@type": "Person",
      name: "Srivishnu Ramakrishnan",
      url: SITE_URL,
      email: "hey@heyvish.com",
      sameAs: ["https://x.com/VishHimself"],
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <JsonLd data={contactSchema} />
      <div className="grid md:grid-cols-[1fr_0.38fr] gap-10 md:gap-24 items-end mb-16 sm:mb-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">
            Contact
          </p>
          <h1 className="font-display font-medium text-6xl sm:text-7xl lg:text-8xl text-foreground tracking-[-0.065em] leading-[0.88]">
            Say hey.
            <br />
            <em className="font-light text-muted-foreground">I read everything.</em>
          </h1>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed md:pb-2">
          Questions, app support, ideas, or a simple hello. Usually responds
          within 24 hours.
        </p>
      </div>

      <div className="border-t border-border">
        {contactMethods.map((method, index) => (
          <a
            key={method.name}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group grid sm:grid-cols-[4rem_0.7fr_1fr_auto] gap-4 sm:gap-8 items-center py-7 sm:py-9 border-b border-border active:scale-[0.995] transition-transform"
          >
            <span className="text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {method.name}
            </span>
            <span>
              <strong className="block font-display text-2xl sm:text-3xl font-medium tracking-[-0.04em] group-hover:text-accent transition-colors">
                {method.handle}
              </strong>
              <span className="block text-sm text-muted-foreground leading-relaxed mt-1">
                {method.description}
              </span>
            </span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {method.cta}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-[42%] overflow-hidden bg-muted shrink-0">
          <Image
            src="/Srivishnu-Ramakrishnan-Author.png"
            alt="Srivishnu Ramakrishnan"
            fill
            className="object-cover grayscale"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Srivishnu Ramakrishnan · Based in India.
        </p>
      </div>
    </div>
  );
}
