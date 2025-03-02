import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { Post } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
    .filter((fileName: string) => fileName.endsWith('.mdx'))
  
  const allPostsData = fileNames.map((fileName: string) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as Omit<Post, 'slug' | 'content'>),
    }
  })

  return allPostsData.sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as Omit<Post, 'slug' | 'content'>),
    }
  } catch {
    return undefined
  }
} 