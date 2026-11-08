export type KeyAction =
  | { kind: 'char'; value: string }
  | { kind: 'space' }
  | { kind: 'delete' }
  | { kind: 'clear' }
  | { kind: 'go' };

export type SearchKeyDef = {
  label: string;
  // Width in standard key units (one unit is one letter key).
  width: number;
  action: KeyAction;
};

const char = (value: string): SearchKeyDef => ({
  label: value,
  width: 1,
  action: { kind: 'char', value },
});

// Standard TV keyboard: digits, QWERTY, ASDF, ZXCV, then Space, Clear and Search.
export const SEARCH_KEY_ROWS: readonly (readonly SearchKeyDef[])[] = [
  [...'1234567890'].map(char),
  [...'QWERTYUIOP'].map(char),
  [...'ASDFGHJKL'].map(char),
  [...[...'ZXCVBNM'].map(char), { label: 'Delete', width: 1.5, action: { kind: 'delete' } }],
  [
    { label: 'Space', width: 4.5, action: { kind: 'space' } },
    { label: 'Clear', width: 2, action: { kind: 'clear' } },
    { label: 'Search', width: 2.5, action: { kind: 'go' } },
  ],
];

// Key width in pixels: one unit is 96 px less the 12 px gap.
export function keyWidthPx(units: number): number {
  return units * 96 - 12;
}

export const SEARCH_MAX_QUERY = 24;
