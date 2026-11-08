import clsx from 'clsx';
import { CHANNELS } from '@/entities/channel';
import { pickText, t } from '@/shared/i18n';
import type { ProgramSlot } from './lib/tv-time';
import { formatTvHour } from './lib/tv-time';

type TvGuideProps = {
  focusedIndex: number;
  watchingIndex: number;
  slot: ProgramSlot;
  use12Hour: boolean;
};

export function TvGuide({ focusedIndex, watchingIndex, slot, use12Hour }: TvGuideProps) {
  const from = formatTvHour(slot.start, use12Hour);
  const to = formatTvHour(slot.end, use12Hour);

  return (
    <div class="absolute inset-y-0 start-0 flex w-[900px] flex-col gap-4 bg-[linear-gradient(90deg,rgb(14_11_8/0.97)_0%,rgb(14_11_8/0.94)_80%,rgb(14_11_8/0.8)_100%)] ps-24 pe-12 pt-[54px] pb-[54px] rtl:bg-[linear-gradient(270deg,rgb(14_11_8/0.97)_0%,rgb(14_11_8/0.94)_80%,rgb(14_11_8/0.8)_100%)]">
      <h2 class="font-serif text-display leading-[1.7]">{t('tv.guide')}</h2>
      <p class="mb-6 text-label leading-[normal] text-cream-muted">
        {t('tv.guideFrom', { start: from, end: to })}
      </p>
      <div class="flex flex-col">
        {CHANNELS.map((channel, index) => (
          <div
            key={channel.number}
            class={clsx(
              'flex min-h-24 items-center gap-6 rounded-sm border-b border-line px-6',
              index === focusedIndex && 'border-b-transparent bg-surface-2 ring-4 ring-gold',
            )}
          >
            <span class="min-w-14 text-body leading-[normal] text-cream-muted tabular-nums">
              {channel.number}
            </span>
            <span class="flex min-w-0 flex-col gap-0.5">
              <span class="text-body leading-[normal] font-semibold">{channel.name}</span>
              <span class="truncate text-label leading-[normal] whitespace-nowrap text-cream-muted">
                {channel.isApp ? pickText(channel.category) : pickText(channel.now)}
              </span>
            </span>
            {index === watchingIndex && (
              <span class="ms-auto text-caption leading-[normal] font-semibold text-gold">
                {t('tv.watching')}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
