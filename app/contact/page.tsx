import type { Metadata } from "next";
import Image from "next/image";
import { SectionWrapper } from "@/components/section-wrapper";

export const metadata: Metadata = {
  title: "Contact",
};

const contactLinks = [
  {
    label: "Email",
    value: "ezraweng21@gmail.com",
    href: "mailto:ezraweng21@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "ezra-weng-927133310",
    href: "https://www.linkedin.com/in/ezra-weng-927133310",
  },
  {
    label: "GitHub",
    value: "ezraweng21",
    href: "https://github.com/ezraweng21",
  },
  {
    label: "Instagram",
    value: "@ezraweng21",
    href: "https://www.instagram.com/ezraweng21/",
  },
  {
    label: "iNaturalist",
    value: "ezraweng21",
    href: "https://www.inaturalist.org/people/ezraweng21",
  },
];

export default function ContactPage() {
  return (
    <SectionWrapper title="Contact" description="Email is the simplest way to reach me. You can also find me on these profiles.">
      <div className="contact-list">{contactLinks.map(item => {
        const icon = item.label === "Email" ? "gmail.svg" : item.label === "iNaturalist" ? "inaturalist.ico" : item.label.toLowerCase() + ".svg";
        return <a key={item.label} className="contact-row" href={item.href} rel={item.label === "Email" ? undefined : "me"}>
          <span className="contact-service"><Image unoptimized src={`/contact-icons/${icon}`} alt="" width={22} height={22} />{item.label}</span>
          <strong>{item.value}</strong><span aria-hidden="true">&nearr;</span>
        </a>;
      })}</div>
    </SectionWrapper>
  );
}
