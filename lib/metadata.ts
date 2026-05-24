import { generateOGImage } from "./og-image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com";

const siteConfig = {
  title: "HeyVish",
  defaultDescription:
    "Srivishnu Ramakrishnan — indie iOS developer building Stepsly, Expenly, and GrowthKit. Notes on shipping software.",
  author: "Srivishnu Ramakrishnan",
  url: SITE_URL,
  twitter: "@VishHimself",
};

export async function generateMetadata({
  title,
  description,
  path,
  type = "website",
  slug,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  slug?: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const canonicalPath = path ?? "/";
  const ogImage = slug
    ? await generateOGImage(title, slug)
    : await generateOGImage(title, "default");

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.title,
      locale: "en_US",
      type,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.url],
          }
        : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      creator: siteConfig.twitter,
      images: [ogImage],
    },
  };
}
