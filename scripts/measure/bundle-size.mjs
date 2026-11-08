// Gzips every file dist/index.html loads at start-up and prints the JS and CSS totals.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const dist = (path) => fileURLToPath(new URL(`../../dist/${path}`, import.meta.url));
const html = readFileSync(dist('index.html'), 'utf8');
const files = [
  ...html.matchAll(/(?:src|href)="\/(?:bahi-tv-preact\/)?(assets\/[^"]+\.(?:js|css))"/g),
].map((match) => match[1]);

const totals = { js: 0, css: 0 };
for (const file of new Set(files)) {
  totals[file.endsWith('.css') ? 'css' : 'js'] += gzipSync(readFileSync(dist(file))).length;
}
console.log(`Files: ${new Set(files).size}`);
console.log(
  `JavaScript ${(totals.js / 1024).toFixed(2)} KB, CSS ${(totals.css / 1024).toFixed(2)} KB`,
);
