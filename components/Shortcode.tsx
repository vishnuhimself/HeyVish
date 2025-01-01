export function Shortcode({ code }: { code: string }) {
  return (
    <div className="my-4 inline-flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
      <span className="font-medium">Shortcode:</span>
      <span className="font-mono bg-secondary px-2 py-0.5 rounded text-secondary-foreground">
        {code.replace(/['"]/g, '')}
      </span>
    </div>
  )
} 