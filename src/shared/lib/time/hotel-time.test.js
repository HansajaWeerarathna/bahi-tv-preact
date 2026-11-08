import { describe, expect, it } from 'vitest';
import { formatClockTime, formatLongDate, toIsoDate, toTimeParts } from './hotel-time';

const DUBAI = 'Asia/Dubai';
const TUESDAY_EVENING_UTC = new Date('2026-11-03T16:41:00Z');

describe('toTimeParts', () => {
  it('reads the time in hotel time, not UTC', () => {
    expect(toTimeParts(TUESDAY_EVENING_UTC, DUBAI)).toEqual({
      year: 2026,
      month: 11,
      day: 3,
      hour: 20,
      minute: 41,
    });
  });
});

describe('formatClockTime', () => {
  const parts = { year: 2026, month: 11, day: 3, hour: 20, minute: 41 };

  it('formats a 12-hour clock with a period', () => {
    const text = formatClockTime(parts, { language: 'en', use12Hour: true });
    expect(text.replace(/\s/g, ' ')).toBe('8:41 PM');
  });

  it('formats a 24-hour clock', () => {
    expect(formatClockTime(parts, { language: 'en', use12Hour: false })).toBe('20:41');
  });
});

describe('formatLongDate', () => {
  it('gives the weekday, day and month in English', () => {
    const parts = { year: 2026, month: 11, day: 3, hour: 20, minute: 41 };
    expect(formatLongDate(parts, 'en')).toBe('Tuesday, 3 November');
  });
});

describe('toIsoDate', () => {
  it('pads the month and day', () => {
    expect(toIsoDate({ year: 2026, month: 3, day: 9 })).toBe('2026-03-09');
  });
});
