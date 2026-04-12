"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { INaturalistArchiveObservation } from "@/lib/inaturalist";

type CompactObservationGridProps = {
  href?: string;
  userLogin?: string;
  perPage?: number;
  totalItems?: number;
};

export function CompactObservationGrid({
  href,
  userLogin,
  perPage = 28,
  totalItems = 56,
}: CompactObservationGridProps) {
  const [page, setPage] = useState(1);
  const [observations, setObservations] = useState<INaturalistArchiveObservation[]>(
    [],
  );
  const [totalResults, setTotalResults] = useState(totalItems);
  const [isLoading, setIsLoading] = useState(Boolean(userLogin));
  const [error, setError] = useState<string | null>(null);

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
        params.set("perPage", String(Math.max(totalItems, perPage)));
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
  }, [perPage, totalItems, userLogin]);

  useEffect(() => {
    setPage(1);
  }, [userLogin]);

  const totalEntries = observations.length || totalItems;
  const totalPages = Math.max(1, Math.ceil(totalEntries / perPage));

  const visibleItems = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    if (observations.length > 0) {
      return observations.slice(start, end);
    }

    return Array.from({ length: Math.min(perPage, totalItems - start) }).map(
      (_, index) => start + index + 1,
    );
  }, [observations, page, perPage, totalItems]);

  return (
    <div>
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
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="compact-observation-card compact-observation-link"
            >
              <div className="compact-observation-thumb">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.commonName ?? item.scientificName}
                    fill
                    sizes="(min-width: 1200px) 12vw, (min-width: 768px) 16vw, 24vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="compact-observation-thumb-placeholder" />
                )}
              </div>
              <div className="compact-observation-copy">
                <p className="compact-observation-name">
                  {item.commonName ?? item.scientificName}
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
            </a>
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
              Showing {visibleItems.length} of {totalResults} recent
              observations.
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
    </div>
  );
}
