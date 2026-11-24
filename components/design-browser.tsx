"use client";

import { useDeferredValue, useEffect, useState } from "react";
import catalog from "@/data/design-catalog.json";

type Pick = { page: string; note: string };
const sources = [...new Set(catalog.entries.map((entry) => entry.source))];
const storageKey = "ezra-design-picks-v1";

export function DesignBrowser() {
  const [source, setSource] = useState("React Bits");
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search.toLowerCase());
  const [category, setCategory] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [picks, setPicks] = useState<Record<string, Pick>>({});
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const [active, setActive] = useState(catalog.entries.find((entry) => /dome-gallery/.test(entry.url)) ?? catalog.entries[0]);
  const [preview, setPreview] = useState(false);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (stored && typeof stored === "object" && !Array.isArray(stored)) {
        setPicks(Object.fromEntries(Object.entries(stored).filter((pair): pair is [string, Pick] => Boolean(pair[1] && typeof pair[1] === "object" && "page" in pair[1] && "note" in pair[1] && typeof pair[1].page === "string" && typeof pair[1].note === "string"))));
      }
    } catch { setStatus("Saved picks could not be read. You can still browse and export new picks."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify(picks)); }
    catch { setStatus("Browser storage is unavailable. Export your shortlist to keep it."); }
  }, [picks, ready]);
  const categories = [...new Set(catalog.entries.filter((entry) => source === "All" || entry.source === source).map((entry) => entry.category))];
  const results = catalog.entries.filter((entry) => (source === "All" || entry.source === source) && (category === "All" || entry.category === category) && (!savedOnly || picks[entry.url]) && `${entry.name} ${entry.source} ${entry.category}`.toLowerCase().includes(query));
  const selected = picks[active.url];
  function togglePick() {
    setPicks((current) => { const next = { ...current }; if (next[active.url]) delete next[active.url]; else next[active.url] = { page: "Undecided", note: "" }; return next; });
  }
  function exportPicks() {
    const text = catalog.entries.filter((entry) => picks[entry.url]).map((entry) => `## ${entry.name} (${entry.source})\n${entry.url}\nPage: ${picks[entry.url].page}\nNotes: ${picks[entry.url].note}\n`).join("\n");
    const url = URL.createObjectURL(new Blob([`# Design shortlist\n\n${text}`], { type: "text/markdown" }));
    const link = document.createElement("a"); link.href = url; link.download = "design-shortlist.md"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Shortlist exported.");
  }
  return <div className="design-browser">
    <header className="design-browser-header"><div><p>Personal design workspace</p><h1>Find your favorites.</h1><p>Browse the original demos. Save ideas before changing your site.</p></div><button onClick={exportPicks} disabled={!Object.keys(picks).length}>Export picks ({Object.keys(picks).length})</button></header>
    <nav className="design-sources" aria-label="Design sources">{["All", ...sources].map((name) => <button key={name} aria-pressed={source === name} onClick={() => { setSource(name); setCategory("All"); }}>{name}<span>{name === "All" ? catalog.entries.length : catalog.entries.filter((entry) => entry.source === name).length}</span></button>)}</nav>
    <div className="design-browser-workspace">
      <aside className="design-index" aria-label="Catalog">
        <label>Find an effect<input type="search" placeholder="Gallery, shader, scroll..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label className="design-saved-filter"><input type="checkbox" checked={savedOnly} onChange={(event) => { setSavedOnly(event.target.checked); if (event.target.checked) { setSource("All"); setCategory("All"); } }} />Saved picks only</label>
        <p aria-live="polite">{results.length} matches</p>
        <div className="design-results">{results.map((entry) => <button key={entry.url} aria-pressed={active.url === entry.url} onClick={() => { setActive(entry); setPreview(false); }}><span>{entry.name}</span><small>{entry.source} / {entry.category}{picks[entry.url] ? " / Saved" : ""}</small></button>)}{!results.length && <p>No matches. Try another source or search.</p>}</div>
      </aside>
      <section className="design-detail" aria-labelledby="effect-title">
        <div className="design-detail-heading"><div><p>{active.source} / {active.category}</p><h2 id="effect-title">{active.name}</h2></div><button disabled={!ready} aria-pressed={Boolean(selected)} onClick={togglePick}>{selected ? "Saved" : "Save this idea"}</button></div>
        <div className="design-preview-actions"><a href={active.url} target="_blank" rel="noreferrer">Open original demo</a><button onClick={() => setPreview(!preview)}>{preview ? "Stop preview" : "Load live preview"}</button><button aria-pressed={narrow} onClick={() => setNarrow(!narrow)}>{narrow ? "Phone width" : "Full width"}</button></div>
        <p className="design-preview-notice">Some sites block embedding or require a paid account. If the preview is blank or refused, use Open original demo. No access restrictions are bypassed.</p>
        <div className={`design-preview ${narrow ? "design-preview-narrow" : ""}`}>
          {preview ? <iframe key={active.url} src={active.url} title={`${active.name} original demo`} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" allow="fullscreen" /> : <div className="design-preview-empty"><span>{active.source}</span><h3>{active.name}</h3><p>Load the original page to try its animation and controls.</p><button onClick={() => setPreview(true)}>Load live preview</button></div>}
        </div>
        {selected && <div className="design-pick-notes"><label>Where could it go?<select value={selected.page} onChange={(event) => setPicks({ ...picks, [active.url]: { ...selected, page: event.target.value } })}>{["Undecided", "Home / headshot", "About", "Photography", "Projects", "Activities", "Page transitions"].map((name) => <option key={name}>{name}</option>)}</select></label><label>What do you like?<textarea value={selected.note} placeholder="The motion, the layout, the way images react..." onChange={(event) => setPicks({ ...picks, [active.url]: { ...selected, note: event.target.value } })} /></label></div>}
      </section>
    </div>
    <p role="status">{status}</p>
    <details className="design-coverage"><summary>Catalog coverage and saved-pick privacy</summary><p>Public snapshot: {catalog.updated.slice(0, 10)}. This is not an exhaustive inventory of paid, unlisted, or newly added effects. Anime.js has showcase links rather than a complete effect index. Impeccable and Manus are tools; Enscribe is a website reference. Skiper names may be numbered demo IDs.</p><p>Picks and notes stay in this browser on this origin. They are not synced or sent to an account. Export them before clearing browser storage. This workspace is unlinked from site navigation and marked noindex, but is not password-protected.</p>{catalog.coverage.map((item) => <p key={item.source}><a href={item.url} target="_blank" rel="noreferrer">{item.source}</a>: {item.status}</p>)}</details>
  </div>;
}
