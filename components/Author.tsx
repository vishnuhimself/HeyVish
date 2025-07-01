import Image from "next/image"
import Link from "next/link"

export function Author() {
  return (
    <div className="flex items-center gap-3 mt-6 mb-8">
      <Image
        src="/Srivishnu-Ramakrishnan-Author.png"
        alt="Srivishnu Ramakrishnan"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="font-medium">Srivishnu Ramakrishnan</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Engineer & Web Creator</div>
          <div className="flex items-center gap-2">
            <Link 
              href="https://twitter.com/vishhimself"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image 
                src="/x.svg"
                alt="Twitter"
                width={16}
                height={16}
                className="dark:invert"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 