import clsx from 'clsx';
import type { Channel } from '@/entities/channel';
import { subtitles } from '@/entities/preferences';
import { pickText, t } from '@/shared/i18n';
import type { ProgramSlot } from './lib/tv-time';
import { formatTvHour } from './lib/tv-time';

type TvBannerProps = {
  channel: Channel;
  slot: ProgramSlot;
  isVisible: boolean;
  use12Hour: boolean;
};

export function TvBanner({ channel, slot, isVisible, use12Hour }: TvBannerProps) {
  const timeLabel = `${formatTvHour(slot.start, use12Hour)} ${t('tv.to')} ${formatTvHour(slot.end, use12Hour)}`;

  return (
    <div
      class={clsx(
        'absolute inset-x-0 bottom-0 flex flex-col gap-2.5 scrim-tv-banner px-24 pt-16 pb-[54px] leading-[normal] transition-[opacity,transform] duration-[240ms] ease-tv',
        isVisible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <div class="flex items-baseline gap-6">
        <span class="text-heading leading-[normal] font-semibold text-gold tabular-nums">
          {channel.number}
        </span>
        <span class="text-title leading-[normal] font-semibold">{channel.name}</span>
        {!channel.isApp && subtitles.value && (
          <span class="rounded-sm border border-line-strong px-2.5 py-0.5 text-caption leading-[normal] text-cream-muted">
            {t('tv.subtitles')}
          </span>
        )}
      </div>
      {channel.isApp ? (
        <p class="text-body leading-[normal] text-cream-muted">{pickText(channel.category)}</p>
      ) : (
        <>
          <div class="flex items-baseline gap-8 text-body leading-[normal]">
            <span class="font-semibold">{pickText(channel.now)}</span>
            <span class="text-label leading-[normal] text-cream-muted tabular-nums">
              {timeLabel}
            </span>
          </div>
          <div class="h-1.5 w-[720px] max-w-full overflow-hidden rounded-[3px] bg-cream/20">
            <span class="block h-full bg-cream" style={{ width: `${slot.progress}%` }} />
          </div>
          {channel.next && (
            <div class="flex items-baseline gap-6 text-label leading-[normal] text-cream-muted">
              <span class="text-cream-subtle">{t('tv.next')}</span>
              <span>{pickText(channel.next)}</span>
              <span class="tabular-nums">{formatTvHour(slot.end, use12Hour)}</span>
            </div>
          )}
        </>
      )}
      <div class="mt-4 flex gap-12 text-caption leading-[normal] text-cream-subtle">
        <span>{t('tv.keyChannel')}</span>
        <span>{t('tv.keyGuide')}</span>
        <span>{t('tv.keyHome')}</span>
      </div>
    </div>
  );
}
