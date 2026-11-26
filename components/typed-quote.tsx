import type { CSSProperties } from "react";

export function TypedQuote({ text, credit }: { text: string; credit: string }) {
  let delay = 920;
  const beat = 85;

  return <figure className="profile-quote">
    <blockquote>
      <span className="quote-accessible">{text}</span>
      <span aria-hidden="true">{text.split(/(\s+)/).map((word, i) => {
        if (!word.trim()) {
          delay += 55;
          return word;
        }
        return <span className="quote-word" key={i}>{Array.from(word).map((letter, j) => {
          const start = delay;
          const hold = beat + (/[,;:.!?]/.test(letter) ? 190 : 0);
          delay += hold;
          return <span className="quote-letter" key={j}
            style={{ "--start": `${start}ms`, "--hold": `${hold}ms` } as CSSProperties}>{letter}</span>;
        })}</span>;
      })}</span>
    </blockquote>
    <figcaption style={{ "--start": `${delay}ms` } as CSSProperties}>{credit}</figcaption>
  </figure>;
}
