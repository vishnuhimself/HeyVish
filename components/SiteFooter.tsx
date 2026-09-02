export function SiteFooter({ className = "" }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer ${className}`.trim()}>
      <div className="site-footer-inner">
        <span>© {year} Vish</span>
        <div>
          <a href="https://x.com/VishHimself" target="_blank" rel="noreferrer">X</a>
          <a href="mailto:hey@heyvish.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
