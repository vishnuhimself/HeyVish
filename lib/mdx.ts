/**
 * Custom MDX renderer that avoids the next-mdx-remote/rsc React instance
 * mismatch bug in Next.js 15/16 + Turbopack dev mode.
 *
 * Compiles MDX with @mdx-js/mdx, then evaluates the output using the same
 * React instance already loaded in this process.
 */

import { compile } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
  type LineElement,
} from "rehype-pretty-code"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import type { Plugin } from "unified"
import type { MDXComponents } from "mdx/types"

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: true,
  onVisitLine(element: LineElement) {
    if (element.children.length === 0) {
      element.children = [{ type: "text", value: " " }]
    }
  },
  filterMetaString: (meta: string) => meta,
}

const rehypePrettyCodePlugin = rehypePrettyCode as Plugin<
  [RehypePrettyCodeOptions]
>

/**
 * Compile + evaluate MDX source, returning a React element.
 * Runs server-side only.
 */
export async function renderMDX(
  source: string,
  components: MDXComponents = {}
) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCodePlugin, prettyCodeOptions] as [
        Plugin<[RehypePrettyCodeOptions]>,
        RehypePrettyCodeOptions
      ],
    ],
  })

  const code = String(compiled)

  // eslint-disable-next-line no-new-func
  const fn = new Function(code)
  const mod = fn({ ...runtime })
  const MDXContent = mod.default as (props: {
    components?: MDXComponents
  }) => React.ReactElement

  return MDXContent({ components })
}

/** Re-export mdxOptions for legacy use if needed */
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCodePlugin, prettyCodeOptions] as [
      Plugin<[RehypePrettyCodeOptions]>,
      RehypePrettyCodeOptions
    ],
  ],
}
