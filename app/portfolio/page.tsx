import { displayYears } from "@/lib/display-years";
import type { Metadata } from "next";
import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Selected Portfolio",
  description:
    "A concise selection of research, technical, community, and personal projects by Ezra Weng.",
};

export default function PortfolioPage() {
  return (
    <SectionWrapper
      title="Selected work"
      description="A concise selection of research, technical, community, and personal work."
    >
      <ol className="portfolio-sequence">
        {portfolioItems.map((item) => (
          <li key={item.title} className="portfolio-entry">
            <Link href={item.href} className="portfolio-entry-link">
              <div
                className={`portfolio-artifact portfolio-artifact-${item.theme}`}
                aria-hidden="true"
              >
                <span className="portfolio-artifact-mat" />
              </div>

              <div className="portfolio-entry-copy">
                <p className="portfolio-entry-meta">
                  {item.category} / {displayYears(item.timeframe)}
                </p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <dl className="portfolio-entry-facts">
                  <div>
                    <dt>Role</dt>
                    <dd>{item.role}</dd>
                  </div>
                </dl>
                <span className="portfolio-entry-action">
                  Open project <span aria-hidden="true">-&gt;</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
