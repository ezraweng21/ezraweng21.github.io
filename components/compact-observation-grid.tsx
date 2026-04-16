"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ArchiveLightbox } from "@/components/archive-lightbox";
import type { INaturalistArchiveObservation } from "@/lib/inaturalist";

type CompactObservationGridProps = {
  href?: string;
  userLogin?: string;
  perPage?: number;
  totalItems?: number;
};

type ObservationFilter =
  | "all"
  | "plants"
  | "animals"
  | "birds"
  | "mammals"
  | "insects"
  | "fungi";
type ObservationSort = "recent" | "name";

const FILTER_OPTIONS: Array<{
  key: ObservationFilter;
  label: string;
  iconicTaxa?: string[];
}> = [
  { key: "all", label: "All" },
  { key: "plants", label: "Plants", iconicTaxa: ["Plantae"] },
  {
    key: "animals",
    label: "Animals",
    iconicTaxa: [
      "Animalia",
      "Mammalia",
      "Aves",
      "Reptilia",
      "Amphibia",
      "Actinopterygii",
      "Mollusca",
      "Arachnida",
      "Insecta",
    ],
  },
  { key: "birds", label: "Birds", iconicTaxa: ["Aves"] },
  { key: "mammals", label: "Mammals", iconicTaxa: ["Mammalia"] },
  { key: "insects", label: "Insects", iconicTaxa: ["Insecta"] },
  { key: "fungi", label: "Fungi", iconicTaxa: ["Fungi"] },
];

const SORT_OPTIONS: Array<{ key: ObservationSort; label: string }> = [
  { key: "recent", label: "Recent" },
  { key: "name", label: "A-Z" },
];

function getObservationTitle(observation: INaturalistArchiveObservation) {
  return observation.commonName ?? observation.scientificName;
}

