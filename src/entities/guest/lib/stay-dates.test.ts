import { describe, expect, it } from 'vitest';
import { countNights, formatStayDate } from './stay-dates';

describe('countNights', () => {
  it('counts the nights between check-in and check-out', () => {
    expect(countNights('2026-11-01', '2026-11-05')).toBe(4);
  });

  it('is zero for the same day and never negative', () => {
    expect(countNights('2026-11-05', '2026-11-05')).toBe(0);
    expect(countNights('2026-11-05', '2026-11-01')).toBe(0);
  });
});

describe('formatStayDate', () => {
  it('formats an ISO date as day, short month and year', () => {
    expect(formatStayDate('2026-11-01')).toBe('1 Nov 2026');
  });
});
