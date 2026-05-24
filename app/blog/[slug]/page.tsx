import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { LinkCard } from "@/components/LinkCard"
import { Shortcode } from "@/components/Shortcode"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { Author } from "@/components/Author"
import { JsonLd } from "@/components/JsonLd"
import Link from "next/link"
import { renderMDX } from "@/lib/mdx"
import { format, parseISO } from "date-fns"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://heyvish.com"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return await genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    slug,
    publishedTime: post.date,
  })
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = format(parseISO(post.date), "MMMM d, yyyy")

  const content = await renderMDX(post.content, {
    LinkCard,
    Shortcode,
  })

  const postUrl = `${SITE_URL}/blog/${slug}`
  const categories = Array.isArray(post.category)
    ? post.category
    : [post.category]

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
    author: {
      "@type": "Person",
      name: "Srivishnu Ramakrishnan",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Srivishnu Ramakrishnan",
      url: SITE_URL,
    },
    keywords: categories.join(", "),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <article className="max-w-3xl mx-auto">
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      <Link
        href="/blog"
        className="inline-flex items-center border border-foreground px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors mb-8"
      >
        ← Back to index
      </Link>

      <header className="border border-foreground mb-10">
        <div className="flex items-stretch border-b border-foreground text-[10px] uppercase tracking-[0.3em]">
          <time dateTime={post.date} className="px-4 py-2 border-r border-foreground font-bold">
            {formattedDate}
          </time>
          {post.category && (
            <div className="px-4 py-2 border-r border-foreground flex items-center gap-2">
              {Array.isArray(post.category) ? (
                post.category.map((cat, index) => (
                  <span key={cat}>
                    <Link
                      href={`/blog/category/${cat.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {cat}
                    </Link>
                    {index < (post.category as string[]).length - 1 && ", "}
                  </span>
                ))
              ) : (
                <Link
                  href={`/blog/category/${post.category.toLowerCase()}`}
                  className="hover:underline"
                >
                  {post.category}
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.05]">
            {post.title}
          </h1>
        </div>
        <div className="border-t border-foreground px-6 sm:px-8 py-4">
          <Author />
        </div>
      </header>

      <div
        className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-pre:border prose-pre:border-foreground prose-pre:bg-secondary prose-code:before:content-none prose-code:after:content-none prose-img:border prose-img:border-foreground prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:not-italic prose-hr:border-foreground"
        suppressHydrationWarning
      >
        {content}
      </div>
    </article>
  )
}