export function CompactObservationGrid({
  href,
  userLogin,
  perPage = 30,
  totalItems = 56,
}: CompactObservationGridProps) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ObservationFilter>("all");
  const [sort, setSort] = useState<ObservationSort>("recent");
  const [selectedObservation, setSelectedObservation] =
    useState<INaturalistArchiveObservation | null>(null);
  const [lightboxObservation, setLightboxObservation] =
    useState<INaturalistArchiveObservation | null>(null);
  const [observations, setObservations] = useState<INaturalistArchiveObservation[]>(
    [],
  );
  const [totalResults, setTotalResults] = useState(totalItems);
  const [isLoading, setIsLoading] = useState(Boolean(userLogin));
  const [error, setError] = useState<string | null>(null);

  const activeFilter = FILTER_OPTIONS.find((option) => option.key === filter);

  useEffect(() => {
    const safeUserLogin = userLogin;

    if (!safeUserLogin) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadObservations() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set("userLogin", safeUserLogin ?? "");
        params.set("perPage", String(perPage));
        params.set("page", String(page));

        if (activeFilter?.iconicTaxa) {
          for (const taxon of activeFilter.iconicTaxa) {
            params.append("iconicTaxa", taxon);
          }
        }

        const response = await fetch(
          `/api/inaturalist/observations?${params.toString()}`,
        );
        const payload = (await response.json()) as {
          observations?: INaturalistArchiveObservation[];
          totalResults?: number;
          error?: string;
        };

        if (!isMounted) {
          return;
        }

        if (!response.ok || payload.error) {
          setObservations([]);
          setSelectedObservation(null);
          setTotalResults(totalItems);
          setError(payload.error ?? "Unable to load observations.");
          return;
        }

        setObservations(payload.observations ?? []);
        setTotalResults(
          payload.totalResults ?? payload.observations?.length ?? totalItems,
        );
      } catch {
        if (!isMounted) {
          return;
        }

        setObservations([]);
        setSelectedObservation(null);
        setTotalResults(totalItems);
        setError("Unable to load observations right now.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadObservations();

    return () => {
      isMounted = false;
    };
  }, [activeFilter?.iconicTaxa, page, perPage, totalItems, userLogin]);

  useEffect(() => {
    setPage(1);
  }, [filter, userLogin]);

  const visibleItems = useMemo(() => {
    if (observations.length === 0) {
      const start = (page - 1) * perPage;

      return Array.from({ length: Math.min(perPage, totalItems - start) }).map(
        (_, index) => start + index + 1,
      );
    }

    if (sort === "name") {
      return [...observations].sort((a, b) =>
        getObservationTitle(a).localeCompare(getObservationTitle(b)),
      );
    }

    return observations;
  }, [observations, page, perPage, sort, totalItems]);

  useEffect(() => {
    const observationItems = visibleItems.filter(
      (item): item is INaturalistArchiveObservation => typeof item !== "number",
    );

    if (observationItems.length === 0) {
      setSelectedObservation(null);
      return;
    }

    setSelectedObservation((current) => {
      if (!current) {
        return observationItems[0];
      }

      const stillVisible = observationItems.find(
        (item) => item.id === current.id,
      );

      return stillVisible ?? observationItems[0];
    });
  }, [visibleItems]);

  const totalPages = Math.max(1, Math.ceil(totalResults / perPage));
  const observationItems = visibleItems.filter(
    (item): item is INaturalistArchiveObservation => typeof item !== "number",
  );
  const lightboxIndex =
    lightboxObservation !== null
      ? observationItems.findIndex((item) => item.id === lightboxObservation.id)
      : -1;

  function moveLightboxSelection(direction: -1 | 1) {
    if (observationItems.length === 0 || lightboxIndex < 0) {
      return;
    }

    const nextIndex =
      (lightboxIndex + direction + observationItems.length) %
      observationItems.length;
    setLightboxObservation(observationItems[nextIndex]);
  }

  return (
    <div className="compact-observation-archive">
      <div className="compact-observation-toolbar">
        <div className="compact-observation-filter-row">
          <p className="page-meta">Filter</p>
          <div className="compact-observation-pills">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={`compact-observation-pill ${
                  filter === option.key ? "compact-observation-pill-active" : ""
                }`}
                onClick={() => setFilter(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="compact-observation-filter-row">
          <p className="page-meta">Sort</p>
          <div className="compact-observation-pills">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={`compact-observation-pill ${
                  sort === option.key ? "compact-observation-pill-active" : ""
                }`}
                onClick={() => setSort(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedObservation ? (
        <section className="compact-observation-feature">
          <div className="compact-observation-feature-media">
            {selectedObservation.imageUrl ? (
              <button
                type="button"
                className="compact-observation-feature-button"
                onClick={() => setLightboxObservation(selectedObservation)}
              >
                <Image
                  src={selectedObservation.imageUrl}
                  alt={getObservationTitle(selectedObservation)}
                  fill
                  sizes="(min-width: 1200px) 22vw, (min-width: 768px) 32vw, 92vw"
                  className="object-contain bg-[#f5eee4]"
                />
              </button>
            ) : (
              <div className="compact-observation-thumb-placeholder" />
            )}
          </div>

          <div className="compact-observation-feature-copy">
            <p className="eyebrow">
              {activeFilter?.label ?? "All"} archive selection
            </p>
            <h3 className="mt-2 text-xl text-ink">
              {getObservationTitle(selectedObservation)}
            </h3>
            {selectedObservation.commonName ? (
              <p className="compact-observation-feature-taxon">
                {selectedObservation.scientificName}
              </p>
            ) : null}
            <div className="compact-observation-feature-meta">
              {selectedObservation.observedOn ? (
                <p>{selectedObservation.observedOn}</p>
              ) : null}
              {selectedObservation.placeGuess ? (
                <p>{selectedObservation.placeGuess}</p>
              ) : null}
              {selectedObservation.qualityGrade ? (
                <p>Grade: {selectedObservation.qualityGrade}</p>
              ) : null}
              {selectedObservation.iconicTaxonName ? (
                <p>Taxon: {selectedObservation.iconicTaxonName}</p>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={selectedObservation.href}
                className="compact-observation-open"
              >
                Open Observation
              </Link>
              {href ? (
                <Link href={href} className="home-inline-link">
                  Profile
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <div className="compact-observation-grid">
        {visibleItems.map((item) =>
          typeof item === "number" ? (
            <article key={item} className="compact-observation-card">
              <div className="compact-observation-thumb compact-observation-thumb-placeholder" />
              <div className="compact-observation-copy">
                <p className="page-meta">
                  Obs {String(item).padStart(2, "0")}
                </p>
                <p className="compact-observation-name mt-1">
                  Observation placeholder
                </p>
              </div>
            </article>
          ) : (
            <button
              key={item.id}
              type="button"
              className={`compact-observation-card compact-observation-card-button ${
                selectedObservation?.id === item.id
                  ? "compact-observation-card-active"
                  : ""
              }`}
              onClick={() => setSelectedObservation(item)}
              onDoubleClick={() => setLightboxObservation(item)}
            >
              <div className="compact-observation-thumb">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={getObservationTitle(item)}
                    fill
                    sizes="(min-width: 1200px) 12vw, (min-width: 768px) 16vw, 24vw"
                    className="object-contain bg-[#f5eee4]"
                  />
                ) : (
                  <div className="compact-observation-thumb-placeholder" />
                )}
              </div>
              <div className="compact-observation-copy">
                <p className="compact-observation-name">
                  {getObservationTitle(item)}
                </p>
                {item.commonName ? (
                  <p className="compact-observation-taxon">
                    {item.scientificName}
                  </p>
                ) : null}
                {item.observedOn ? (
                  <p className="page-meta mt-1">{item.observedOn}</p>
                ) : null}
                {item.placeGuess ? (
                  <p className="compact-observation-meta">{item.placeGuess}</p>
                ) : null}
              </div>
            </button>
          ),
        )}
      </div>

      <div className="compact-grid-footer mt-4">
        <div>
          <p className="page-meta">
            Page {page} of {totalPages}
          </p>
          {observations.length > 0 ? (
            <p className="compact-observation-status">
              Showing {visibleItems.length} observations from page {page} of{" "}
              {totalPages}, with {totalResults} total currently returned by
              iNaturalist.
            </p>
          ) : isLoading ? (
            <p className="compact-observation-status">
              Loading public observations from iNaturalist...
            </p>
          ) : error ? (
            <p className="compact-observation-status">{error}</p>
          ) : null}
        </div>
        <div className="compact-grid-controls">
          <button
            type="button"
            className="compact-grid-control"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="compact-grid-control"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
          >
            Next
          </button>
          {href ? (
            <Link href={href} className="home-inline-link">
              Open iNaturalist
            </Link>
          ) : null}
        </div>
      </div>

      {lightboxObservation?.imageUrl ? (
        <ArchiveLightbox
          src={lightboxObservation.imageUrl}
          alt={getObservationTitle(lightboxObservation)}
          caption={getObservationTitle(lightboxObservation)}
          meta={[
            lightboxObservation.scientificName,
            lightboxObservation.observedOn,
            lightboxObservation.placeGuess,
            lightboxObservation.qualityGrade
              ? `Grade: ${lightboxObservation.qualityGrade}`
              : undefined,
          ].filter((item): item is string => Boolean(item))}
          onClose={() => setLightboxObservation(null)}
          onPrevious={() => moveLightboxSelection(-1)}
          onNext={() => moveLightboxSelection(1)}
        />
      ) : null}
    </div>
  );
}
