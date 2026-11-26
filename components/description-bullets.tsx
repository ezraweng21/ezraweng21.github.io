const sentences = new Intl.Segmenter("en", { granularity: "sentence" });

export function DescriptionBullets({ text, outcome }: { text: string; outcome?: string }) {
  const points = Array.from(sentences.segment(text), ({ segment }) => segment.trim()).filter(Boolean);
  if (outcome) points.push(outcome);

  return <ul className="description-bullets">
    {points.map((point, index) => <li key={index}>{point}</li>)}
  </ul>;
}
