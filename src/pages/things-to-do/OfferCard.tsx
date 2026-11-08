import { useLocation } from 'preact-iso';
import type { Offer } from '@/entities/offer';
import { ROUTES } from '@/shared/config';
import { isRtl, pickText } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: `offer-${offer.id}`,
    group: 'offer-cards',
    onSelect: () => route(ROUTES.offer.replace(':offerId', offer.id)),
  });
  const separator = isRtl.value ? '،' : ',';

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex items-center gap-5 rounded-sm px-6 py-5 text-start"
    >
      <span class="h-24 w-36 shrink-0 overflow-hidden rounded-sm">
        <img
          src={offer.image}
          alt=""
          width={800}
          height={533}
          decoding="async"
          class="size-full object-cover"
        />
      </span>
      <span class="flex min-w-0 flex-1 flex-col">
        <span class="text-body leading-[33px] font-semibold">{pickText(offer.title)}</span>
        <span class="mt-1 text-caption leading-[normal] text-cream-muted">
          {`${pickText(offer.timing)}${separator} ${pickText(offer.location)}`}
        </span>
        <span class="mt-1.5 text-caption leading-[normal] font-semibold">
          {pickText(offer.price)}
        </span>
      </span>
    </button>
  );
}
