"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  ["About", "/"],
  ["Experience", "/experience"],
  ["Projects & Research", "/projects"],
  ["Interests", "/personal"],
  ["Notes", "/notes"],
  ["Contact", "/contact"],
] as const;

export function SiteNavbar() {
  const path = usePathname();
  return (
    <header className="folio-nav">
      <Link className="signature" href="/" aria-label="Ezra Weng, home">Ezra Weng</Link>
      <nav aria-label="Main navigation">
        {sections.map(([label, href]) => (
          <Link key={href} href={href} aria-current={path === href ? "page" : path.startsWith(href + "/") || (href === "/personal" && (path.startsWith("/photography") || path === "/cooking")) ? "location" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
