import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Make canvas optional to avoid build issues on Vercel
  webpack: (config, { isServer }) => {
    // Add canvas to the list of ignored modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/wordpress-shortcode-to-get-estimated-reading-time',
        destination: '/blog/wordpress-shortcode-to-get-estimated-reading-time',
        permanent: true,
      },
      {
        source: '/wordpress-remove-url-field-in-comments-section',
        destination: '/blog/wordpress-remove-url-field-in-comments-section',
        permanent: true,
      },
      {
        source: '/wordpress-show-featured-image-after-first-paragraph',
        destination: '/blog/wordpress-show-featured-image-after-first-paragraph',
        permanent: true,
      },
      {
        source: '/generatepress-remove-comma-between-tags',
        destination: '/blog/generatepress-remove-comma-between-tags',
        permanent: true,
      },
      {
        source: '/generatepress-show-category-below-title',
        destination: '/blog/generatepress-show-category-below-title',
        permanent: true,
      },
      {
        source: '/disable-self-pingbacks-on-wordpress',
        destination: '/blog/disable-self-pingbacks-on-wordpress',
        permanent: true,
      },
      {
        source: '/add-php-wordpress',
        destination: '/blog/add-php-wordpress',
        permanent: true,
      },
      {
        source: '/total-number-of-image-in-a-site-shortcode',
        destination: '/blog/total-number-of-image-in-a-site-shortcode',
        permanent: true,
      },
      {
        source: '/total-number-of-categories-shortcode',
        destination: '/blog/total-number-of-categories-shortcode',
        permanent: true,
      },
      {
        source: '/total-posts-shortcode',
        destination: '/blog/total-posts-shortcode',
        permanent: true,
      },
      {
        source: '/disable-comments-wordpress',
        destination: '/blog/disable-comments-wordpress',
        permanent: true,
      },
      {
        source: '/post-modified-date-shortcode',
        destination: '/blog/post-modified-date-shortcode',
        permanent: true,
      },
      {
        source: '/set-the-first-image-as-featured-image',
        destination: '/blog/set-the-first-image-as-featured-image',
        permanent: true,
      },
      {
        source: '/total-images-in-a-post-shortcode',
        destination: '/blog/total-images-in-a-post-shortcode',
        permanent: true,
      },
    ]
  },
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word']
          },
        },
      ],
    ],
  },
})
 
export default withMDX(nextConfig) 