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
      <header className="mb-16"><h1 className="text-3xl font-normal tracking-[-0.035em] mb-6">Writing</h1><p className="text-base leading-relaxed">Notes from building and shipping independent software.</p></header>
      <div className="border-t border-border">
        {posts.map((post: Post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[1fr_auto] gap-5 items-baseline py-4 border-b border-border"
          >
            <h2 className="text-sm font-normal leading-snug group-hover:opacity-50 transition-opacity">
              {post.title}
            </h2>
            <time dateTime={post.date} className="text-xs text-muted-foreground text-right shrink-0">
              {format(parseISO(post.date), "dd/MM/yy")}
            </time>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground py-12">No notes yet.</p>
      )}
    </div>
  )
}
