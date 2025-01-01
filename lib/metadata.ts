import { generateOGImage } from './og-image'

const siteConfig = {
  title: "Srivishnu Ramakrishnan",
  description: "Engineer by day, web creator by passion. Sharing insights on web development, Next.js, WordPress, and building impactful websites",
  author: "Srivishnu Ramakrishnan",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com", // fallback for dev
}

export async function generateMetadata({
  title,
  description,
  path,
  type = "website",
  slug,
}: {
  title: string
  description: string
  path?: string
  type?: "website" | "article"
  slug?: string
}) {
  const url = siteConfig.url
  const canonical = path ? `${url}${path}` : url
  
  // Generate OG image with slug if provided
  const ogImage = slug 
    ? await generateOGImage(title, slug)
    : await generateOGImage(title, 'default')
  const ogImageUrl = `${url}${ogImage}`

  return {
    title: {
      template: `%s`,
      default: title,
    },
    description,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(url),
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.title,
      locale: "en_US",
      type,
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
} 