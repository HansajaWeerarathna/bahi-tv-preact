import type { Localized } from '@/shared/i18n';

export type WeatherCondition = 'clear' | 'partlyCloudy' | 'cloudy' | 'rain';

export type Weather = {
  isAvailable: boolean;
  temperatureC: number;
  condition: WeatherCondition;
  summary: Localized;
  humidity: string;
  wind: string;
  highC: number;
  lowC: number;
};
