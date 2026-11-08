import { hotelTime } from '@/entities/clock';
import { weather } from '@/entities/weather';
import type { WeatherCondition } from '@/entities/weather';
import { language, t } from '@/shared/i18n';
import type { TranslationKey } from '@/shared/i18n';
import { CloudIcon, PageLayout, PartlyCloudyIcon, RainIcon, SunIcon } from '@/shared/ui';
import { buildForecast } from './lib/forecast';

// Inline, so the line box leaves the same gap under the icon as before.
const ICON_CLASS = 'inline align-baseline text-cream [&_*]:[vector-effect:non-scaling-stroke]';

const CONDITION_KEYS: Record<WeatherCondition, TranslationKey> = {
  clear: 'weatherPage.condition.clear',
  partlyCloudy: 'weatherPage.condition.partlyCloudy',
  cloudy: 'weatherPage.condition.cloudy',
  rain: 'weatherPage.condition.rain',
};

type ConditionIconProps = {
  condition: WeatherCondition;
  size: number;
  class?: string;
};

function ConditionIcon({ condition, size, class: className }: ConditionIconProps) {
  const classes = `${ICON_CLASS} ${className ?? ''}`;
  if (condition === 'clear') return <SunIcon size={size} class={classes} />;
  if (condition === 'partlyCloudy') return <PartlyCloudyIcon size={size} class={classes} />;
  if (condition === 'cloudy') return <CloudIcon size={size} class={classes} />;
  return <RainIcon size={size} class={classes} />;
}

export function WeatherPage() {
  const current = weather.value;

  if (!current.isAvailable) {
    return (
      <PageLayout title={t('weatherPage.title')}>
        <p class="mt-8 max-w-[1100px] text-body leading-[1.48] text-cream-muted">
          {t('weatherPage.unavailable')}
        </p>
      </PageLayout>
    );
  }

  const locale = language.value === 'ar' ? 'ar-AE' : 'en-GB';
  const days = buildForecast(current, hotelTime.value, locale, t('weatherPage.today'));
  const today = days[0];

  return (
    <PageLayout title={t('weatherPage.title')}>
      <div class="mt-8 flex flex-col gap-6">
        <div class="flex items-center justify-between px-1 pt-2 pb-5">
          <div>
            <div class="font-sans text-hero leading-none font-normal tabular-nums">
              {current.temperatureC}°
            </div>
            <div class="mt-1.5 font-sans text-body leading-[normal]">
              {today ? t(CONDITION_KEYS[today.condition]) : ''}
            </div>
            <div class="mt-1 font-sans text-label leading-[normal] text-cream-muted">
              {today ? t('weatherPage.highLow', { high: today.high, low: today.low }) : ''}
            </div>
          </div>
          {today && (
            <div class="leading-[normal]">
              <ConditionIcon condition={today.condition} size={120} />
            </div>
          )}
        </div>
        <p class="mt-3 mb-3.5 font-sans text-label leading-[normal] font-semibold text-cream-muted">
          {t('weatherPage.forecastTitle')}
        </p>
        <div class="grid grid-cols-5 gap-3">
          {days.map((day) => (
            <div
              key={`${day.label}-${day.date}`}
              class="flex flex-col items-center gap-1.5 border-l border-line px-2 py-4 text-center font-sans first:border-l-0"
            >
              <span class="text-body leading-[normal] font-semibold">{day.label}</span>
              <span class="text-label leading-[normal] text-cream-muted">{day.date}</span>
              <span class="leading-[normal]">
                <ConditionIcon condition={day.condition} size={52} class="my-2" />
              </span>
              <span class="min-h-[58px] text-label leading-[normal]">
                {t(CONDITION_KEYS[day.condition])}
              </span>
              <span class="flex gap-3.5 text-body leading-[normal]">
                <span class="font-semibold">{day.high}°</span>
                <span class="text-cream-muted">{day.low}°</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
