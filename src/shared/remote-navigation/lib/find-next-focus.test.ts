import { describe, expect, it } from 'vitest';
import type { FocusCandidate } from '../types';
import { findNextFocus } from './find-next-focus';

function item(
  id: string,
  group: string,
  left: number,
  top: number,
  width: number,
  height: number,
): FocusCandidate {
  return { id, group, rect: { left, top, right: left + width, bottom: top + height } };
}

const PRIMARY_TOP = 740;
const PRIMARY_HEIGHT = 188;
const PRIMARY_WIDTH = 414;
const PRIMARY_GAP = 24;
const COMPACT_TOP = 944;
const COMPACT_HEIGHT = 88;
const COMPACT_WIDTH = 274;
const COMPACT_GAP = 16;

const primaryTiles = ['frontDesk', 'tv', 'roomService', 'thingsToDo'].map((name, index) =>
  item(
    name,
    'primary-tiles',
    96 + index * (PRIMARY_WIDTH + PRIMARY_GAP),
    PRIMARY_TOP,
    PRIMARY_WIDTH,
    PRIMARY_HEIGHT,
  ),
);

const compactTiles = ['messages', 'wifi', 'cast', 'alarm', 'stay', 'roomControls'].map(
  (name, index) =>
    item(
      name,
      'compact-tiles',
      96 + index * (COMPACT_WIDTH + COMPACT_GAP),
      COMPACT_TOP,
      COMPACT_WIDTH,
      COMPACT_HEIGHT,
    ),
);

const headerButtons = [
  item('weather', 'header', 1420, 60, 180, 40),
  item('phone', 'header', 1400, 150, 68, 60),
  item('settings', 'header', 1480, 150, 68, 60),
  item('search', 'header', 1560, 150, 68, 60),
];

const notice = item('notice', 'notice', 96, 644, 1728, 72);

const layoutWithoutNotice = [...primaryTiles, ...compactTiles, ...headerButtons];
const layoutWithNotice = [...layoutWithoutNotice, notice];

function moveFrom(
  id: string,
  direction: Parameters<typeof findNextFocus>[0],
  layout: readonly FocusCandidate[],
): string | null {
  const from = layout.find((candidate) => candidate.id === id);
  if (!from) throw new Error(`No item called ${id} in the layout`);
  const others = layout.filter((candidate) => candidate.id !== id);
  return findNextFocus(direction, from, others)?.id ?? null;
}

describe('findNextFocus on the home layout', () => {
  it('moves right from Front desk to TV', () => {
    expect(moveFrom('frontDesk', 'right', layoutWithoutNotice)).toBe('tv');
  });

  it('stays put at the right edge, with no wrap', () => {
    expect(moveFrom('thingsToDo', 'right', layoutWithoutNotice)).toBeNull();
  });

  it('moves down from Front desk to Messages', () => {
    expect(moveFrom('frontDesk', 'down', layoutWithoutNotice)).toBe('messages');
  });

  it('moves up from Room controls to Things to do', () => {
    expect(moveFrom('roomControls', 'up', layoutWithoutNotice)).toBe('thingsToDo');
  });

  it('moves up from a primary tile into a header button when there is no notice', () => {
    const headerIds = ['weather', 'phone', 'settings', 'search'];
    expect(headerIds).toContain(moveFrom('frontDesk', 'up', layoutWithoutNotice));
  });

  it('moves up from a primary tile to the notice when one is shown', () => {
    expect(moveFrom('tv', 'up', layoutWithNotice)).toBe('notice');
  });

  it('moves down from the notice onto a primary tile', () => {
    const tileIds = primaryTiles.map((tile) => tile.id);
    expect(tileIds).toContain(moveFrom('notice', 'down', layoutWithNotice));
  });

  it('moves up from a header button to the weather button', () => {
    expect(moveFrom('phone', 'up', layoutWithoutNotice)).toBe('weather');
  });

  it('moves down from the weather button to the header button below it', () => {
    expect(moveFrom('weather', 'down', layoutWithoutNotice)).toBe('settings');
  });

  it('moves down from a header button to Things to do', () => {
    expect(moveFrom('phone', 'down', layoutWithoutNotice)).toBe('thingsToDo');
  });

  it('returns null when nothing lies in that direction', () => {
    expect(moveFrom('frontDesk', 'left', layoutWithoutNotice)).toBeNull();
  });

  it('skips a tile that is switched off', () => {
    const layout = layoutWithoutNotice.filter((candidate) => candidate.id !== 'tv');
    expect(moveFrom('frontDesk', 'right', layout)).toBe('roomService');
  });
});
