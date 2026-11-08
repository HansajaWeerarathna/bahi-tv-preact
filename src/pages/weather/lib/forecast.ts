import type { Weather, WeatherCondition } from '@/entities/weather';
import type { TimeParts } from '@/shared/lib/time';

export type ForecastDay = {
  label: string;
  date: string;
  condition: WeatherCondition;
  high: number;
  low: number;
};

type Reading = {
  condition: WeatherCondition;
  high: number;
  low: number;
};

// Sample days after today, as in the original. Replace with a real forecast before launch.
const SAMPLE_NEXT_DAYS: Reading[] = [
  { condition: 'clear', high: 27, low: 20 },
  { condition: 'cloudy', high: 25, low: 19 },
  { condition: 'rain', high: 23, low: 18 },
  { condition: 'clear', high: 26, low: 20 },
];

// Today comes from the current reading; the next four days come from the sample.
export function buildForecast(
  now: Weather,
  today: Pick<TimeParts, 'year' | 'month' | 'day'>,
  locale: string,
  todayLabel: string,
): ForecastDay[] {
  const start = new Date(today.year, today.month - 1, today.day, 12);
  const readings: Reading[] = [
    { condition: now.condition, high: now.highC, low: now.lowC },
    ...SAMPLE_NEXT_DAYS,
  ];
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' });

  return readings.map((reading, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      label: index === 0 ? todayLabel : weekday.format(date),
      date: `${date.getDate()} ${monthName.format(date)}`,
      condition: reading.condition,
      high: reading.high,
      low: reading.low,
    };
  });
}
