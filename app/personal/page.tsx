import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata = { title: "Interests" };

export default function PersonalPage() {
  return <div className="folio"><h1>Interests</h1>
    <section className="folio-section"><h2>Photography</h2>
      <Link className="ink-link" href="/photography">Browse photo collections &rarr;</Link>
    </section>
    <section className="folio-section"><h2>Other hobbies</h2>
      {profile.hobbies.map(hobby => <article className="interest-note" key={hobby.title}><h3>{hobby.title}</h3><p>{hobby.description}</p></article>)}
    </section>
    {profile.tangent.title && <section className="folio-section"><h2>Tangents</h2>
      <article className="interest-note"><h3>{profile.tangent.title}</h3><p>{profile.tangent.note}</p></article>
    </section>}
  </div>;
}
