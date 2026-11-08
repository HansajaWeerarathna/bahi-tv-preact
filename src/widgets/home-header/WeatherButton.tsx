import clsx from 'clsx';
import { computed } from '@preact/signals';
import { useLocation } from 'preact-iso';
import { hotelTime } from '@/entities/clock';
import { weather } from '@/entities/weather';
import { ROUTES } from '@/shared/config';
import { t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';
import { MoonIcon, SunIcon } from '@/shared/ui';

const NIGHT_START_HOUR = 18;
const NIGHT_END_HOUR = 6;

const isNight = computed(() => {
  const hour = hotelTime.value.hour;
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
});

export function WeatherButton() {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: 'header-weather',
    group: 'header-actions',
    onSelect: () => route(ROUTES.weather),
  });
  const current = weather.value;

  return (
    <button
      type="button"
      {...focusProps}
      aria-label={current.isAvailable ? undefined : t('header.weatherUnavailable')}
      class={clsx(
        'tv-focus -mx-2.5 -my-1 flex items-center gap-2 rounded-sm px-2.5 py-1 text-label leading-[normal] font-medium tabular-nums',
        !current.isAvailable && 'text-cream-muted',
      )}
    >
      {current.isAvailable && (isNight.value ? <MoonIcon size={24} /> : <SunIcon size={24} />)}
      <span>{current.isAvailable ? `${current.temperatureC}°C` : '–'}</span>
    </button>
  );
}
