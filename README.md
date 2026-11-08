# Bahi TV

The in-room TV home screen for Bahi Ajman Palace Hotel. A guest uses a TV remote to reach the front desk, room service, the TV, offers, Wi-Fi, messages, alarms and room controls. Everything is in English and Arabic, and Arabic mirrors the whole layout.

The screen is a fixed 1920×1080 canvas, scaled to fit any window.

![Home screen in English](docs/screenshots/home-en.png)

![Home screen in Arabic](docs/screenshots/home-ar.png)

## Run it

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm test          # unit tests
npm run lint
npm run typecheck
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
```

## Remote keys

| Key                 | Action                        |
| ------------------- | ----------------------------- |
| Arrow keys          | Move focus                    |
| Enter               | OK: select                    |
| Escape or Backspace | Back                          |
| H or Home           | Home screen                   |
| M                   | Settings                      |
| + or =              | Volume up by 5                |
| - or _              | Volume down by 5              |
| 0 to 9              | Tune a channel on the TV page |

Add `?demo` to the address to show the demo keys:

| Key | Action                                            |
| --- | ------------------------------------------------- |
| N   | New message on or off                             |
| C   | Check-out day on or off                           |
| P   | Offer layout                                      |
| S   | Review states (eleven states, Up, Down and Enter) |
| D   | Key legend                                        |

## Scope

The assignment asked for the home page and its navigation. The other pages (room service, offers, Wi-Fi, stay, weather, room controls, alarms, settings, search and the system screens) were built afterwards, phase by phase.

## How it is built

Preact with Preact Signals, preact-iso for routing, Tailwind CSS v4 and Vite. TypeScript is strict.

The code follows Feature-Sliced Design. Each layer may import only from the layers below it:

```
src/
  app/        startup, routes, global styles
  pages/      one folder per screen
  widgets/    large page regions (header, tiles, background)
  features/   user actions (alarms, order food, demo tools, volume)
  entities/   data and signals (guest, offers, weather, alarms)
  shared/     UI parts, remote navigation, i18n, time helpers
```

## Decisions

- **Focus moves by position on screen**, not by a fixed list of neighbours. Arabic mirrors the layout, so the remote needs no key swap, and a new page needs no navigation code.
- **One fixed canvas, scaled with a single transform**, so the layout is the same on every TV size.
- **Colours and sizes are design tokens** in Tailwind's `@theme`. High contrast and larger text change those tokens; they don't add separate styles.
- **Hotel time** (Asia/Dubai) drives the clock and the greeting, not the TV's own clock.
- **Only the home screen loads at start-up.** Other pages load the first time they are opened.
- **Alarms and guest details are kept in memory only.** Nothing is saved to the browser, as in the original.

## Credits

- **Fonts:** Alexandria and Noto Naskh Arabic, SIL Open Font License. Licence files are in `public/fonts/`.
- **Icons:** outline icons from an older Lucide release, ISC licence. They are copied into the project as path data.
- **Offer photos:** afternoon tea, daily activities and sunset boat trip are under the Unsplash License.
- **Heritage tour photo:** "Photo: Ajman Fort by Ahmed Fouad, CC BY-SA 3.0, via Wikimedia Commons".
- **Lobby photo:** carried over from the original design. Its source and licence are not recorded in this project and should be confirmed before publishing.
- The hotel name and logo belong to Bahi Ajman Palace Hotel. They are used here for this design exercise.
