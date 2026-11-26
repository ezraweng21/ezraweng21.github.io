const monthOrder = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function startKey(period: string) {
  const year = period.match(/\b(?:19|20)\d{2}\b/);
  if (!year) return Number.MAX_SAFE_INTEGER;
  const month = period.toLowerCase().match(/[a-z]+/g)?.find(word => monthOrder.includes(word) || word === "summer");
  // Keep year-only records after more precisely dated records in that year.
  const withinYear = month === "summer" ? 5.5 : month ? monthOrder.indexOf(month) : 12;
  return Number(year[0]) * 13 + withinYear;
}

export function earliestFirst<T>(entries: readonly T[], period: (entry: T) => string): T[] {
  return [...entries].sort((a, b) => startKey(period(a)) - startKey(period(b)));
}

// Keep precise dates in the source records; listings use year-level precision.
export function displayYears(period: string): string {
  const years = period.match(/\b(?:19|20)\d{2}\b/g);
  if (!years) return period;
  const first = years[0];
  if (/\b(?:since|present|ongoing)\b/i.test(period)) return `${first}–present`;
  const last = years[years.length - 1];
  return first === last ? first : `${first}–${last}`;
}
