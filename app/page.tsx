import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

const highlights = [
  {
    title: "Technical work",
    text: "Placeholder for featured builds, engineering systems, and the kind of project execution that deserves its own deeper page.",
  },
  {
    title: "Personal identity",
    text: "Placeholder for the parts of the story that make the work feel grounded, human, and recognizably yours.",
  },
  {
    title: "Activities and leadership",
    text: "Placeholder for competitions, mentoring, service, and the work that happens beyond a polished project card.",
  },
];

const quickLinks = [
  { href: "/about", label: "About", blurb: "Story, interests, and timeline." },
  { href: "/projects", label: "Projects", blurb: "Technical work and case studies." },
  { href: "/activities", label: "Activities", blurb: "Leadership, competitions, and service." },
  { href: "/contact", label: "Contact", blurb: "Ways to reach out and connect." },
];

export default function HomePage() {
  return (
    <>
      <section className="panel relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(31,77,63,0.14),transparent_60%)]" />
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-center">
          <div className="relative max-w-3xl">
            <p className="eyebrow mb-4">Home</p>
            <h1 className="max-w-4xl text-5xl leading-[1.02] text-ink sm:text-6xl xl:text-7xl">
              A personal front page with room for serious technical work behind it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
              Short intro placeholder: this homepage is meant to feel calm,
              deliberate, and human first, while still pointing clearly toward
              projects, engineering work, and everything else that matters.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="interactive-lift rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="interactive-lift rounded-full border border-ink/10 bg-white/80 px-5 py-3 text-sm font-semibold text-ink hover:border-ink/20 hover:bg-white"
              >
                About Ezra
              </Link>
              <Link
                href="/contact"
                className="interactive-lift rounded-full border border-clay/25 bg-clay/10 px-5 py-3 text-sm font-semibold text-ink hover:border-clay/40 hover:bg-clay/15"
              >
                Get In Touch
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pine/80">
                  Identity
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Strong first impression before the deeper work pages.
                </p>
              </div>
              <div className="rounded-[22px] border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pine/80">
                  Projects
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Dedicated space for technical work, systems, and builds.
                </p>
              </div>
              <div className="rounded-[22px] border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pine/80">
                  Growth
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Room to layer in content, polish, and subtle motion over time.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-20 w-20 rounded-full border border-clay/25 bg-clay/10 blur-[2px] lg:block" />
            <div className="panel bg-gradient-to-br from-white to-sand/50 p-5">
              <div className="flex h-full min-h-[30rem] flex-col justify-between rounded-[24px] border border-ink/10 bg-[linear-gradient(180deg,rgba(31,77,63,0.14),rgba(255,255,255,0.92))] p-6">
                <div className="flex items-center justify-between text-sm text-ink/65">
                  <span>Photo / image</span>
                  <span>Homepage placeholder</span>
                </div>
                <div className="mt-6 flex-1 rounded-[26px] border border-dashed border-ink/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.15))] p-4">
                  <div className="flex h-full min-h-72 items-end rounded-[20px] border border-white/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),rgba(255,255,255,0.08))] p-5">
                    <div className="max-w-xs">
                      <p className="text-lg font-semibold text-ink">
                        Image placeholder
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink/70">
                        Reserve this area for a portrait, environmental photo, or
                        custom visual treatment once the content layer is ready.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-[20px] border border-white/70 bg-white/75 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pine/80">
                    Intro note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    Keep this side grounded and personal so the homepage feels
                    like a real introduction instead of a compressed resume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        eyebrow="Intro"
        title="A short introduction that can sit between presence and proof."
        description="This first pass keeps the copy intentionally light. It creates a clear place for a short personal summary without trying to solve the whole story on the homepage."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[24px] border border-ink/10 bg-white/80 p-6">
            <p className="eyebrow">Short Intro</p>
            <h3 className="mt-3 text-2xl text-ink">
              Placeholder for a concise personal and professional snapshot.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
              A few lines can eventually explain who you are, what kind of work
              you care about, and why the projects on the next pages matter.
            </p>
          </article>

          <article className="rounded-[24px] border border-ink/10 bg-mist/85 p-6">
            <p className="eyebrow">Direction</p>
            <p className="text-base leading-7 text-ink/72">
              The visual treatment stays polished and modern, but quiet enough
              that future content, photography, and case-study links can carry
              more of the personality.
            </p>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Highlights"
        title="Featured highlights section placeholder."
        description="These cards establish the homepage rhythm and create obvious anchor points for future featured content without overbuilding the first version."
      >
        <div className="section-grid">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="interactive-lift rounded-[24px] border border-ink/10 bg-mist/70 p-6"
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
        title="CTA paths to the rest of the site."
        description="The homepage stays focused on identity and overview, while these links move visitors into the deeper pages when they are ready."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="interactive-lift rounded-[22px] border border-ink/10 bg-white/75 p-5 text-ink hover:border-clay/40 hover:bg-white"
            >
              <p className="text-base font-semibold">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
