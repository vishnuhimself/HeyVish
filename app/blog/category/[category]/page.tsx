import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/blog"
import { paginate } from "@/lib/utils"
import { toSummary } from "@/lib/types"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { PostList } from "@/components/blog/PostList"
import { PageHead } from "@/components/blog/PageHead"
import styles from "../../blog.module.css"

const POSTS_PER_PAGE = 10

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = new Set(
    posts.flatMap((post) => (Array.isArray(post.category) ? post.category : [post.category])).map((cat) => cat.toLowerCase())
  )
  return Array.from(categories).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const decoded = decodeURIComponent(category)
  const title = `${decoded.charAt(0).toUpperCase() + decoded.slice(1)} Articles`
  return genMeta({ title, description: `Notes about ${decoded} by Srivishnu Ramakrishnan.`, path: `/blog/category/${category}` })
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const decoded = decodeURIComponent(category)
  const all = getAllPosts()
  const categoryPosts = all.filter((post) => {
    const cats = Array.isArray(post.category) ? post.category : [post.category]
    return cats.map((c) => c.toLowerCase()).includes(decoded.toLowerCase())
  })
  if (categoryPosts.length === 0) notFound()

  const { items, pageCount, currentPage: validPage } = paginate(categoryPosts, currentPage, POSTS_PER_PAGE)
  const pretty = decoded.charAt(0).toUpperCase() + decoded.slice(1)
  const allCats = [...new Set(all.flatMap((p) => (Array.isArray(p.category) ? p.category : [p.category])))].sort()

  return (
    <main id="main" className="container">
      <PageHead
        eyebrow={<>Writing · {categoryPosts.length} {categoryPosts.length === 1 ? "note" : "notes"}</>}
        title={pretty}
        size="xl"
      >
        <Link href="/blog" className={styles.chip}>All</Link>
        {allCats.map((c) => (
          <Link key={c} href={`/blog/category/${c.toLowerCase()}`} className={styles.chip} aria-current={c.toLowerCase() === decoded.toLowerCase() ? "page" : undefined}>
            {c}
          </Link>
        ))}
      </PageHead>

      <PostList posts={items.map(toSummary)} groupByYear={false} />

      {pageCount > 1 && (
        <div className={styles.pagination}>
          <Link href={validPage > 1 ? `/blog/category/${category}?page=${validPage - 1}` : "#"} aria-disabled={validPage === 1} className="u-link u-link--draw">← Previous</Link>
          <span className="eyebrow">{validPage} / {pageCount}</span>
          <Link href={validPage < pageCount ? `/blog/category/${category}?page=${validPage + 1}` : "#"} aria-disabled={validPage === pageCount} className="u-link u-link--draw">Next →</Link>
        </div>
      )}
    </main>
  )
}
