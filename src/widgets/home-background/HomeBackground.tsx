import { offerLayout, offers, spotlightIndex } from '@/entities/offer';
import { highContrast } from '@/entities/preferences';
import { SpotlightPhoto } from './SpotlightPhoto';

export function HomeBackground() {
  if (highContrast.value) return <div class="absolute inset-0 bg-canvas" />;

  const offer = offers.value[spotlightIndex.value];

  return (
    <div class="absolute inset-0" aria-hidden="true">
      <img
        src="/images/lobby.jpg"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchpriority="high"
        class="absolute inset-0 size-full object-cover"
      />
      <div class="scrim-lobby absolute inset-0" />
      {offerLayout.value === 'spotlight' && offer && <SpotlightPhoto key={offer.id} src={offer.image} />}
    </div>
  );
}
