import { getAllPosts } from "@/lib/blog"
import { paginate } from "@/lib/utils"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import type { Post } from "@/lib/types"
import { notFound } from "next/navigation"
import { generateMetadata as genMeta } from "@/lib/metadata"

const POSTS_PER_PAGE = 10

type Props = {
  params: Promise<{
    category: string
  }>,
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = new Set(posts.flatMap(post => 
    Array.isArray(post.category) ? post.category : [post.category]
  ).map(cat => cat.toLowerCase()))
  
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE)
  
  return Array.from(categories).flatMap((category) => 
    Array.from({ length: pageCount }, (_, i) => ({
      category,
      searchParams: { page: (i + 1).toString() }
    }))
  )
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const title = `${decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)} Articles`
  
  return genMeta({
    title,
    description: `Articles about ${decodedCategory}`,
    path: `/blog/category/${category}`,
  })
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  
  const decodedCategory = decodeURIComponent(category)
  const allPosts = getAllPosts()
  const categoryPosts = allPosts.filter(post => {
    if (Array.isArray(post.category)) {
      return post.category.map(cat => cat.toLowerCase()).includes(decodedCategory.toLowerCase())
    }
    return post.category.toLowerCase() === decodedCategory.toLowerCase()
  })

  if (categoryPosts.length === 0) {
    notFound()
  }

  const { items: paginatedPosts, pageCount, currentPage: validPage } = 
    paginate(categoryPosts, currentPage, POSTS_PER_PAGE)

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors mb-14 gap-2"
      >
        ← All posts
      </Link>

      <div className="grid md:grid-cols-[1fr_auto] items-end gap-6 mb-16 sm:mb-20">
        <h1 className="font-display font-medium text-6xl sm:text-7xl text-foreground tracking-[-0.06em] leading-[0.9]">
          {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground md:pb-2">
          {categoryPosts.length} article{categoryPosts.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="border-t border-border">
        {paginatedPosts.map((post: Post, index: number) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_8rem] items-center gap-4 sm:gap-6 py-5 sm:py-7 border-b border-border"
          >
            <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-medium tracking-[-0.035em] leading-tight group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              {post.description && (
                <p className="hidden sm:block text-sm text-muted-foreground mt-1.5 max-w-2xl">{post.description}</p>
              )}
            </div>
            <time
              dateTime={post.date}
              className="text-xs sm:text-sm text-muted-foreground text-right shrink-0"
            >
              {format(parseISO(post.date), "MMM yyyy")}
            </time>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-10">
          <Link
            href={validPage > 1 ? `/blog/category/${category}?page=${validPage - 1}` : "#"}
            aria-disabled={validPage === 1}
            className={`text-sm ${validPage === 1 ? "text-muted-foreground pointer-events-none" : "text-foreground hover:opacity-60 transition-opacity"}`}
          >
            ← Previous
          </Link>
          <span className="text-sm text-muted-foreground">
            {validPage} / {pageCount}
          </span>
          <Link
            href={validPage < pageCount ? `/blog/category/${category}?page=${validPage + 1}` : "#"}
            aria-disabled={validPage === pageCount}
            className={`text-sm ${validPage === pageCount ? "text-muted-foreground pointer-events-none" : "text-foreground hover:opacity-60 transition-opacity"}`}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  )
}
