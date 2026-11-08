import clsx from 'clsx';
import { offerLayout, offers, spotlightIndex } from '@/entities/offer';
import { backgroundMotion, highContrast } from '@/entities/preferences';
import { assetUrl } from '@/shared/config/base';
import { SpotlightPhoto } from './SpotlightPhoto';
import { MOTION_CLASS } from './motion';

export function HomeBackground() {
  if (highContrast.value) return <div class="absolute inset-0 bg-canvas" />;

  const offer = offers.value[spotlightIndex.value];
  const animated = backgroundMotion.value;

  return (
    <div class="absolute inset-0" aria-hidden="true">
      <img
        src={assetUrl('images/lobby.jpg')}
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchpriority="high"
        class={clsx('absolute inset-0 size-full object-cover', animated && MOTION_CLASS)}
      />
      <div class="absolute inset-0 scrim-lobby" />
      {offerLayout.value === 'spotlight' && offer && (
        <SpotlightPhoto key={offer.id} src={offer.image} animated={animated} />
      )}
    </div>
  );
}
