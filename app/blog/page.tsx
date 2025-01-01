import { getAllPosts } from "@/lib/blog"
import { paginate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Post } from "@/lib/types"
import { format, parseISO } from "date-fns"
import { generateMetadata as genMeta } from "@/lib/metadata"

const POSTS_PER_PAGE = 10

export const metadata = genMeta({
  title: "Blog",
  description: "Articles about web development, WordPress, Next.js, and more.",
  path: "/blog",
})

type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const posts = getAllPosts()
  
  const categories = Array.from(new Set(posts.flatMap(post => 
    Array.isArray(post.category) ? post.category : [post.category]
  )))

  const { items: paginatedPosts, pageCount, currentPage: validPage } = 
    paginate(posts, currentPage, POSTS_PER_PAGE)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Link
            key={category}
            href={`/blog/category/${category.toLowerCase()}`}
            className="px-3 py-1 bg-secondary rounded-sm text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Posts list */}
      <div className="space-y-8">
        {paginatedPosts.map((post: Post) => (
          <article key={post.slug} className="group">
            <div className="space-y-2">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground">{post.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), "MMMM d, yyyy")}
                </time>
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
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={validPage === 1}
            asChild
          >
            <Link 
              href={`/blog?page=${validPage - 1}`}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === validPage ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link href={`/blog?page=${page}`}>
                  {page}
                </Link>
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={validPage === pageCount}
            asChild
          >
            <Link 
              href={`/blog?page=${validPage + 1}`}
              className="flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

// Add static params generation for pagination
export async function generateStaticParams() {
  const posts = getAllPosts()
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE)
  
  return Array.from({ length: pageCount }, (_, i) => ({
    searchParams: { page: (i + 1).toString() }
  }))
} 