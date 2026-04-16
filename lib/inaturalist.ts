export type INaturalistArchiveObservation = {
  id: number;
  href: string;
  imageUrl?: string;
  commonName?: string;
  scientificName: string;
  iconicTaxonName?: string;
  observedOn?: string;
  placeGuess?: string;
  qualityGrade?: string;
};

type INaturalistPhoto = {
  url?: string;
};

type INaturalistTaxon = {
  name?: string;
  preferred_common_name?: string;
  iconic_taxon_name?: string;
};

type INaturalistObservationResult = {
  id: number;
  uri?: string;
  observed_on_string?: string;
  place_guess?: string;
  quality_grade?: string;
  species_guess?: string;
  photos?: INaturalistPhoto[];
  taxon?: INaturalistTaxon | null;
};

type INaturalistApiResponse = {
  total_results?: number;
  results?: INaturalistObservationResult[];
};

function upgradePhotoUrl(url?: string) {
  if (!url) {
    return undefined;
  }

  return url.replace("/square.", "/medium.");
}

export function extractINaturalistUserLogin(href?: string) {
  if (!href) {
    return undefined;
  }

  try {
    const url = new URL(href);
    const [, collection, userLogin] = url.pathname.split("/");

    if (
      (collection === "people" || collection === "observations") &&
      userLogin
    ) {
      return userLogin;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function normalizeINaturalistObservations(
  payload: INaturalistApiResponse,
) {
  const observations =
    payload.results?.map((observation) => {
      const scientificName =
        observation.taxon?.name ?? observation.species_guess ?? "Observation";

      return {
        id: observation.id,
        href:
          observation.uri ??
          `https://www.inaturalist.org/observations/${observation.id}`,
        imageUrl: upgradePhotoUrl(observation.photos?.[0]?.url),
        commonName: observation.taxon?.preferred_common_name,
        scientificName,
        iconicTaxonName: observation.taxon?.iconic_taxon_name,
        observedOn: observation.observed_on_string,
        placeGuess: observation.place_guess,
        qualityGrade: observation.quality_grade,
      } satisfies INaturalistArchiveObservation;
    }) ?? [];

  return {
    totalResults: payload.total_results ?? observations.length,
    observations,
  };
}
