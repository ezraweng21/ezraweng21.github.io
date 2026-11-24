import { displayYears } from "@/lib/display-years";
import { ListPicture } from "@/components/list-picture";
import { publicProjects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata = { title: "Projects & Research" };

const linkLabels: Record<string, string> = { Repo: "Source code", Live: "Live site" };

export default function ProjectsPage() {
  return <div className="folio project-register">
    <h1>Projects &amp; Research</h1>
      <div className="experience-list work-index">
        {publicProjects.filter(p => !profile.schoolExperience.some(entry => entry.projectSlug === p.slug)).map(p => <article className="dated-entry" id={p.slug} key={p.slug}>
          <ListPicture src={p.media.src} alt={p.media.alt} />
          <div>
            <header className="project-line"><h2>{p.title}</h2><small>{displayYears(p.timeframe)}</small></header>
            {p.links?.length ? <div className="work-links">{p.links.map(link =>
              <a key={link.href} href={link.href}>{linkLabels[link.label] ?? link.label}</a>
            )}</div> : null}
          </div>
        </article>)}
      </div>
  </div>;
}
