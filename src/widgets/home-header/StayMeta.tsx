import { computed } from '@preact/signals';
import { guest } from '@/entities/guest';
import { hotelTime } from '@/entities/clock';
import { use12Hour } from '@/entities/preferences';
import { formatClockTime, formatLongDate } from '@/shared/lib/time';
import { language, t } from '@/shared/i18n';
import { WeatherButton } from './WeatherButton';

const clockText = computed(() =>
  formatClockTime(hotelTime.value, { language: language.value, use12Hour: use12Hour.value }),
);
const dateText = computed(() => formatLongDate(hotelTime.value, language.value));
const roomText = computed(() => t('header.room', { number: guest.value.roomNumber }));

export function StayMeta() {
  return (
    <div class="grid grid-cols-[auto_auto] items-center gap-x-7 gap-y-1">
      <div class="col-start-1 row-start-1 flex items-center justify-start gap-4">
        <span class="text-label leading-none tabular-nums">{roomText}</span>
        <WeatherButton />
      </div>
      <span class="col-start-1 row-start-2 text-start text-label leading-none font-medium text-cream-muted tabular-nums">
        {dateText}
      </span>
      <span class="col-start-2 row-span-2 row-start-1 text-heading leading-none font-semibold tabular-nums opacity-85">
        {clockText}
      </span>
    </div>
  );
}
