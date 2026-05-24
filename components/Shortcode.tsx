export function Shortcode({ code }: { code: string }) {
  return (
    <span className="not-prose inline-flex items-center gap-2 border border-foreground px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-bold align-middle">
      <span className="opacity-60">Shortcode</span>
      <span className="bg-foreground text-background px-2 py-0.5">
        {code.replace(/['"]/g, '')}
      </span>
    </span>
  )
}
