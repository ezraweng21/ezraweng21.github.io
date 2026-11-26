import { displayYears, earliestFirst } from "@/lib/display-years";
import { ListPicture } from "@/components/list-picture";
import { DescriptionBullets } from "@/components/description-bullets";
import { profile } from "@/data/profile";
import { getProjectBySlug } from "@/data/projects";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return <div className="folio experience-list">
    <h1>Experience</h1>
    {earliestFirst(profile.experience, e => e.period).map(entry => <article className="dated-entry" key={entry.id}>
      <ListPicture src={entry.image} alt={entry.imageAlt} />
      <div>
        <small>{displayYears(entry.period)}</small><h2>{entry.role}</h2><small>{entry.organization}</small>
        <DescriptionBullets text={entry.description} />
      </div>
    </article>)}
    <section id="school" className="folio-section">
      <h2>School involvement</h2>
      <article className="dated-entry">
        <ListPicture alt="" />
        <div>
          <h3>William P. Clements High School</h3>
          <small>Sugar Land, TX · Class of 2027</small>
          <p><strong>GPA:</strong> 4.0/4.0 unweighted · 4.71 weighted</p>
          <p><strong>Activities and societies</strong></p>
          <ul className="school-activities">
            {profile.schoolExperience.map(entry => {
              const links = getProjectBySlug(entry.projectSlug)?.links;
              const website = links?.find(link => link.label === "Live");
              const repo = links?.find(link => link.label === "Repo");
              const name = entry.organization.replace(/^Clements /, "");
              return <li key={entry.id} id={entry.projectSlug || "mu-alpha-theta"}>
                {website ? <a href={website.href}>{name}</a> : name}{entry.role && ` (${entry.role})`}
                {repo && <> · <a aria-label={name + " source code"} href={repo.href}>Source code</a></>}
              </li>;
            })}
            <li>Science Olympiad (Veteran Member)</li>
            <li>Computer Science National Honor Society (Vice President)</li>
          </ul>
        </div>
      </article>
    </section>
    <section id="honors" className="folio-section">
      <h2>Selected honors</h2>
      <ul className="honors-list">
        {earliestFirst(profile.honors, honor => honor).map(honor => <li key={honor}>{honor}</li>)}
      </ul>
    </section>
  </div>;
}
