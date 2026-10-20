import Link from "next/link"

export function Author() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
      <span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-.04em" }}>V</span>
      <div style={{ display: "grid", gap: "0.15rem", minWidth: 0 }}>
        <span style={{ fontSize: ".9375rem", fontWeight: 500, letterSpacing: "-.01em" }}>Srivishnu Ramakrishnan</span>
        <span style={{ fontSize: ".8125rem", color: "var(--ink-2)", display: "flex", gap: ".6rem", alignItems: "center" }}>
          <span>Independent iOS developer</span>
          <i aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-3)" }} />
          <Link href="https://x.com/VishHimself" target="_blank" rel="noopener noreferrer" className="u-link u-link--draw">@VishHimself</Link>
        </span>
      </div>
    </div>
  )
}
