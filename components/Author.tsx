import Image from "next/image"
import Link from "next/link"

export function Author() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-9 h-9 border border-foreground overflow-hidden shrink-0">
        <Image
          src="/Srivishnu-Ramakrishnan-Author.png"
          alt="Srivishnu Ramakrishnan"
          fill
          className="object-cover grayscale"
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="text-[11px] uppercase tracking-[0.2em] font-bold truncate">
          Srivishnu Ramakrishnan
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Indie iOS Developer</span>
          <Link
            href="https://x.com/VishHimself"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors font-bold"
          >
            @VishHimself ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
