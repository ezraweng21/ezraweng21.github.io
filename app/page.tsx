import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

const highlights = [
  {
    title: "Technical range",
    text: "A place to showcase software projects, systems thinking, and the work behind the screens.",
  },
  {
    title: "Personal identity",
    text: "The homepage leads with presence first so the site feels like a person, not a project dump.",
  },
  {
    title: "Built for layers",
    text: "This first version establishes clean structure, reusable components, and room for richer polish later.",
  },
];

const quickLinks = [
  { href: "/about", label: "Read the story" },
  { href: "/projects", label: "See the work" },
  { href: "/activities", label: "Explore activities" },
  { href: "/contact", label: "Start a conversation" },
];

export default function HomePage() {
  return (
    <>
      <section className="panel overflow-hidden px-6 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Home</p>
            <h1 className="text-5xl leading-tight text-ink sm:text-6xl">
              Engineer, builder, and collaborator shaping thoughtful digital work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
              This site is the front door for both identity and execution: a calm
              visual presence up front, with dedicated spaces for projects,
              activities, and technical work behind it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-ink/10 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:border-ink/20 hover:bg-white"
              >
                About Ezra
              </Link>
            </div>
          </div>

          <div className="panel bg-gradient-to-br from-white to-sand/40 p-5">
            <div className="flex h-full min-h-80 flex-col justify-between rounded-[22px] border border-ink/10 bg-[linear-gradient(180deg,rgba(31,77,63,0.12),rgba(255,255,255,0.88))] p-6">
              <div className="flex items-center justify-between text-sm text-ink/65">
                <span>Photo area</span>
                <span>V1 placeholder</span>
              </div>
              <div>
                <div className="mb-4 h-40 rounded-[22px] border border-dashed border-ink/20 bg-white/50" />
                <p className="text-xl font-semibold text-ink">Identity-first hero</p>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  A portrait or custom visual can land here later without changing
                  the page structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        eyebrow="Highlights"
        title="A homepage that introduces the person before the portfolio."
        description="These placeholders map directly to the content plan while keeping the presentation polished, lightweight, and easy to build on."
      >
        <div className="section-grid">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[24px] border border-ink/10 bg-mist/70 p-6"
            >
              <h3 className="text-2xl text-ink">{highlight.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/70">
                {highlight.text}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Navigation"
        title="Quick paths into the rest of the site."
        description="Projects and work live on dedicated pages, while this front page stays focused on first impression and orientation."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[22px] border border-ink/10 bg-white/75 p-5 text-base font-medium text-ink hover:border-clay/40 hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
