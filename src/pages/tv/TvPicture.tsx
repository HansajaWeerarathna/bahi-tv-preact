import clsx from 'clsx';
import type { Channel } from '@/entities/channel';
import { pickText, t } from '@/shared/i18n';

const PICTURE_BACKGROUNDS = [
  'radial-gradient(120% 90% at 30% 30%, #3a2c22 0%, #120e0b 70%)',
  'radial-gradient(120% 90% at 70% 30%, #22303a 0%, #0b0e12 70%)',
  'radial-gradient(120% 90% at 50% 20%, #24352a 0%, #0b120d 70%)',
  'radial-gradient(120% 90% at 40% 60%, #2b3a3a 0%, #0b1212 70%)',
  'radial-gradient(120% 90% at 60% 40%, #3a2222 0%, #120b0b 70%)',
] as const;

type TvPictureProps = {
  index: number;
  channel: Channel;
  isHidden: boolean;
};

export function TvPicture({ index, channel, isHidden }: TvPictureProps) {
  const background = PICTURE_BACKGROUNDS[index % PICTURE_BACKGROUNDS.length];

  return (
    <div
      class={clsx(
        'absolute inset-0 flex flex-col items-center justify-center gap-6',
        isHidden && 'opacity-0',
      )}
      style={{ background }}
    >
      {channel.isApp ? (
        <p class="text-label text-cream/35">
          {t('tv.appOpens', { name: channel.name, now: pickText(channel.now) })}
        </p>
      ) : (
        <>
          <span class="text-[220px] leading-[220px] text-cream/10 tabular-nums">
            {channel.number}
          </span>
          <p class="text-label text-cream/35">{t('tv.placeholder')}</p>
        </>
      )}
    </div>
  );
}
