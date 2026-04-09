import Link from "next/link";

const highlights = [
  {
    title: "Technical work",
    text: "Placeholder for featured engineering builds, systems work, and projects that deserve their own deeper pages later.",
  },
  {
    title: "Personal context",
    text: "Placeholder for the story, themes, and perspective that make the technical work feel grounded and recognizably yours.",
  },
  {
    title: "Activities and leadership",
    text: "Placeholder for leadership, competitions, mentoring, and contributions that sit outside a standard project list.",
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
              A softer front door for the work and the person behind it.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/72">
              Short intro placeholder: this homepage should feel warm, personal,
              and easy to step into, then naturally lead people toward projects,
              activities, and the rest of the site without trying too hard.
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
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink/55">
              <span>Photo / headshot</span>
              <span>Placeholder</span>
            </div>
            <div className="home-image-frame">
              <div>
                <p className="text-lg text-ink">Image placeholder</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-ink/70">
                  A portrait, candid photo, or custom visual can live here once
                  the first content pass feels right.
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Keep this front page open and welcoming. Let the deeper pages hold
              more of the dense technical detail.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light">
        <div className="home-two-column">
          <div>
            <p className="eyebrow">Short Intro</p>
            <h2 className="mt-2 text-2xl text-ink sm:text-[2rem]">
              A little more personality before the heavier work pages.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              This section can eventually explain how you think, what you care
              about, and how the site is organized without sounding stiff or
              reading like a compressed resume.
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
              A homepage that introduces the person before the portfolio.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              These placeholders keep the structure clear while making room for
              stronger stories, featured work, and a little more personality.
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
