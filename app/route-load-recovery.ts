/** Distinguish missing network modules from ordinary render errors. */
export function isPageFileError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /ChunkLoadError|Loading chunk .* failed|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i.test(message);
}

export function freshViewUrl(href: string, now = Date.now()): string {
  const url = new URL(href);
  url.searchParams.set("hubRefresh", String(now));
  return url.href;
}
