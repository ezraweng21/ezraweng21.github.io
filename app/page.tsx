import { PortraitLens } from "@/components/portrait-lens";
import { TypedQuote } from "@/components/typed-quote";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <div className="folio home-profile">
      <section className="portrait-intro" aria-labelledby="about-me">
        <PortraitLens src={profile.headshot} />
        <div>
          <h1>Ezra Weng<span>.</span></h1>
          <TypedQuote text={profile.quote.text} credit={profile.quote.credit} />
          <h2 id="about-me">About me</h2>
          <p className="lead">{profile.introduction}</p>
          <h3 className="interests-heading" id="research-interests">Research interests</h3>
          <ul className="research-interests" aria-labelledby="research-interests">
            {profile.researchInterests.map(interest => <li key={interest}>{interest}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
