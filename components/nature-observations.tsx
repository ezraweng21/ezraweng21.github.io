"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { INaturalistArchiveObservation } from "@/lib/inaturalist";
import { PhotoViewer } from "@/components/photo-viewer";

const taxa = [
  ["All", ""], ["Plants", "Plantae"], ["Birds", "Aves"],
  ["Mammals", "Mammalia"], ["Reptiles", "Reptilia"],
  ["Amphibians", "Amphibia"], ["Insects", "Insecta"],
  ["Fungi", "Fungi"], ["Fish", "Actinopterygii"],
];

export function NatureObservations() {
  const [taxon, setTaxon] = useState("");
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [observations, setObservations] = useState<INaturalistArchiveObservation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ userLogin: "ezraweng21", perPage: "18", page: String(page) });
        if (taxon) params.set("iconicTaxa", taxon);
        const response = await fetch(`/api/inaturalist/observations?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load observations.");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        if (controller.signal.aborted) return;
        setObservations((current) => page === 1 ? data.observations : [...current, ...data.observations].filter((observation, index, all) => all.findIndex((item) => item.id === observation.id) === index));
        setTotal(data.totalResults);
      } catch {
        if (!controller.signal.aborted) setError("Observations could not be loaded. You can retry or visit my iNaturalist profile.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [taxon, page, retry]);

  return <section id="observations" className="archive-album nature-observations" aria-labelledby="observations-heading">
    <header className="archive-album-heading"><h2 id="observations-heading">iNaturalist</h2><a href="https://www.inaturalist.org/people/ezraweng21" target="_blank" rel="noreferrer">View my profile</a></header>
    <p className="archive-context">My public observations, with links to the original records.</p>
    <div className="archive-filters" role="group" aria-label="Observation types">{taxa.map(([label, value]) => <button key={label} aria-pressed={taxon === value} onClick={() => { if (value !== taxon) { setTaxon(value); setPage(1); setObservations([]); setTotal(0); setLoading(true); } }}>{label}</button>)}</div>
    <div className="observation-grid" aria-busy={loading}>
      {observations.map((observation, index) => <button key={observation.id} onClick={() => setSelected(index)} className="observation-print" aria-label={`Enlarge ${observation.commonName || observation.scientificName}`}>
        <span className="observation-image">{observation.imageUrl ? <Image src={observation.imageUrl} alt={observation.commonName || observation.scientificName} fill sizes="(max-width: 600px) 45vw, 25vw" /> : "No photograph"}</span>
        <span>{observation.commonName || observation.scientificName}</span>
        {observation.commonName && <i>{observation.scientificName}</i>}
      </button>)}
    </div>
    <p className="archive-context" role="status">{loading ? "Loading observations..." : error || (!observations.length ? "No observations were found in this category." : "")}</p>
    {error ? <button className="archive-more" onClick={() => setRetry((value) => value + 1)}>Retry</button> : observations.length < total && <button className="archive-more" disabled={loading} onClick={() => setPage((value) => value + 1)}>{loading ? "Loading..." : "Show more observations"}</button>}
    <PhotoViewer photos={observations.map((photo) => ({ src: photo.imageUrl || "", alt: photo.commonName || photo.scientificName, href: photo.href }))} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} />
  </section>;
}
