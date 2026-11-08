import { describe, expect, it } from 'vitest';
import { formatTvHour, getProgramSlot } from './tv-time';

describe('formatTvHour', () => {
  it('shows a 12-hour clock with AM or PM', () => {
    expect(formatTvHour(20, true)).toBe('8:00 PM');
    expect(formatTvHour(0, true)).toBe('12:00 AM');
    expect(formatTvHour(12, true)).toBe('12:00 PM');
  });

  it('shows a 24-hour clock with a leading zero', () => {
    expect(formatTvHour(9, false)).toBe('09:00');
  });

  it('wraps the hour after 23:00 to the start of the day', () => {
    expect(formatTvHour(24, true)).toBe('12:00 AM');
  });
});

describe('getProgramSlot', () => {
  it('runs each programme for one hour from the current hour', () => {
    expect(getProgramSlot({ year: 2026, month: 11, day: 3, hour: 20, minute: 41 })).toEqual({
      start: 20,
      end: 21,
      progress: 68,
    });
  });

  it('ends the last programme of the day at midnight', () => {
    expect(getProgramSlot({ year: 2026, month: 11, day: 3, hour: 23, minute: 0 }).end).toBe(0);
  });
});
