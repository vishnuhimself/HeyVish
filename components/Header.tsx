"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"

const NAV = [
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-base font-semibold text-foreground hover:opacity-60 transition-opacity tracking-tight"
        >
          Vish
        </Link>

        <nav className="flex items-center gap-0.5">
          {NAV.map((item) => {
            const active =
              item.href === "/blog"
                ? pathname.startsWith("/blog")
                : pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="ml-1">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
