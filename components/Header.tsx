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
    <header className="border-b border-foreground sticky top-0 z-50 bg-background">
      <div className="mx-auto max-w-6xl flex items-stretch">
        <Link
          href="/"
          className="flex items-center px-4 sm:px-6 py-3 border-r border-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors"
        >
          ← HEYVISH
        </Link>

        <div className="hidden sm:flex items-center px-4 py-3 border-r border-foreground text-[11px] uppercase tracking-[0.2em] text-muted-foreground flex-1 truncate">
          Srivishnu Ramakrishnan
        </div>

        <nav className="flex items-stretch ml-auto">
          {NAV.map((item) => {
            const active =
              item.href === "/blog"
                ? pathname.startsWith("/blog")
                : pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 border-l border-foreground text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground hover:text-background"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex items-stretch border-l border-foreground">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
