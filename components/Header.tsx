"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"

const Header = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col sm:flex-row items-center justify-between min-h-16 py-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Link href="/" className="text-2xl font-bold">
              Srivishnu Ramakrishnan
            </Link>
            
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/blog" className="hover:text-primary text-base">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary text-base">
              Contact
            </Link>
            <Link 
              href="https://www.linkedin.com/in/srivishnu-ramakrishnan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-5 h-5"
            >
              <Image
                src="/linked-in.svg"
                alt="LinkedIn"
                fill
                className="object-contain dark:invert hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link 
              href="https://twitter.com/vishhimself" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-6 h-6"
            >
              <Image
                src="/twitter-square.svg"
                alt="Twitter"
                fill
                className="object-contain dark:invert hover:opacity-80 transition-opacity"
              />
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header 