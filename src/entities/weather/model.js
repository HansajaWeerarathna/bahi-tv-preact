import { signal } from '@preact/signals';

export const weather = signal({
  isAvailable: true,
  temperatureC: 24,
  condition: 'partlyCloudy',
  summary: { en: 'Warm evening breeze', ar: 'نسيم مسائي دافئ' },
  humidity: '68%',
  wind: '12 km/h',
  highC: 29,
  lowC: 24,
});
