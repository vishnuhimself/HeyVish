import Link from "next/link";

export const metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto min-h-[65svh] flex flex-col justify-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-7">Error 404 · Page not found</p>
      <div className="grid md:grid-cols-[1fr_0.55fr] gap-10 md:gap-24 items-end">
        <h1 className="font-display text-[clamp(6rem,18vw,14rem)] font-light tracking-[-0.09em] leading-[0.7]">404.</h1>
        <div className="md:pb-2">
          <p className="text-base leading-relaxed text-muted-foreground max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try the homepage or browse the blog index.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
          <Link
            href="/"
            className="rounded-full bg-foreground text-background px-5 py-3 text-xs font-semibold"
          >
            Back home
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-border px-5 py-3 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            Browse notes →
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
