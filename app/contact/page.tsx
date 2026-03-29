import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

const contactLinks = [
  { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", value: "github.com/ezra", href: "https://github.com/ezra" },
  { label: "Resume", value: "Resume link placeholder", href: "#" },
];

export default function ContactPage() {
  return (
    <SectionWrapper
      eyebrow="Contact"
      title="Open the door for opportunities and conversation."
      description="This page is intentionally direct: clear ways to reach out now, with room to add form handling or richer contact flows later."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {contactLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-[24px] border border-ink/10 bg-white/80 p-6 hover:border-clay/40 hover:bg-white"
          >
            <p className="eyebrow">{link.label}</p>
            <p className="mt-4 text-lg font-semibold text-ink">{link.value}</p>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
