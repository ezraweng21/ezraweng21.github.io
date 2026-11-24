// Keep precise dates in the source records; listings use year-level precision.
export function displayYears(period: string): string {
  const years = period.match(/\b(?:19|20)\d{2}\b/g);
  if (!years) return period;
  const first = years[0];
  if (/\b(?:since|present|ongoing)\b/i.test(period)) return `${first}–present`;
  const last = years[years.length - 1];
  return first === last ? first : `${first}–${last}`;
}
