import { NextResponse } from "next/server";

import { normalizeINaturalistObservations } from "@/lib/inaturalist";

const DEFAULT_PER_PAGE = 96;
const MAX_PER_PAGE = 200;
const DEFAULT_PAGE = 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userLogin = searchParams.get("userLogin");
  const iconicTaxa = searchParams.getAll("iconicTaxa");
  const requestedPerPage = Number(searchParams.get("perPage"));
  const requestedPage = Number(searchParams.get("page"));
  const perPage = Number.isFinite(requestedPerPage)
    ? Math.min(Math.max(requestedPerPage, 1), MAX_PER_PAGE)
    : DEFAULT_PER_PAGE;
  const page = Number.isFinite(requestedPage)
    ? Math.max(requestedPage, DEFAULT_PAGE)
    : DEFAULT_PAGE;

  if (!userLogin) {
    return NextResponse.json(
      { observations: [], totalResults: 0, error: "Missing userLogin." },
      { status: 400 },
    );
  }

  const upstreamParams = new URLSearchParams({
    user_login: userLogin,
    per_page: String(perPage),
    page: String(page),
    order_by: "observed_on",
    order: "desc",
    photos: "true",
  });

  if (iconicTaxa.length > 0) {
    for (const taxon of iconicTaxa) {
      upstreamParams.append("iconic_taxa[]", taxon);
    }
  }

  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/observations?${upstreamParams.toString()}`,
      {
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          observations: [],
          totalResults: 0,
          error: `iNaturalist request failed (${response.status}).`,
          iconicTaxa,
        },
        { status: 200 },
      );
    }

    const payload = await response.json();
    const normalized = normalizeINaturalistObservations(payload);

    return NextResponse.json(
      {
        ...normalized,
        page,
        perPage,
        iconicTaxa,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        observations: [],
        totalResults: 0,
        page,
        perPage,
        iconicTaxa,
        error: "Unable to reach iNaturalist right now.",
      },
      { status: 200 },
    );
  }
}
