import { signal } from '@preact/signals';
import type { Weather } from './types';

export const weather = signal<Weather>({
  isAvailable: true,
  temperatureC: 24,
  condition: 'partlyCloudy',
  summary: { en: 'Warm evening breeze', ar: 'نسيم مسائي دافئ' },
  humidity: '68%',
  wind: '12 km/h',
  highC: 29,
  lowC: 24,
});
