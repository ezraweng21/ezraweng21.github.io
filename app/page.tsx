import Link from "next/link";

import { MediaSlot } from "@/components/media-slot";

const highlights = [
  {
    title: "Highlight 01",
    text: "Add one short featured area here.",
  },
  {
    title: "Highlight 02",
    text: "Add one short featured area here.",
  },
  {
    title: "Highlight 03",
    text: "Add one short featured area here.",
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
      <section className="home-hero">
        <div className="home-hero-grid">
          <div>
            <p className="eyebrow">Home</p>
            <h1 className="mt-3 max-w-[12ch] text-4xl leading-[1.04] text-ink sm:text-[2.85rem] lg:text-[3.2rem]">
              Ezra Weng.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/72">
              Add a short homepage intro here. Keep it brief and personal.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="home-primary-link">
                Start here
              </Link>
              <Link href="/projects" className="home-secondary-link">
                See projects
              </Link>
              <Link href="/contact" className="home-secondary-link">
                Say hello
              </Link>
            </div>
          </div>

          <div className="home-image-block">
            <MediaSlot
              alt="Homepage portrait or field photo"
              label="Photo / headshot"
              hint="Add a portrait, field photo, or quieter personal image once you decide what you want the homepage to lead with."
              ratio="portrait"
            />
            <p className="mt-3 text-sm leading-6 text-ink/70">
              The homepage stays simple. The deeper pages hold the project
              notes, activity context, and technical details.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light">
        <div className="home-two-column">
          <div>
            <p className="eyebrow">Short Intro</p>
            <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
              Add a slightly longer intro here.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              Use this section for a few lines on what kinds of work you do and
              how the site is organized.
            </p>
          </div>

          <div>
            <p className="eyebrow">Quick Navigation</p>
            <div className="home-link-list mt-4">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="home-link-row">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/70">{item.blurb}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-ember">View</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section-warm">
        <div className="home-section-header-row">
          <div>
            <p className="eyebrow">Featured Highlights</p>
            <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
              Add a short section heading here.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              Use this area for a few featured themes, projects, or directions.
            </p>
          </div>
          <Link href="/projects" className="home-inline-link">
            Go to projects
          </Link>
        </div>

        <div className="home-grid home-grid-3 mt-5">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="home-simple-card interactive-lift">
              <h3 className="text-base text-ink">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{highlight.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
