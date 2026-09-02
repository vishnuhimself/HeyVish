import Link from "next/link";

export const metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[55svh] flex flex-col justify-center">
      <h1 className="text-3xl font-normal tracking-[-0.035em] mb-6">Page not found</h1>
          <p className="text-base leading-relaxed max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try the homepage or browse the blog index.
          </p>
          <div className="flex flex-wrap gap-5 mt-8 text-sm underline decoration-border underline-offset-4">
          <Link
            href="/"
            className=""
          >
            Back home
          </Link>
          <Link
            href="/blog"
            className=""
          >
            Browse notes →
          </Link>
          </div>
    </div>
  );
}
