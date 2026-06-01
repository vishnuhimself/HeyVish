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
    <div>
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 gap-1"
      >
        ← All posts
      </Link>

      <div className="mb-12">
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight mb-2">
          {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}
        </h1>
        <p className="text-sm text-muted-foreground">
          {categoryPosts.length} article{categoryPosts.length === 1 ? "" : "s"}
        </p>
      </div>

      <div>
        {paginatedPosts.map((post: Post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-6 py-4 border-b border-border first:border-t hover:opacity-60 transition-opacity"
          >
            <div>
              <h2 className="text-base font-medium text-foreground leading-snug mb-1">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-muted-foreground">{post.description}</p>
              )}
            </div>
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground shrink-0"
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
