import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { LinkCard } from "@/components/LinkCard"
import { Shortcode } from "@/components/Shortcode"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { Author } from "@/components/Author"
import { JsonLd } from "@/components/JsonLd"
import { SplitText } from "@/components/site/SplitText"
import { Reveal } from "@/components/site/Reveal"
import Link from "next/link"
import { renderMDX } from "@/lib/mdx"
import { format, parseISO } from "date-fns"
import styles from "../blog.module.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return await genMeta({ title: post.title, description: post.description, path: `/blog/${slug}`, type: "article", slug, publishedTime: post.date })
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const all = getAllPosts()
  const idx = all.findIndex((p) => p.slug === slug)
  const newer = idx > 0 ? all[idx - 1] : null
  const older = idx < all.length - 1 ? all[idx + 1] : null

  const formattedDate = format(parseISO(post.date), "MMMM d, yyyy")
  const content = await renderMDX(post.content, { LinkCard, Shortcode })
  const postUrl = `${SITE_URL}/blog/${slug}`
  const categories = Array.isArray(post.category) ? post.category : [post.category]
  const words = post.content.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 220))

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    url: postUrl,
    image: `${SITE_URL}/og/${slug}.png`,
    author: { "@type": "Person", name: "Srivishnu Ramakrishnan", url: SITE_URL },
    publisher: { "@type": "Person", name: "Srivishnu Ramakrishnan", url: SITE_URL },
    keywords: categories.join(", "),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <main id="main" className={`container ${styles.article}`}>
      <div className="read-progress" aria-hidden="true" />
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />

      <article>
        <header className={styles.header}>
          <Reveal y={10}>
            <Link href="/blog" className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m0 0 6 6m-6-6 6-6" /></svg>
              All writing
            </Link>
          </Reveal>
          <Reveal as="p" className={styles.meta} delay={0.05} y={10}>
            <time dateTime={post.date}>{formattedDate}</time>
            <i aria-hidden="true" />
            <span>{minutes} min read</span>
            <i aria-hidden="true" />
            <span>
              {categories.map((cat, i) => (
                <span key={cat}>
                  <Link href={`/blog/category/${cat.toLowerCase()}`}>{cat}</Link>
                  {i < categories.length - 1 && ", "}
                </span>
              ))}
            </span>
          </Reveal>
          <h1 className={`display-l ${styles.title}`}>
            <SplitText text={post.title} immediate delay={0.15} stagger={0.035} />
          </h1>
          <Reveal delay={0.4} y={10}>
            <Author />
          </Reveal>
        </header>

        <Reveal className={`prose ${styles.body}`} delay={0.5} y={16} amount={0.05} blur={false}>
          {content}
        </Reveal>
      </article>

      <nav className={styles.pager} aria-label="More writing">
        {older ? (
          <Link href={`/blog/${older.slug}`} className={styles.pagerLink} data-dir="prev">
            <span className="eyebrow">Older</span>
            <strong>{older.title}</strong>
          </Link>
        ) : <span />}
        {newer ? (
          <Link href={`/blog/${newer.slug}`} className={styles.pagerLink} data-dir="next">
            <span className="eyebrow">Newer</span>
            <strong>{newer.title}</strong>
          </Link>
        ) : <span />}
      </nav>
    </main>
  )
}
