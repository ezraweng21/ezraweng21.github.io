import Link from "next/link";

const highlights = [
  {
    title: "Computational biology",
    text: "Wastewater and genomic surveillance work focused on viral abundance, genotype dynamics, and public-health signal.",
  },
  {
    title: "Dashboards and data systems",
    text: "Projects that move from messy datasets into cleaned workflows, visual interfaces, and interpretable outputs.",
  },
  {
    title: "Clubs and competitions",
    text: "Teaching, organizing, contest infrastructure, and leadership work across biology, computer science, and math.",
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
              Biology, code, and the systems in between.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/72">
              I am Ezra Weng, a student building dashboards, data pipelines,
              and websites around biology, public health, competitions, and
              student organizations.
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
                <p className="text-lg text-ink">Photo placeholder</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-ink/70">
                  A portrait, field photo, or quieter personal visual can live
                  here once the rest of the content settles.
                </p>
              </div>
            </div>
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
              Technical work with biological context.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              A lot of my work starts with messy systems: wastewater sequencing
              data, city operations datasets, club logistics, or competition
              infrastructure. I like turning those into something structured
              enough to inspect, use, and improve.
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
              A small map of the work so far.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
              The project pages go deeper, but the common thread is systems:
              biological data, civic data, student organizations, and tools
              that make complicated work easier to navigate.
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
