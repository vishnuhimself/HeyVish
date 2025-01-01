import { getAllPosts } from '../lib/blog'
import { generateOGImage } from '../lib/og-image'
import fs from 'fs'
import path from 'path'

async function generateOGImages() {
  console.log('🎨 Generating OG images...')
  
  // Create og directory if it doesn't exist
  const ogDir = path.join(process.cwd(), 'public/og')
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true })
  }

  // Clean existing images
  const files = fs.readdirSync(ogDir)
  files.forEach(file => {
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