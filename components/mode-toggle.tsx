"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light"
  const isDark = current === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center w-full h-full px-4 py-3 hover:bg-foreground hover:text-background transition-colors ${className}`}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" strokeWidth={2.25} />
      ) : (
        <Moon className="h-3.5 w-3.5" strokeWidth={2.25} />
      )}
    </button>
  )
}
