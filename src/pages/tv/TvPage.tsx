import { useEffect, useRef, useState } from 'preact/hooks';
import { CHANNELS, watchingIndex } from '@/entities/channel';
import { hotelTime } from '@/entities/clock';
import { use12Hour } from '@/entities/preferences';
import { t } from '@/shared/i18n';
import { useRemoteKeyHandler } from '@/shared/remote-navigation';
import { showToast } from '@/shared/ui';
import { TvBanner } from './TvBanner';
import { TvGuide } from './TvGuide';
import { TvPicture } from './TvPicture';
import { getProgramSlot } from './lib/tv-time';

const BANNER_MS = 5000;
const NUMBER_TUNE_MS = 900;
const NO_CHANNEL_TOAST_MS = 1600;
const CHANNEL_COUNT = CHANNELS.length;

function wrapChannel(index: number): number {
  return ((index % CHANNEL_COUNT) + CHANNEL_COUNT) % CHANNEL_COUNT;
}

export function TvPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideIndex, setGuideIndex] = useState(watchingIndex.value);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const bannerTimer = useRef<number | undefined>(undefined);
  const numberBuffer = useRef('');
  const numberTimer = useRef<number | undefined>(undefined);

  function showBanner() {
    setIsBannerVisible(true);
    window.clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => setIsBannerVisible(false), BANNER_MS);
  }

  function tune(index: number) {
    watchingIndex.value = wrapChannel(index);
    showBanner();
  }

  function tuneByDigit(digit: string) {
    numberBuffer.current = (numberBuffer.current + digit).slice(-2);
    window.clearTimeout(numberTimer.current);
    numberTimer.current = window.setTimeout(() => {
      const wanted = Number(numberBuffer.current);
      numberBuffer.current = '';
      const index = CHANNELS.findIndex((channel) => Number(channel.number) === wanted);
      if (index >= 0) tune(index);
      else showToast(t('tv.noChannel', { number: wanted }), NO_CHANNEL_TOAST_MS);
    }, NUMBER_TUNE_MS);
  }

  useEffect(() => {
    showBanner();
    return () => {
      window.clearTimeout(bannerTimer.current);
      window.clearTimeout(numberTimer.current);
    };
  }, []);

  useRemoteKeyHandler((action, event) => {
    if (isGuideOpen) {
      if (action === 'up') setGuideIndex((index) => Math.max(0, index - 1));
      else if (action === 'down') setGuideIndex((index) => Math.min(CHANNEL_COUNT - 1, index + 1));
      else if (action === 'select') {
        setIsGuideOpen(false);
        tune(guideIndex);
      } else if (action === 'back') setIsGuideOpen(false);
      return true;
    }

    if (action === 'up') tune(watchingIndex.value + 1);
    else if (action === 'down') tune(watchingIndex.value - 1);
    else if (action === 'left' || action === 'right') showBanner();
    else if (action === 'select') {
      window.clearTimeout(bannerTimer.current);
      setIsBannerVisible(false);
      setGuideIndex(watchingIndex.value);
      setIsGuideOpen(true);
    } else if (action === 'digit') tuneByDigit(event.key);
    else return false;
    return true;
  });

  const channel = CHANNELS[watchingIndex.value];
  if (!channel) return null;
  const slot = getProgramSlot(hotelTime.value);

  return (
    <main class="absolute inset-0 overflow-hidden bg-black">
      <TvPicture index={watchingIndex.value} channel={channel} isHidden={isGuideOpen} />
      {!isGuideOpen && (
        <TvBanner
          channel={channel}
          slot={slot}
          isVisible={isBannerVisible}
          use12Hour={use12Hour.value}
        />
      )}
      {isGuideOpen && (
        <TvGuide
          focusedIndex={guideIndex}
          watchingIndex={watchingIndex.value}
          slot={slot}
          use12Hour={use12Hour.value}
        />
      )}
    </main>
  );
}
