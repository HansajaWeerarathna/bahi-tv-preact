import clsx from 'clsx';
import { offers, spotlightIndex } from '@/entities/offer';

export function OfferProgress() {
  return (
    <span aria-hidden="true" class="ms-auto flex gap-2.5">
      {offers.value.map((offer, index) => (
        <span
          key={offer.id}
          class={clsx(
            'h-1.5 w-9 rounded-[3px] shadow-[0_0_0_1px_rgb(18_14_11/0.35)] transition-colors duration-[240ms]',
            index === spotlightIndex.value ? 'bg-gold' : 'bg-cream/45',
          )}
        />
      ))}
    </span>
  );
}
