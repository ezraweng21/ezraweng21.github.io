import { writeFile } from 'node:fs/promises';

const entries = [];
const coverage = [];
const title = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
async function html(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  return response.text();
}
for (const [source, base, accept] of [
  ['React Bits', 'https://reactbits.dev', /^\/(components|backgrounds|text-animations|animations)\//],
  ['Kokonut UI', 'https://kokonutui.com', /^\/docs\/[^/]+\/[^/]+/],
  ['Skiper UI', 'https://skiper-ui.com', /^\/(v\d+|components)\/.+/],
  ['Bklit UI', 'https://bklit.com', /^\/charts\/.+/],
]) {
  try {
    const xml = await html(`${base}/sitemap.xml`);
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    for (const url of urls) {
      const path = new URL(url).pathname;
      if (!accept.test(path)) continue;
      const parts = path.split('/').filter(Boolean);
      entries.push({ source, url, name: title(parts.at(-1)), category: source === 'React Bits' ? title(parts[0]) : source === 'Kokonut UI' ? title(parts[1]) : source === 'Skiper UI' ? 'Interactive demos' : 'Charts' });
    }
    coverage.push({ source, status: 'Public sitemap indexed', url: `${base}/sitemap.xml` });
  } catch (error) { coverage.push({ source, status: error.message, url: base }); }
}
for (const [source, url, accept] of [
  ['Motion', 'https://motion.dev/examples', (url) => url.hostname === 'motion.dev' && /^\/examples\/.+/.test(url.pathname)],
  ['Anime.js', 'https://animejs.com/', (url) => url.hostname === 'codepen.io' || url.pathname.includes('/examples/')],
]) {
  try {
    const page = await html(url);
    for (const match of page.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g)) {
      const target = new URL(match[1].replace(/&amp;/g, '&'), url);
      if (!accept(target)) continue;
      const label = match[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      entries.push({ source, url: target.href, name: source === 'Motion' ? title(target.pathname.split('/').at(-1)) : label || title(target.pathname.split('/').at(-1)), category: source === 'Motion' ? 'Animation examples' : 'Animation demos' });
    }
    coverage.push({ source, status: 'Public examples page indexed', url });
  } catch (error) { coverage.push({ source, status: error.message, url }); }
}
for (const [source, url, name, category] of [
  ['Anime.js','https://animejs.com/','Animation showcase','Full catalog'],
  ['Skiper UI','https://skiper-ui.com/components','All components','Full catalog'],
  ['React Bits','https://reactbits.dev/get-started/index','Complete component index','Full catalog'],
  ['Kokonut UI','https://kokonutui.com/','Component showcase','Full catalog'],
  ['Motion','https://motion.dev/examples','All examples','Full catalog'],
  ['Bklit UI','https://bklit.com/','Chart library','Full catalog'],
  ['Enscribe','https://enscribe.dev/','Personal website reference','Reference'],
  ['Enscribe','https://github.com/jktrn/enscribe.dev','Template source','Reference'],
  ['Impeccable','https://impeccable.style/','Design guidance and showcase','Tool, not an effect library'],
  ['Manus','https://manus.im/','AI building tool','Tool, not an effect library'],
]) entries.push({ source, url, name, category });
const unique = [...new Map(entries.map((entry) => [entry.url, entry])).values()];
await writeFile('data/design-catalog.json', JSON.stringify({ updated: new Date().toISOString(), coverage, entries: unique }, null, 2));
console.log(JSON.stringify({ total: unique.length, sources: Object.fromEntries([...new Set(unique.map((entry) => entry.source))].map((source) => [source, unique.filter((entry) => entry.source === source).length])), coverage }, null, 2));
