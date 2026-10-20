import { generateMetadata as genMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { ContactCta } from "@/components/home/ContactCta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

export const metadata = genMeta({
  title: "Contact",
  description: "Get in touch with Srivishnu Ramakrishnan by email or on X. Usually replies within a day.",
  path: "/contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: "Contact — HeyVish",
    description: "Reach Srivishnu Ramakrishnan via email or X.",
    mainEntity: { "@type": "Person", name: "Srivishnu Ramakrishnan", url: SITE_URL, email: "hey@heyvish.com", sameAs: ["https://x.com/VishHimself"] },
  };

  return (
    <main id="main">
      <JsonLd data={contactSchema} />
      <ContactCta heading="Say hey." compact />
    </main>
  );
}
