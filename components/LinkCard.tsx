"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface LinkCardProps {
  href: string
  title: string
  isExternal?: boolean
}

export function LinkCard({ href, title, isExternal = true }: LinkCardProps) {
  return (
    <Link 
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block p-4 my-4 border rounded-lg hover:border-primary transition-colors no-underline"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{title}</span>
        {isExternal && <ExternalLink className="h-4 w-4" />}
      </div>
    </Link>
  )
} 