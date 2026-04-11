"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CompactObservationGridProps = {
  href?: string;
  perPage?: number;
  totalItems?: number;
};

export function CompactObservationGrid({
  href,
  perPage = 28,
  totalItems = 56,
}: CompactObservationGridProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const visibleItems = useMemo(() => {
    const start = (page - 1) * perPage;

    return Array.from({ length: Math.min(perPage, totalItems - start) }).map(
      (_, index) => start + index + 1,
    );
  }, [page, perPage, totalItems]);

  return (
    <div>
      <div className="compact-observation-grid">
        {visibleItems.map((item) => (
          <article key={item} className="compact-observation-card">
            <div className="compact-observation-thumb" />
            <p className="page-meta mt-2">
              Obs {String(item).padStart(2, "0")}
            </p>
          </article>
        ))}
      </div>

      <div className="compact-grid-footer mt-4">
        <p className="page-meta">
          Page {page} of {totalPages}
        </p>
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
