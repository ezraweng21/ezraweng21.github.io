import { displayYears } from "@/lib/display-years";
import { ListPicture } from "@/components/list-picture";
import { publicProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { researchOutputs } from "@/data/research-outputs";

export const metadata = { title: "Projects & Research" };

const linkLabels: Record<string, string> = { Repo: "Source code", Live: "Live site" };

export default function ProjectsPage() {
  const listed = publicProjects.filter(p => !profile.schoolExperience.some(entry => entry.projectSlug === p.slug));
  const sections = [
    { id: "research-and-applied-work", heading: "Research & applied work", entries: listed.filter(p => p.group !== "Personal projects") },
    { id: "personal-projects", heading: "Personal projects", entries: listed.filter(p => p.group === "Personal projects") },
  ];
  return <div className="folio project-register">
    <h1>Projects &amp; Research</h1>
    <section id="research-outputs" className="project-section" aria-labelledby="outputs-title">
      <h2 id="outputs-title">Research outputs</h2>
      {researchOutputs.map(group => <div className="output-group" key={group.heading}>
        <h3>{group.heading}</h3>
        <ul>{group.entries.map(entry => <li key={entry.work}><strong>{entry.work}:</strong> {entry.detail}</li>)}</ul>
      </div>)}
    </section>
    {sections.filter(section => section.entries.length).map(({ id, heading, entries }) => (
      <section key={id} id={id} aria-labelledby={id + "-heading"} className="project-section">
      <h2 id={id + "-heading"}>{heading}</h2>
      <div className="experience-list work-index">
        {entries.map(p => <article className="dated-entry" id={p.slug} key={p.slug}>
          <ListPicture src={p.media.src} alt={p.media.alt} />
          <div>
            <header className="project-line"><h3>{p.title}</h3><small>{displayYears(p.timeframe)}</small></header>
            <p>{p.shortSummary}{p.outcome && ` ${p.outcome}`}</p>
            {p.links?.length ? <div className="work-links">{p.links.map(link =>
              <a key={link.href} href={link.href}>{linkLabels[link.label] ?? link.label}</a>
            )}</div> : null}
          </div>
        </article>)}
      </div>
      </section>
    ))}
  </div>;
}
