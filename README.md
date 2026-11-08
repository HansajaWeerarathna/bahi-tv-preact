# Bahi TV

An in-room TV app for Bahi Ajman Palace Hotel. A guest uses the TV remote to call the front desk, order food, request housekeeping, watch TV, book experiences, set an alarm and control the room, in English or Arabic.

|                                                       |                                                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Guest view**                                        | https://hansajaweerarathna.github.io/bahi-tv-preact/                                          |
| **Demo view**, with extra keys for showing each state | https://hansajaweerarathna.github.io/bahi-tv-preact/?demo                                     |
| **Design**                                            | [Figma file](https://www.figma.com/design/gV7jxln7zVVz6DtArLNM81/Bahi-TV-Screens?node-id=0-1) |

![Moving around the home screen with the remote](docs/screenshots/flows/home-navigation.gif)

|                                   |                                                    |
| --------------------------------- | -------------------------------------------------- |
| JavaScript at start-up            | 35.35 KB gzipped                                   |
| CSS at start-up                   | 7.12 KB gzipped                                    |
| Focus move with the CPU slowed 6× | 44 ms median                                       |
| Random remote key presses         | 2600 presses, 0 errors                             |
| Unit tests                        | 75 passing                                         |
| Languages                         | English, and Arabic with the whole layout mirrored |
| Routes                            | 24, each loaded the first time it's opened         |
| TypeScript                        | Strict, with no `any` and no `@ts-ignore`          |

## Try it

Open either link and use a keyboard as the remote. Both are the same production build. The demo view only adds the extra keys below.

| Keyboard            | TV remote | Action                        |
| ------------------- | --------- | ----------------------------- |
| Arrow keys          | D-pad     | Move focus                    |
| Enter               | OK        | Select                        |
| Escape or Backspace | Back      | Go back                       |
| H or Home           | Home      | Home screen                   |
| M                   | Menu      | Settings                      |
| + and -             | Volume    | Change the volume             |
| 0 to 9              | Numbers   | Tune a channel on the TV page |

| Demo key | Shows                                 |
| -------- | ------------------------------------- |
| P        | Promotional offers on the home screen |
| N        | A new message                         |
| C        | Check-out day                         |
| S        | A list of eleven screen states        |
| D        | The key legend                        |

## User flows

### Promotional offers

When the hotel has offers to promote, they take over the home screen background. The carousel moves on by itself and pauses while the guest is on it.

![Promotional offers on the home screen](docs/screenshots/flows/promotional-offers.gif)

<details>
<summary><strong>Order food</strong>: choose a dish and quantity, review, place the order</summary>

![Ordering food](docs/screenshots/flows/order-food.gif)

</details>

<details>
<summary><strong>Request housekeeping</strong>: extra towels sent to the room</summary>

![Sending a guest request](docs/screenshots/flows/guest-request.gif)

</details>

<details>
<summary><strong>Set an alarm</strong>: time, days, save</summary>

![Setting an alarm](docs/screenshots/flows/alarm.gif)

</details>

<details>
<summary><strong>Search</strong>: on-screen keyboard to result</summary>

![Searching with the on-screen keyboard](docs/screenshots/flows/search.gif)

</details>

<details>
<summary><strong>Things to do</strong>: browse offers and open the booking code</summary>

![Browsing things to do](docs/screenshots/flows/things-to-do.gif)

</details>

<details>
<summary><strong>Watch TV</strong>: change channel and open the guide</summary>

![Watching TV](docs/screenshots/flows/tv.gif)

</details>

<details>
<summary><strong>Room controls</strong>: lights and temperature</summary>

![Using room controls](docs/screenshots/flows/room-controls.gif)

</details>

<details>
<summary><strong>Messages</strong>: a new message appears on the home screen</summary>

![Opening a new message](docs/screenshots/flows/live-notices.gif)

</details>

<details>
<summary><strong>Late check-out</strong>: from the check-out day notice</summary>

![Requesting late check-out](docs/screenshots/flows/check-out.gif)

</details>

<details>
<summary><strong>Front desk and emergency</strong>: a call-back, and an emergency that asks for confirmation</summary>

![Front desk and emergency](docs/screenshots/flows/front-desk-emergency.gif)

</details>

<details>
<summary><strong>Your stay and weather</strong></summary>

![Your stay and the weather](docs/screenshots/flows/stay-and-weather.gif)

</details>

<details>
<summary><strong>Arabic</strong>: the same remote keys on a mirrored layout</summary>

![Arabic layout](docs/screenshots/flows/arabic-layout.gif)

</details>

<details>
<summary><strong>Comfort settings</strong>: high contrast and larger text</summary>

![High contrast and larger text](docs/screenshots/flows/comfort-settings.gif)

</details>

## Screen states

The home screen adapts to who is in the room, the time and what the hotel's systems return.

|                                                                                             |                                                                              |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ![Morning greeting](docs/screenshots/states/morning.jpg) Morning                            | ![Anniversary guest](docs/screenshots/states/anniversary.jpg) Guest occasion |
| ![Unread messages](docs/screenshots/states/unread-messages.jpg) Unread messages             | ![Check-out day](docs/screenshots/states/check-out-day.jpg) Check-out day    |
| ![Weather unavailable](docs/screenshots/states/weather-unavailable.jpg) Weather unavailable | ![Between guests](docs/screenshots/states/between-guests.jpg) Between guests |
| ![High contrast](docs/screenshots/states/high-contrast.jpg) High contrast                   | ![Larger text](docs/screenshots/states/larger-text.jpg) Larger text          |

## Decisions

- **Focus moves by position on screen**, using each item's real rectangle, not a fixed list of neighbours. Arabic mirrors the layout, so the remote needs no key swap, and a new page needs no navigation code. The search is a pure function with unit tests.
- **Focus can't get lost.** If the focused item disappears, focus moves to the last content item the guest was on.
- **Home remembers where you were.** Back and Home return to the item you opened.
- **One fixed 1920×1080 canvas**, scaled with a single transform, so the layout is identical on every TV size.
- **Colours and sizes are design tokens** in Tailwind's `@theme`. High contrast and larger text change the tokens rather than adding separate styles.
- **Hotel time** (Asia/Dubai) drives the clock and greeting, so a TV with the wrong clock still greets the guest correctly.
- **Guest details stay in memory.** Nothing is saved to the browser, so nothing is left behind for the next guest.

## Built for TV hardware

A hotel TV has a slow processor and little memory, so performance shaped the build.

- **Preact and Signals.** The same component model as React with a much smaller runtime. Signals update only what reads a value: each minute the clock changes its own text directly, and only the greeting and notice re-render.
- **Only the home screen loads at start-up.** Every other page loads when it's first opened, and the QR library only when a code is shown.
- **Tiles don't animate their focus ring.** Moving focus only transitions transform and colours, because animating `box-shadow` is expensive on a TV.
- **Held arrow keys are limited** to one move every 120 ms, so focus never falls behind the remote.
- **Every timer and listener is cleaned up** when its screen closes, because a TV app can run for days.

Sizes are measured by gzipping every file `dist/index.html` loads, with Node's zlib. Focus speed is measured on the production build with Chrome's CPU slowed 6×, from the key press to the next painted frame.

## How the code is organised

Feature-Sliced Design. Each layer imports only from the layers below it.

```
src/
  app/        startup, routes, global styles
  pages/      one folder per screen
  widgets/    large page regions (header, tiles, background)
  features/   user actions (alarms, order food, demo tools, volume)
  entities/   data and signals (guest, offers, weather, alarms)
  shared/     UI parts, remote navigation, i18n, time helpers
```

Stack: Preact, Preact Signals, preact-iso, Tailwind CSS v4, Vite, strict TypeScript, Vitest.

## Run it

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

## Change it

- **Brand colour:** `--color-gold` in `src/app/styles/theme.css`
- **Hotel name:** `hotel.name` and `hotel.footerName` in `src/shared/i18n/locales/en/a.ts` and `ar/a.ts`
- **Switch a tile off:** `enabled: false` in `src/widgets/service-tiles/tiles.ts`. The layout and navigation adjust on their own.

## Next steps

- Test on the hotel's TV models and map their remote keys. Tizen and webOS send their own codes for some buttons, and so far it has run in desktop Chrome only.
- Connect guest details, messages and weather to the hotel's systems. They are sample data today.
- Package it for Tizen or webOS if the hotel doesn't serve it from a web server. Those apps run from `file://` and need hash or in-memory routing.
- It targets Chromium 111 or newer, which Tailwind CSS v4 requires. Older TV browsers would need a different CSS build.

## Credits

- **Fonts:** Alexandria and Noto Naskh Arabic, SIL Open Font License. Licence files are in `public/fonts/`.
- **Icons:** outline icons from an older Lucide release, ISC licence. They are copied into the project as path data.
- **Offer photos:** afternoon tea, daily activities and sunset boat trip are under the Unsplash License.
- **Heritage tour photo:** "Photo: Ajman Fort by Ahmed Fouad, CC BY-SA 3.0, via Wikimedia Commons".
- The hotel name and logo belong to Bahi Ajman Palace Hotel.
