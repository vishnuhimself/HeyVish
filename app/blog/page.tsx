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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="border border-foreground mb-10">
        <div className="flex items-stretch border-b border-foreground">
          <div className="px-4 py-2 border-r border-foreground text-[10px] uppercase tracking-[0.3em] font-bold">
            [ Writing / Index ]
          </div>
          <div className="ml-auto px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {posts.length.toString().padStart(2, "0")} entries
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-none">
            Notes &amp; Essays
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            Things I&apos;ve learned shipping small iOS apps, building on the
            web, and whatever else is on my mind.
          </p>
        </div>
      </div>

      {/* Posts list */}
      <div className="border border-foreground">
        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-12 border-b border-foreground bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-bold">
          <div className="col-span-1 px-4 py-2 border-r border-background/40">№</div>
          <div className="col-span-2 px-4 py-2 border-r border-background/40">Date</div>
          <div className="col-span-9 px-4 py-2">Title</div>
        </div>

        {posts.length === 0 && (
          <div className="p-8 text-sm text-muted-foreground uppercase tracking-[0.2em]">
            — No entries yet —
          </div>
        )}

        {posts.map((post: Post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-b last:border-b-0 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            {/* Mobile: stacked card */}
            <div className="sm:hidden p-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-background/70 mb-2">
                <span>
                  <span className="text-foreground group-hover:text-background">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="mx-2 opacity-50">·</span>
                  <time dateTime={post.date}>
                    {format(parseISO(post.date), "yyyy.MM.dd")}
                  </time>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <h2 className="text-base font-bold leading-snug">
                {post.title}
              </h2>
            </div>

            {/* Desktop: table row */}
            <div className="hidden sm:grid grid-cols-12 items-center">
              <div className="col-span-1 px-4 py-4 border-r border-foreground group-hover:border-background/40 text-[11px] font-bold">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="col-span-2 px-4 py-4 border-r border-foreground group-hover:border-background/40 text-[11px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/70">
                <time dateTime={post.date}>{format(parseISO(post.date), "yyyy.MM")}</time>
              </div>
              <div className="col-span-9 px-4 py-4 flex items-center justify-between gap-4">
                <h2 className="text-sm md:text-base font-bold truncate">
                  {post.title}
                </h2>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
