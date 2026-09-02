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
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_0.34fr] gap-8 md:gap-20 items-end mb-16 sm:mb-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">Notes from the workbench</p>
          <h1 className="font-display font-medium text-6xl sm:text-7xl lg:text-8xl text-foreground tracking-[-0.065em] leading-[0.88]">
            Things worth<br /><em className="font-light text-muted-foreground">writing down.</em>
          </h1>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-sm md:pb-2">
          Small fixes, technical notes, and useful details from building and shipping independent software.
        </p>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_8rem] gap-3 sm:gap-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground border-b border-border">
          <span>No.</span><span>Note</span><span className="text-right">Published</span>
        </div>
        {posts.map((post: Post, index: number) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_8rem] gap-3 sm:gap-6 items-center py-5 sm:py-7 border-b border-border active:scale-[0.995] transition-transform"
          >
            <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="font-display text-xl sm:text-2xl font-medium tracking-[-0.035em] leading-tight group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <time dateTime={post.date} className="text-xs sm:text-sm text-muted-foreground text-right shrink-0">
              {format(parseISO(post.date), "MMM yyyy")}
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
