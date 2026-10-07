const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a file in /public with the base path, so the same content works
 * on a root domain (Vercel) and in a sub-folder (GitHub Pages).
 */
export const asset = (path: string) =>
  path.startsWith("/") ? `${basePath}${path}` : path;
