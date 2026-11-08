// Measures focus-move speed at 6x CPU slowdown, then presses random remote keys.
// Point APP_URL at the production preview. PRESSES sets the number of random keys.
// Exit status is 1 if a planned focus move never happens, or if any page or console error is recorded.
import { chromium } from 'playwright-core';

const APP_URL = process.env.APP_URL ?? 'http://localhost:4173/?demo';
// A planned arrow press must move focus within this many milliseconds, or the run fails.
const FOCUS_TIMEOUT_MS = 2000;
const FOCUS_SAMPLES = 60;
const FOCUS_KEYS = ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'];
const RANDOM_KEYS = [
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

async function measure(browser) {
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

  const times = await page.evaluate(
    async ({ samples, keys, timeoutMs }) => {
      const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
      const results = [];
      for (let i = 0; i < samples; i++) {
        const key = keys[i % keys.length];
        const before = document.querySelector('[data-focused]');
        const start = performance.now();
        window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        while (document.querySelector('[data-focused]') === before) {
          if (performance.now() - start > timeoutMs) {
            throw new Error(
              `Focus did not move within ${timeoutMs} ms: key ${key}, sample ${i + 1} of ${samples}`,
            );
          }
          await nextFrame();
        }
        await nextFrame();
        results.push(performance.now() - start);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      return results.sort((a, b) => a - b);
    },
    { samples: FOCUS_SAMPLES, keys: FOCUS_KEYS, timeoutMs: FOCUS_TIMEOUT_MS },
  );
  console.log(
    `focus move at 6x slowdown: median ${times[30].toFixed(0)} ms, slowest 5% ${times[57].toFixed(0)} ms`,
  );

  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  const total = Number(process.env.PRESSES ?? 2600);
  for (let i = 0; i < total; i++) {
    await page.keyboard.press(RANDOM_KEYS[Math.floor(Math.random() * RANDOM_KEYS.length)]);
    await page.waitForTimeout(15);
  }
  console.log(`random keys: ${total} presses, ${errors.length} errors`, errors.slice(0, 5));
  return errors.length;
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let errorCount;
  try {
    errorCount = await measure(browser);
  } finally {
    await browser.close();
  }
  if (errorCount > 0) {
    console.error(`FAILED: ${errorCount} page or console errors recorded`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`FAILED: ${error.message}`);
  process.exitCode = 1;
});
