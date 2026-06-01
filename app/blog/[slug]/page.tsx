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
    <article className="max-w-2xl">
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 gap-1"
      >
        ← All posts
      </Link>

      <header className="mb-12 pb-10 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <time dateTime={post.date}>{formattedDate}</time>
          {post.category && (
            <>
              <span className="opacity-40">·</span>
              <span>
                {Array.isArray(post.category) ? (
                  post.category.map((cat, index) => (
                    <span key={cat}>
                      <Link
                        href={`/blog/category/${cat.toLowerCase()}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {cat}
                      </Link>
                      {index < (post.category as string[]).length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <Link
                    href={`/blog/category/${post.category.toLowerCase()}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {post.category}
                  </Link>
                )}
              </span>
            </>
          )}
        </div>
        <h1 className="font-display font-semibold text-3xl sm:text-4xl text-foreground tracking-tight leading-[1.1] mb-8">
          {post.title}
        </h1>
        <Author />
      </header>

      <div
        className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:opacity-70 prose-pre:bg-secondary prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:text-muted-foreground"
        suppressHydrationWarning
      >
        {content}
      </div>
    </article>
  )
}
