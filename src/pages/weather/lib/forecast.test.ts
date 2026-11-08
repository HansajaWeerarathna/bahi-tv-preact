import { describe, expect, it } from 'vitest';
import { DEFAULT_WEATHER } from '@/entities/weather';
import { buildForecast } from './forecast';

describe('buildForecast', () => {
  const days = buildForecast(DEFAULT_WEATHER, { year: 2026, month: 11, day: 8 }, 'en-GB', 'Today');

  it('gives five days, starting with today', () => {
    expect(days).toHaveLength(5);
    expect(days[0]?.label).toBe('Today');
  });

  it('uses the current reading for today', () => {
    expect(days[0]).toMatchObject({
      condition: DEFAULT_WEATHER.condition,
      high: DEFAULT_WEATHER.highC,
      low: DEFAULT_WEATHER.lowC,
    });
  });

  it('labels the following days with their weekday and the date as day and month', () => {
    expect(days[1]?.label).toBe('Mon');
    expect(days[1]?.date).toBe('9 November');
  });
});
