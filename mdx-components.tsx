import type { MDXComponents } from 'mdx/types'
import { LinkCard } from '@/components/LinkCard'
import { Shortcode } from '@/components/Shortcode'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    code: ({ children }) => (
      <code className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-mono">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 rounded-lg bg-muted overflow-x-auto mb-4">{children}</pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-primary">{children}</strong>
    ),
    LinkCard,
    Shortcode,
    ...components,
  }
} 