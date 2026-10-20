import type { AppStorePortfolioApp } from "@/lib/appStorePortfolio";
import type { PostSummary } from "@/lib/types";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { AppsStack } from "./AppsStack";
import { WritingPreview } from "./WritingPreview";
import { Manifesto } from "./Manifesto";
import { ContactCta } from "./ContactCta";

export function HomeExperience({ apps, posts, postCount }: { apps: AppStorePortfolioApp[]; posts: PostSummary[]; postCount: number }) {
  return (
    <main id="main">
      <Hero apps={apps} />
      <Ticker />
      <AppsStack apps={apps} />
      <Manifesto />
      <WritingPreview posts={posts} total={postCount} />
      <ContactCta />
    </main>
  );
}
