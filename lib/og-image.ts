import { createCanvas, loadImage } from 'canvas'
import path from 'path'
import fs from 'fs'

export async function generateOGImage(text: string, slug: string): Promise<string> {
  const fileName = `${slug}.png`
  const publicDir = path.join(process.cwd(), 'public/og')
  const filePath = path.join(publicDir, fileName)
  
  // Check if image already exists
  if (fs.existsSync(filePath)) {
    return `/og/${fileName}`
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Create canvas
  const width = 1200
  const height = 630
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  // Background
  context.fillStyle = '#323232'
  context.fillRect(0, 0, width, height)

  // Add text - using system font
  context.font = 'bold 65px sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#ffffff'

  // Text wrapping
  const words = text.split(' ')
  let line = ''
  const lines = []
  const maxWidth = width - 120
  const lineHeight = 75

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    const metrics = context.measureText(testLine)
    
    if (metrics.width > maxWidth && i > 0) {
      lines.push(line)
      line = words[i] + ' '
    } else {
      line = testLine
    }
  }
  lines.push(line)

  // Calculate positions
  const totalTextHeight = lines.length * lineHeight
  const authorImageSize = 80
  const spacing = 40
  const contentHeight = totalTextHeight + spacing + authorImageSize
  
  // Start position that will center both text and image together
  const startY = (height - contentHeight) / 2

  // Draw text lines
  lines.forEach((line, i) => {
    context.fillText(
      line.trim(),
      width / 2,
      startY + i * lineHeight
    )
  })

  // Add author image below text
  try {
    const authorImage = await loadImage(path.join(process.cwd(), 'public/Srivishnu-Ramakrishnan-Author.png'))
    const imageX = (width - authorImageSize) / 2
    const imageY = startY + totalTextHeight + spacing
    context.drawImage(authorImage, imageX, imageY, authorImageSize, authorImageSize)
  } catch {
    console.log('Author image not found, skipping...')
  }

  // Save the image
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(filePath, buffer)

  return `/og/${fileName}`
} 