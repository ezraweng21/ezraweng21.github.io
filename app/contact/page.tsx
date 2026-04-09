import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

const contactLinks = [
  {
    label: "Email",
    value: "ezraweng21@gmail.com",
    href: "mailto:ezraweng21@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/ezraweng21",
    href: "https://github.com/ezraweng21",
  },
  { label: "Resume", value: "Resume placeholder", href: "#" },
];

export default function ContactPage() {
  return (
    <SectionWrapper
      eyebrow="Contact"
      title="Contact and links."
      description="A short page for the main ways to reach me or find the code behind the work."
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
              <p className="mt-2 text-sm font-semibold text-ink sm:text-base">
                {link.value}
              </p>
            </div>
            <span className="page-meta text-[#8f5b39]">
              Open
            </span>
          </Link>
        ))}
      </div>

      <div className="page-rule mt-10">
        <p className="page-copy">
          LinkedIn and a resume PDF can be added here later once those links are
          ready. For now, email and GitHub are the most useful places to start.
        </p>
      </div>
    </SectionWrapper>
  );
}
