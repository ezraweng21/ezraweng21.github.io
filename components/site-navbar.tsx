import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-content px-4 pt-4 sm:px-6 lg:px-8">
        <div className="panel flex w-full flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              E
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine">
                Ezra
              </p>
              <p className="text-sm text-ink/70">Builder, engineer, teammate.</p>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-2 text-sm font-medium text-ink/75">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 hover:bg-ink hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
