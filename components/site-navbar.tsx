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
    <header className="border-b border-[#d5b59b] bg-[#eee0d2] text-[#5f4230]">
      <div className="mx-auto flex max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9956f] text-sm font-medium italic text-[#a55e31]">
              e
            </span>
            <p className="brand-wordmark text-[1.1rem] text-[#6d4530]">Ezra Weng</p>
          </Link>

          <nav className="flex flex-wrap gap-1 text-xs font-medium uppercase tracking-[0.16em] text-[#6d4530]/82">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 hover:text-[#a55e31]"
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
