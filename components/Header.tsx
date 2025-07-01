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
              vish
            </Link>
            
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/blog" className="hover:text-primary text-base">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary text-base">
              Contact
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header 