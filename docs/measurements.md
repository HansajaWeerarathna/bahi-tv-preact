# Measurements

Measured on app code at commit `01f8ac4`, with the production build served by `npm run preview`.

## Environment

|                  |                                                |
| ---------------- | ---------------------------------------------- |
| Operating system | Microsoft Windows 11 Home Single Language      |
| Processor        | 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz |
| Browser          | Headless Chrome 156.0.8078.74                  |
| Node             | v24.21.0                                       |

## Results

| Measure                         | Result                                                       | Samples                                          |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| JavaScript at start-up, gzipped | 35.43 KB                                                     | 6 files with CSS, as listed by `dist/index.html` |
| CSS at start-up, gzipped        | 7.16 KB                                                      | Same run                                         |
| Focus move, median              | 35 ms                                                        | 60 moves across the top tile row                 |
| Focus move, slowest 5%          | 54 ms                                                        | Same 60 moves                                    |
| Random remote key presses       | 2,600 random key presses; no page or console errors recorded | One run                                          |

## How to repeat this

```bash
npm run build
npm run preview
```

In a second terminal:

```bash
node scripts/measure/bundle-size.mjs
cd scripts/measure
npm install
node measure.mjs
```

## Method

- **Bundle size:** every JavaScript and CSS file named in `dist/index.html`, gzipped with Node's zlib at its default level.
- **Focus move:** Chrome's CPU is slowed 6× through DevTools. The time runs from dispatching the key event to the first animation frame after the focused element changes.
- **Random keys:** arrows, OK, Back, Home, Menu, volume, a digit and the N, C and P demo keys, pressed at random. Page errors and console errors are counted.

## Limits

CPU slowdown on a desktop isn't a physical TV. These numbers compare builds and catch regressions. They don't predict the speed on any particular TV model.
