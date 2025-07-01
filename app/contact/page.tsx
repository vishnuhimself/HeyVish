import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { generateMetadata as genMeta } from "@/lib/metadata"

export const metadata = genMeta({
  title: "Contact",
  description: "Get in touch with me through Twitter or Email. I&apos;m always happy to connect and help!",
  path: "/contact",
})

const contactMethods = [
  {
    name: "Twitter",
    description: "Follow me for updates",
    icon: Twitter,
    href: "https://twitter.com/vishhimself",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Email",
    description: "Drop me a line",
    icon: Mail,
    href: "mailto:hey@heyvish.com",
    color: "bg-primary/10 text-primary",
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4 text-center mb-12">

        <h1 className="text-4xl font-bold">say hi</h1>
        
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {contactMethods.map((method) => {
          const Icon = method.icon
          return (
            <Link
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative p-8 h-full rounded-lg border bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className={`inline-flex p-3 rounded-lg ${method.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{method.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <div className={`p-2 rounded-full ${method.color}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Image
            src="/Srivishnu-Ramakrishnan-Author.png"
            alt="Srivishnu Ramakrishnan"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>Usually responds within 24 hours</span>
        </div>
      </div>
    </div>
  )
} 