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
    <div>
      <JsonLd data={contactSchema} />
      <header className="mb-16"><h1 className="text-3xl font-normal tracking-[-0.035em] mb-6">Contact</h1><p className="text-base leading-relaxed">Questions, app support, ideas, or a simple hello.</p></header>

      <div className="border-t border-border">
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group grid grid-cols-[1fr_auto] gap-5 items-center py-4 border-b border-border"
          >
            <span>
              <strong className="block text-sm font-normal group-hover:opacity-50 transition-opacity">
                {method.handle}
              </strong>
              <span className="block text-xs text-muted-foreground mt-1">
                {method.description}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              {method.cta}
            </span>
          </a>
        ))}
      </div>

    </div>
  );
}
