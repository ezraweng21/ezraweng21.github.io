import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© 2026 Ezra Weng</p>
        <div className="site-footer-links">
          <Link href="/design-browser">Design browser</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
