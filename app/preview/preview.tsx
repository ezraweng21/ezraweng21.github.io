import Image from "next/image";
import Link from "next/link";
import { personalPhotos } from "@/data/personal";
import { PortraitFrame } from "@/components/portrait-frame";

export function Preview() {
  return (
    <div className="simple-preview">
      <div className="preview-comparison"><span>Homepage preview</span><Link href="/">View current homepage</Link></div>
      <section className="preview-introduction" aria-labelledby="preview-name">
        <div>
          <h1 id="preview-name">Hi, I&apos;m Ezra<span>.</span></h1>
          <p className="preview-intro-placeholder">Your introduction goes here. Write a few sentences about yourself and what you enjoy.</p>
          <Link className="preview-text-link" href="/about">More about me <span aria-hidden="true">&rarr;</span></Link>
        </div>
        <PortraitFrame />
      </section>
      <section className="preview-section" aria-labelledby="preview-photos">
        <div className="preview-section-heading"><h2 id="preview-photos">Photography</h2><Link className="preview-text-link" href="/photography">View gallery <span aria-hidden="true">&rarr;</span></Link></div>
        <div className="preview-photo-grid">
          {[0, 1, 2].map((index) => {
            const photo = personalPhotos[index];
            return <figure key={index} className="preview-photo-slot"><div className={`preview-photo-frame preview-photo-frame-${index}`}>{photo ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 600px) 90vw, 25vw" /> : <span>Photo {index + 1}</span>}</div><figcaption>{photo?.caption || "Your caption goes here."}</figcaption></figure>;
          })}
        </div>
      </section>
      <section className="preview-section" aria-labelledby="preview-personal">
        <div className="preview-section-heading"><h2 id="preview-personal">Personal projects</h2><Link className="preview-text-link" href="/personal">View personal page <span aria-hidden="true">&rarr;</span></Link></div>
        <div className="preview-project-placeholder"><div className="preview-project-image" role="img" aria-label="Placeholder for a personal project image">Project image</div><div><h3>Your project title</h3><p>Describe something you made, tried, or enjoyed. A few sentences are enough.</p></div></div>
      </section>
    </div>
  );
}
