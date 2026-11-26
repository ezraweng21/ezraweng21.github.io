import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const directory = path.join(process.cwd(), "content", "notes");
const filename = /^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

export async function getNotes() {
  const names = (await readdir(directory)).filter(name => filename.test(name)).sort().reverse();
  return Promise.all(names.map(async name => {
    const source = (await readFile(path.join(directory, name), "utf8")).trim();
    const match = /^#\s+([^\r\n]+)\r?\n?([\s\S]*)$/.exec(source);
    if (!match) throw new Error(`Start ${name} with "# Your title".`);
    return { slug: name.slice(0, -3), date: name.slice(0, 10), title: match[1].trim(), body: match[2].trim() };
  }));
}
