import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getNotes } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getNotes()).map(({ slug }) => ({ slug }));
}
async function findNote(params: Props["params"]) {
  const { slug } = await params;
  return (await getNotes()).find(note => note.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  return { title: (await findNote(params)).title };
}
export default async function NotePage({ params }: Props) {
  const note = await findNote(params);
  return <article className="folio note-body"><Link href="/notes">All notes</Link>
    <header><h1>{note.title}</h1><time dateTime={note.date}>{note.date}</time></header>
    <Markdown skipHtml>{note.body}</Markdown>
  </article>;
}
