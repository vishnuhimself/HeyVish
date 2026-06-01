import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Post } from "@/lib/types"
import { format, parseISO } from "date-fns"
import { generateMetadata as genMeta } from "@/lib/metadata"

export const metadata = genMeta({
  title: "Blog — Notes & Essays",
  description:
    "Notes & essays by Srivishnu Ramakrishnan on shipping iOS apps, Swift, React Native, Next.js, and indie development.",
  path: "/blog",
})

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight mb-3">
          Notes &amp; Essays
        </h1>
        <p className="text-base text-muted-foreground max-w-md">
          Things I&apos;ve learned shipping iOS apps and building on the web.
        </p>
      </div>

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground py-8">No posts yet.</p>
      )}

      <div>
        {posts.map((post: Post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-6 py-4 border-b border-border first:border-t hover:opacity-60 transition-opacity"
          >
            <h2 className="text-base font-medium text-foreground leading-snug">
              {post.title}
            </h2>
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground shrink-0"
            >
              {format(parseISO(post.date), "MMM yyyy")}
            </time>
          </Link>
        ))}
      </div>
    </div>
  )
}
