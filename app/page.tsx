import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { format, parseISO } from "date-fns";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 py-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">Hello, I&apos;m Srivishnu Ramakrishnan</h1>
          <p className="text-lg text-muted-foreground">
          Engineer by profession, web creator by passion. Sharing insights on scripting, data engineering, web development, and building impactful websites. 
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="#about">About Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="outline" asChild className="inline-flex items-center gap-2">
              <Link href="/blog">
                Read Blog <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <Image
            src="/Srivishnu-Ramakrishnan.jpg"
            alt="Srivishnu Ramakrishnan"
            fill
            className="rounded-sm object-cover"
            priority
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 border-t">
        <h2 className="text-2xl font-bold mb-6">I love building with</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/next-js.svg"
                  alt="Next.js Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">Next.js</span>
            </div>
          </div>
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/wordpress-logo.svg"
                  alt="WordPress Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">WordPress</span>
            </div>
          </div>
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/informatica.svg"
                  alt="Informatica Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">Informatica PowerCenter</span>
            </div>
          </div>
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/sql.svg"
                  alt="SQL Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">SQL</span>
            </div>
          </div>
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/python.svg"
                  alt="Python Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">Python</span>
            </div>
          </div>
          <div className="group border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/shell.svg"
                  alt="Shell Scripting Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-lg font-semibold">Shell Scripting</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-12 border-t" id="about">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>
        <div className="space-y-8">
          <p className="text-lg text-muted-foreground">
            I&apos;m a computer science graduate working as a data engineer in an MNC. Beyond the day job, 
            I&apos;m deeply passionate about blogging and web development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-6 border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <h3 className="text-lg font-semibold">pSEO</h3>
              </div>
              <p className="text-muted-foreground">
                I love building programmatic SEO websites that provide useful content to the audience at scale.
              </p>
            </div>

            <div className="space-y-4 p-6 border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-semibold">Serial Website Builder</h3>
              </div>
              <p className="text-muted-foreground">
                Managing 10+ websites focused on evergreen content and pSEO. 
                Powered by Next.js and WordPress.
              </p>
            </div>

            <div className="space-y-4 p-6 border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <h3 className="text-lg font-semibold">Domain Collector</h3>
              </div>
              <p className="text-muted-foreground">
                I purchase domains for fun. At this point, it&apos;s more than a hobby 
                – it&apos;s a delightful addiction.
              </p>
            </div>

            <div className="space-y-4 p-6 border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <h3 className="text-lg font-semibold">Let&apos;s Connect</h3>
              </div>
              <p className="text-muted-foreground">
                Need help with blog content or website design? Feel free to reach out 
                – I&apos;m always happy to help!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12 border-t">
          <h2 className="text-2xl font-bold mb-6">Recent Scribbles ✍️</h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.date} suppressHydrationWarning>
                        {format(parseISO(post.date), "MMMM d, yyyy")}
                      </time>
                      {post.category && (
                        <>
                          <span>•</span>
                          <span>{Array.isArray(post.category) ? post.category[0] : post.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
