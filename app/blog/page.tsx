import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Post } from "@/lib/types"
import { format, parseISO } from "date-fns"
import { generateMetadata as genMeta } from "@/lib/metadata"

export const metadata = genMeta({
  title: "Blog",
  description: "Articles about web development, WordPress, Next.js, and more.",
  path: "/blog",
})

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Posts list - Minimal Design */}
      <div className="space-y-4">
        {posts.map((post: Post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-2"
          >
            <time 
              dateTime={post.date}
              className="text-muted-foreground text-sm w-16 flex-shrink-0"
            >
              {format(parseISO(post.date), "yyyy")}
            </time>
            <h2 className="text-sm font-normal flex-1 group-hover:underline">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
} 