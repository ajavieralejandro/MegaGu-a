export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function matchesQuery(haystack: string, query: string): boolean {
  if (!query.trim()) return true;
  return normalizeText(haystack).includes(normalizeText(query));
}
