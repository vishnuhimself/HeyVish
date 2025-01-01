import rehypePrettyCode, { Options as RehypePrettyCodeOptions, LineElement } from "rehype-pretty-code"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import type { CompileOptions } from '@mdx-js/mdx'
import type { Plugin } from 'unified'

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: true,
  onVisitLine(element: LineElement) {
    if (element.children.length === 0) {
      element.children = [{ type: 'text', value: ' ' }]
    }
  },
  filterMetaString: (meta: string) => meta
}

const rehypePrettyCodePlugin = rehypePrettyCode as Plugin<[RehypePrettyCodeOptions]>

export const mdxOptions: CompileOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCodePlugin, prettyCodeOptions] as [Plugin<[RehypePrettyCodeOptions]>, RehypePrettyCodeOptions],
  ]
} 