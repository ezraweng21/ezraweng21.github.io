import Image from "next/image";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <div className="folio home-profile">
      <section className="portrait-intro" aria-labelledby="about-me">
        <div className="portrait-rule">
          <figure className="portrait-medallion">
            {profile.headshot ? <Image src={profile.headshot} alt="Ezra Weng" width={480} height={560} priority /> : <div className="portrait-monogram" role="img" aria-label="Placeholder for Ezra's portrait">EW</div>}
          </figure>
        </div>
        <div>
          <h1>Ezra Weng<span>.</span></h1>
          <figure className="profile-quote">
            <blockquote>{profile.quote.text}</blockquote>
            <figcaption>{profile.quote.credit}</figcaption>
          </figure>
          <h2 id="about-me">About me</h2>
          <p className="lead">{profile.introduction}</p>
        </div>
      </section>
    </div>
  );
}
