import Link from "next/link";
import { getNotes } from "@/lib/notes";

export const metadata = { title: "Notes" };
export default async function NotesPage() {
  const notes = await getNotes();
  return <div className="folio"><h1>Notes</h1>
    {notes.length ? <ul className="note-index">{notes.map(note => <li key={note.slug}>
      <time dateTime={note.date}>{note.date}</time>
      <Link href={`/notes/${note.slug}`}>{note.title}</Link>
    </li>)}</ul> : <p>No entries published yet.</p>}
  </div>;
}
