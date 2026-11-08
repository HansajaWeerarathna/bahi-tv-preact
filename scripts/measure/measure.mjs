// Prints focus-move speed at 6x CPU slowdown, then runs a random key test.
// Point APP_URL at the production preview. PRESSES sets the number of random keys.
import { chromium } from 'playwright-core';

const APP_URL = process.env.APP_URL ?? 'http://localhost:4173/?demo';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
console.log(`Chrome ${browser.version()}`);
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});

await page.goto(APP_URL);
await page.waitForSelector('[data-focused]');

const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });

const times = await page.evaluate(async () => {
  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
  const keys = ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'];
  const results = [];
  for (let i = 0; i < 60; i++) {
    const before = document.querySelector('[data-focused]');
    const start = performance.now();
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: keys[i % keys.length], bubbles: true }),
    );
    while (document.querySelector('[data-focused]') === before) await nextFrame();
    await nextFrame();
    results.push(performance.now() - start);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return results.sort((a, b) => a - b);
});
console.log(
  `focus move at 6x slowdown: median ${times[30].toFixed(0)} ms, slowest 5% ${times[57].toFixed(0)} ms`,
);

await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

const KEYS = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'Enter',
  'Escape',
  'h',
  'm',
  '+',
  '-',
  '5',
  'n',
  'c',
  'p',
];
const total = Number(process.env.PRESSES ?? 2600);
for (let i = 0; i < total; i++) {
  await page.keyboard.press(KEYS[Math.floor(Math.random() * KEYS.length)]);
  await page.waitForTimeout(15);
}
console.log(`random keys: ${total} presses, ${errors.length} errors`, errors.slice(0, 5));

await browser.close();
