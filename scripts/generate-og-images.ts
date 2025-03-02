/// <reference types="node" />

import { getAllPosts } from '../lib/blog'
import { generateOGImage } from '../lib/og-image'

// Use require for Node.js modules to avoid TypeScript errors
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process')

async function generateOGImages(): Promise<void> {
  console.log('🎨 Generating OG images...')
  
  try {
    // Try to require canvas to check if it's available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('canvas')
  } catch (error) {
    console.warn('⚠️ Canvas package not available. OG images will not be generated.')
    console.warn('⚠️ Deploy will continue with fallback images.')
    return
  }
  
  // Verify font exists
  const fontPath = path.join(process.cwd(), 'fonts/BeVietnamPro.ttf')
  if (!fs.existsSync(fontPath)) {
    console.error('❌ Be Vietnam Pro font not found!')
    process.exit(1)
  }

  // Create og directory if it doesn't exist
  const ogDir = path.join(process.cwd(), 'public/og')
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true })
  }

  // Clean existing images
  const files = fs.readdirSync(ogDir)
  files.forEach((file: string) => {
    if (file !== '.gitkeep') {
      fs.unlinkSync(path.join(ogDir, file))
    }
  })

  // Get all posts
  const posts = getAllPosts()
  
  // Generate OG images
  for (const post of posts) {
    try {
      console.log(`Generating OG image for: ${post.title}`)
      await generateOGImage(post.title, post.slug)
    } catch (error) {
      console.error(`Failed to generate OG image for ${post.slug}:`, error)
    }
  }

  console.log('✨ OG images generation complete!')
}

generateOGImages().catch(console.error) 