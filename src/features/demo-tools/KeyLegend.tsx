const LEGEND_ROWS: readonly { keys: string; effect: string }[] = [
  { keys: 'Arrow keys', effect: 'D-pad: move focus' },
  { keys: 'Enter', effect: 'OK: select' },
  { keys: 'Escape, Backspace', effect: 'Back' },
  { keys: 'H', effect: 'Home' },
  { keys: 'M', effect: 'Menu (Settings)' },
  { keys: '0 to 9', effect: 'TV: tune a channel' },
  { keys: 'N', effect: 'New message on or off' },
  { keys: 'C', effect: 'Check-out day on or off' },
  { keys: 'P', effect: 'Offer layout' },
  { keys: 'S', effect: 'Review states' },
  { keys: '+ and -', effect: 'Volume up or down' },
  { keys: 'D', effect: 'This legend' },
];

export function KeyLegend() {
  return (
    <div class="absolute start-24 top-[54px] z-50 w-[720px] rounded-md border-2 border-gold bg-surface-1 px-7 py-6">
      <p class="text-label font-semibold">Demo keys (press D to close)</p>
      <table class="mt-4 w-full text-caption">
        <tbody>
          {LEGEND_ROWS.map((row) => (
            <tr key={row.keys}>
              <td class="py-1 pe-6">
                <kbd class="rounded-sm bg-surface-3 px-2">{row.keys}</kbd>
              </td>
              <td class="py-1 text-cream-muted">{row.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
