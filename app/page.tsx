import { JsonLd } from "@/components/JsonLd";
import { HomeExperience } from "@/components/home/HomeExperience";
import { APP_STORE_PORTFOLIO } from "@/lib/appStorePortfolio";
import { getAllPosts } from "@/lib/blog";
import { toSummary } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 4).map(toSummary);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Srivishnu Ramakrishnan",
    alternateName: "Vish",
    url: SITE_URL,
    image: `${SITE_URL}/Srivishnu-Ramakrishnan-Author.png`,
    jobTitle: "Indie iOS App Developer",
    description: "Independent developer building focused iPhone apps: Stepsly, Expenly, GrowthKit, and MNML.",
    sameAs: ["https://x.com/VishHimself", "https://apps.apple.com/us/developer/srivishnu-ramakrishnan/id1792193135"],
    knowsAbout: ["iOS Development", "Swift", "SwiftUI", "React Native", "Next.js"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "HeyVish",
    description: "Personal site of Srivishnu Ramakrishnan, independent iOS developer.",
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  const appsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apps by Srivishnu Ramakrishnan",
    itemListElement: APP_STORE_PORTFOLIO.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.appStoreName,
        operatingSystem: "iOS",
        applicationCategory: app.category,
        description: app.description,
        url: app.href,
        image: `${SITE_URL}${app.icon}`,
        author: { "@id": `${SITE_URL}/#person` },
      },
    })),
  };

  return (
    <>
      <JsonLd data={[personSchema, websiteSchema, appsSchema]} />
      <HomeExperience apps={APP_STORE_PORTFOLIO} posts={latest} postCount={posts.length} />
    </>
  );
}
