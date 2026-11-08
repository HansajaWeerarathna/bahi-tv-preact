// The site's folder: '' locally, '/bahi-tv-preact' on GitHub Pages (set in vite.config.ts).
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
