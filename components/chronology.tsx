import { displayYears } from "@/lib/display-years";
import Link from "next/link";

type Entry = { title: string; dates: string; description: string; role?: string; href?: string };

export function Chronology({ entries }: { entries: Entry[] }) {
  const years = [...new Set(entries.map((entry) => entry.dates.match(/\b20\d{2}\b/)?.[0] ?? "Ongoing"))].sort((a, b) => b.localeCompare(a));
  return <div className="chronology">{years.map((year) => <section className="chronology-year" key={year}>
    <h2>{year}</h2>
    <div className="chronology-track">{entries.filter((entry) => (entry.dates.match(/\b20\d{2}\b/)?.[0] ?? "Ongoing") === year).map((entry) => <article key={entry.title} className="chronology-entry">
      <p className="chronology-date">{displayYears(entry.dates)}</p>
      <h3>{entry.href ? <Link href={entry.href}>{entry.title} <span aria-hidden="true">&rarr;</span></Link> : entry.title}</h3>
      {entry.role && <p className="chronology-role">{entry.role}</p>}
      <details><summary>Read more</summary><p>{entry.description}</p><div className="timeline-artifact">An event photograph, poster, or project artifact</div></details>
    </article>)}</div>
  </section>)}</div>;
}
