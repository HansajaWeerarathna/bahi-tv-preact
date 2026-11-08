import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { offerLayout, offers, showNextOffer, spotlightIndex } from '@/entities/offer';
import { ROUTES } from '@/shared/config';
import { isRtl, pickText, t } from '@/shared/i18n';
import { focusedId, setFocus, useFocusable, useRemoteKeyHandler } from '@/shared/remote-navigation';
import { OfferProgress } from './OfferProgress';

const SPOTLIGHT_ID = 'offer-spotlight';
const THINGS_TO_DO_TILE_ID = 'tile-thingsToDo';
const AUTO_ADVANCE_MS = 6500;

function SpotlightContent() {
  const { route } = useLocation();
  const offer = offers.value[spotlightIndex.value];

  const { focusProps } = useFocusable<HTMLButtonElement>({
    id: SPOTLIGHT_ID,
    group: SPOTLIGHT_ID,
    onSelect: () => {
      if (offer) route(ROUTES.offer.replace(':offerId', offer.id));
    },
  });

  useRemoteKeyHandler((action) => {
    if (focusedId.value !== SPOTLIGHT_ID) return false;
    if (action !== 'left' && action !== 'right') return false;
    const isForward = (action === 'right') !== isRtl.value;
    showNextOffer(isForward ? 1 : -1);
    return true;
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!document.hidden && focusedId.value !== SPOTLIGHT_ID) showNextOffer();
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerId);
  }, []);

  useEffect(
    () => () => {
      if (focusedId.value === SPOTLIGHT_ID) setFocus(THINGS_TO_DO_TILE_ID);
    },
    [],
  );

  if (!offer) return null;

  return (
    <div class="mb-12 flex">
      <button
        type="button"
        {...focusProps}
        class="group ms-auto flex w-[852px] flex-col justify-end gap-1.5 text-start outline-none"
      >
        <span key={offer.id} class="flex offer-fade-in flex-col gap-1.5">
          <span class="block font-serif text-heading leading-[1.08]">{pickText(offer.title)}</span>
          <span class="mb-3 block max-w-[1000px] text-caption leading-[1.3]">
            {pickText(offer.tagline)}
          </span>
          <span class="flex items-baseline gap-8 text-caption">
            <span>{pickText(offer.timing)}</span>
            <span>{pickText(offer.location)}</span>
          </span>
          <span class="mt-6 flex items-center gap-8">
            <span class="flex h-[60px] origin-[left_center] items-center rounded-full border-2 border-cream/70 bg-canvas/35 px-9 text-label font-semibold transition group-data-[focused]:scale-[1.06] group-data-[focused]:border-gold group-data-[focused]:bg-gold group-data-[focused]:text-gold-ink rtl:origin-[right_center]">
              {t('offer.seeDetails')}
            </span>
            <span class="text-body font-semibold">{pickText(offer.price)}</span>
            <OfferProgress />
          </span>
        </span>
      </button>
    </div>
  );
}

export function OfferSpotlight() {
  if (offerLayout.value !== 'spotlight') return null;
  return <SpotlightContent />;
}
