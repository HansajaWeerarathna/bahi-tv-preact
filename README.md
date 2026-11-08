# Bahi TV

In-room TV home screen for Bahi Ajman Palace Hotel, built with Preact, TypeScript and Tailwind CSS v4. It runs on a fixed 1920×1080 canvas that scales to any window, and it works with a TV remote (arrow keys, OK, Back, Home) or a keyboard.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. Other scripts: `npm run build`, `npm run preview`, `npm test`, `npm run lint`, `npm run format`, `npm run typecheck`.

The build targets Chrome 111 and Safari 16.4 and later. Older built-in TV browsers (for example Chromium 79–108 on some older TV models) are not supported.

## Remote keys

| Keyboard          | Remote | Action                                           |
| ----------------- | ------ | ------------------------------------------------ |
| Arrow keys        | D-pad  | Move focus to the nearest item in that direction |
| Enter             | OK     | Select the focused item                          |
| Escape, Backspace | Back   | Go back one page                                 |
| H, Home           | Home   | Go to the home page                              |
| M                 | Menu   | Open Settings                                    |

Focus moves by on-screen position, so Arabic (right to left) needs no key swapping.

## Demo keys

These work in the dev server, or on any build with `?demo` in the address.

| Key | Action                                                            |
| --- | ----------------------------------------------------------------- |
| N   | Toggle a new message (or mark all read)                           |
| C   | Toggle check-out day                                              |
| P   | Switch the offer layout between the count and the photo spotlight |
| S   | Open or close the review states (Up/Down, Enter to apply)         |
| D   | Show or hide the key legend                                       |

## Structure

The code follows Feature-Sliced Design: `app` (bootstrap and styles), `pages`, `widgets` (home header, greeting, tiles and so on), `features` (demo tools), `entities` (guest, messages, offers, weather, clock), and `shared` (UI kit, i18n, time, remote navigation, config).

## Photo credits

- Afternoon tea, daily activities and sunset boat trip: Unsplash License.
- Heritage site tour: "Photo: Ajman Fort by Ahmed Fouad, CC BY-SA 3.0, via Wikimedia Commons".
