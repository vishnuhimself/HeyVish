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
      className="group not-prose flex items-center justify-between gap-4 border border-foreground p-4 my-6 no-underline hover:bg-foreground hover:text-background transition-colors"
    >
      <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
        {title}
      </span>
      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100">
        {isExternal && <ExternalLink className="h-3 w-3" strokeWidth={2.5} />}
        →
      </span>
    </Link>
  )
}
