import { getAllPosts } from "@/lib/blog"
import { paginate } from "@/lib/utils"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import type { Post } from "@/lib/types"
import { notFound } from "next/navigation"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className="max-w-3xl mx-auto">
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to all articles
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}
        </h1>
        <p className="text-muted-foreground">
          {categoryPosts.length} article{categoryPosts.length === 1 ? '' : 's'} about {decodedCategory.toLowerCase()}
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {paginatedPosts.map((post: Post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {format(parseISO(post.date), "MMMM d, yyyy")}
                  </time>
                </div>
              </div>
            </Link>
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
              href={`/blog/category/${category}?page=${validPage - 1}`}
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
                <Link href={`/blog/category/${category}?page=${page}`}>
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
              href={`/blog/category/${category}?page=${validPage + 1}`}
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