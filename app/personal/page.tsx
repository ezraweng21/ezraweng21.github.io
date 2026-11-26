import { InterestBanner } from "@/components/interest-banner";

export const metadata = { title: "Interests" };

export default function PersonalPage() {
  return <div className="folio interest-journal"><h1>Interests</h1>
    <InterestBanner kind="field" />
    <InterestBanner kind="kitchen" />
    <InterestBanner kind="routines" />
    <InterestBanner kind="plans" />
    <InterestBanner kind="watch" />
  </div>;
}
