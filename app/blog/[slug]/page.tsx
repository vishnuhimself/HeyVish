import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { LinkCard } from "@/components/LinkCard"
import { Shortcode } from "@/components/Shortcode"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { Author } from "@/components/Author"
import Link from "next/link"
import { mdxOptions } from "@/lib/mdx"
import { format, parseISO } from "date-fns"


// Move components outside of the component
const mdxComponents = {
  pre: ({ children, className, 'data-language': language, ...props }: { 
    children: React.ReactNode; 
    className?: string;
    'data-language'?: string;
  }) => (
    <div className="relative">
      {language && (
        <div className="absolute right-3 top-3 z-10 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-400">
          {language}
        </div>
      )}
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  ),
  code: ({ children, className, ...props }: { 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <code className={className} {...props}>
      {children}
    </code>
  ),
  LinkCard,
  Shortcode,
}

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
  
  if (!post) {
    return {}
  }

  return await genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    slug,
  })
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Format date on the server side, showing only the date part
  const formattedDate = format(parseISO(post.date), "MMMM d, yyyy")

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formattedDate}</time>
          {post.category && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                {Array.isArray(post.category) ? (
                  post.category.map((cat, index) => (
                    <span key={cat}>
                      <Link 
                        href={`/blog/category/${cat.toLowerCase()}`}
                        className="hover:text-primary transition-colors"
                      >
                        {cat}
                      </Link>
                      {index < post.category.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <Link 
                    href={`/blog/category/${post.category.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category}
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
        <Author />
      </header>
      <div className="prose dark:prose-invert max-w-none" suppressHydrationWarning>
        <MDXRemote 
          source={post.content} 
          components={mdxComponents}
          options={{
            parseFrontmatter: false,
            mdxOptions,
          }}
        />
      </div>
    </article>
  )
} 