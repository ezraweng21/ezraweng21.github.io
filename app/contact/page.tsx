import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

const contactLinks = [
  { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", value: "github.com/ezraweng21", href: "https://github.com/ezraweng21" },
  { label: "Resume", value: "Resume link placeholder", href: "#" },
];

export default function ContactPage() {
  return (
    <SectionWrapper
      eyebrow="Contact"
      title="A simple place to reach out."
      description="This page should stay direct and easy to use. It does not need much, just a clean way to contact you and find the most important links."
    >
      <div className="page-list">
        {contactLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="page-list-item flex items-start justify-between gap-4 hover:text-[#b85f2c]"
          >
            <div>
              <p className="eyebrow">{link.label}</p>
              <p className="mt-2 text-sm font-semibold text-ink sm:text-base">{link.value}</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f5b39]">
              Open
            </span>
          </Link>
        ))}
      </div>

      <div className="page-rule mt-10">
        <p className="page-copy">
          If a form or a more specific contact flow makes sense later, it can be
          added without changing the overall tone of this page.
        </p>
      </div>
    </SectionWrapper>
  );
}
