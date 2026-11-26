import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Markdown from "react-markdown";
import { FocusTimer } from "@/components/practice-desk";

export const metadata = { title: "Routines & guides" };

async function PublicList({ kind }: { kind: "Routines" | "Guides" }) {
  const folder = path.join(process.cwd(), "content", "practice", kind.toLowerCase());
  const files = (await readdir(folder)).filter(name => /^[a-z0-9][a-z0-9-]*\.md$/.test(name)).sort();
  const entries = await Promise.all(files.map(async name => {
    const source = (await readFile(path.join(folder, name), "utf8")).trim();
    const match = /^#\s+([^\r\n]+)\r?\n?([\s\S]*)$/.exec(source);
    if (!match) throw new Error(`Start ${kind}/${name} with "# Your title".`);
    return { name, title: match[1], body: match[2].trim() };
  }));
  return <section className="folio-section" aria-label={kind}>
    <h2>{kind}</h2>
    {entries.length ? entries.map(entry => <article key={entry.name} className="note-body">
      <h3>{entry.title}</h3>
      <Markdown>{entry.body}</Markdown>
    </article>) : <p className="journal-empty">No {kind.toLowerCase()} published yet.</p>}
  </section>;
}

export default function RoutinesPage() {
  return <div className="folio interest-journal">
    <Link href="/personal#routines">Back to interests</Link>
    <h1>Routines &amp; guides</h1>
    <PublicList kind="Routines" />
    <PublicList kind="Guides" />
    <FocusTimer />
  </div>;
}
