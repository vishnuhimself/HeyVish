import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { toSummary } from "@/lib/types"
import { generateMetadata as genMeta } from "@/lib/metadata"
import { PostList } from "@/components/blog/PostList"
import { PageHead } from "@/components/blog/PageHead"
import styles from "./blog.module.css"

export const metadata = genMeta({
  title: "Writing — Notes & Essays",
  description:
    "Notes by Srivishnu Ramakrishnan on shipping iOS apps, Swift, React Native, Next.js, WordPress, and independent development.",
  path: "/blog",
})

export default async function BlogPage() {
  const posts = getAllPosts().map(toSummary)
  const categories = [...new Set(posts.flatMap((p) => (Array.isArray(p.category) ? p.category : [p.category])))].sort()

  return (
    <main id="main" className="container">
      <PageHead
        eyebrow={<>Writing · {String(posts.length).padStart(2, "0")} notes</>}
        title="Things I had to figure out."
        italic={["figure", "out."]}
        lede="Short, practical notes from building and shipping independent software. Mostly fixes, occasionally opinions."
      >
        {categories.map((c) => (
          <Link key={c} href={`/blog/category/${c.toLowerCase()}`} className={styles.chip}>
            {c}
          </Link>
        ))}
      </PageHead>

      <PostList posts={posts} />
      {posts.length === 0 && <p className="lede">No notes yet.</p>}
    </main>
  )
}
