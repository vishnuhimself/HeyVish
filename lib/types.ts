export type Post = {
  slug: string
  title: string
  date: string
  content: string
  description: string
  category: string | string[]
}

/** A post without its body, safe to pass to client components. */
export type PostSummary = Omit<Post, "content">

export function toSummary(post: Post): PostSummary {
  const { content: _content, ...rest } = post
  void _content
  return rest
}
