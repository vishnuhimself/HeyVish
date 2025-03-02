/// <reference types="node" />
import * as path from 'path'
import * as fs from 'fs'

// Define types for canvas functions
interface CanvasImage {
  width: number;
  height: number;
}

interface CanvasRenderingContext2D {
  fillStyle: string;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  fillRect: (x: number, y: number, width: number, height: number) => void;
  fillText: (text: string, x: number, y: number) => void;
  measureText: (text: string) => TextMetrics;
  drawImage: (image: CanvasImage, x: number, y: number, width: number, height: number) => void;
  getContext: (type: string) => CanvasRenderingContext2D;
}

interface Canvas {
  getContext: (type: string) => CanvasRenderingContext2D;
  toBuffer: (format: string) => Buffer;
}

// Only import canvas in environments where it's available
let createCanvas: ((width: number, height: number) => Canvas) | undefined;
let loadImage: ((path: string) => Promise<CanvasImage>) | undefined;
let registerFont: ((path: string, options: { family: string }) => void) | undefined;

try {
  // We need to use require here as canvas is not available in all environments
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const canvas = require('canvas');
  createCanvas = canvas.createCanvas;
  loadImage = canvas.loadImage;
  registerFont = canvas.registerFont;
  
  // Register the font if canvas is available
  const fontPath = path.join(process.cwd(), 'fonts/BeVietnamPro.ttf')
  if (fs.existsSync(fontPath) && registerFont) {
    registerFont(fontPath, { family: 'Be Vietnam Pro' })
  }
} catch {
  console.warn('Canvas package not available, will use fallback OG images')
}

export async function generateOGImage(text: string, slug: string): Promise<string> {
  const fileName = `${slug}.png`
  const publicDir = path.join(process.cwd(), 'public/og')
  const filePath = path.join(publicDir, fileName)
  
  // Check if image already exists
  if (fs.existsSync(filePath)) {
    return `/og/${fileName}`
  }

  // If we're in a production build without canvas, return fallback image
  if (!createCanvas || !loadImage) {
    return '/Srivishnu-Ramakrishnan-Author.png' // Fallback to author image
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
  context.font = 'bold 65px "Be Vietnam Pro"'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#ffffff'

  // Text wrapping
  const words = text.split(' ')
  let line = ''
  const lines: string[] = []
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
    // loadImage is guaranteed to be defined here because of the check above
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