import Link from "next/link";

export const metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-foreground">
        <div className="flex items-stretch border-b border-foreground">
          <div className="px-4 py-2 border-r border-foreground text-[10px] uppercase tracking-[0.3em] font-bold">
            [ Error / 404 ]
          </div>
          <div className="ml-auto px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Page not found
          </div>
        </div>
        <div className="p-8 sm:p-12">
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-tight leading-none">
            404
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/80 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try the homepage or browse the blog index.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-foreground">
          <Link
            href="/"
            className="px-5 sm:px-6 py-4 border-b sm:border-b-0 sm:border-r border-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors flex items-center justify-between"
          >
            ← Back home
            <span>HEYVISH</span>
          </Link>
          <Link
            href="/blog"
            className="px-5 sm:px-6 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-colors flex items-center justify-between"
          >
            Browse blog
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
