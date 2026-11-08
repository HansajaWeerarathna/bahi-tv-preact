import { signal } from '@preact/signals';
import { OFFERS } from './model';
import type { OfferLayout } from './types';

export const offerLayout = signal<OfferLayout>('count');
export const spotlightIndex = signal(0);

export function showNextOffer(step = 1): void {
  spotlightIndex.value = (spotlightIndex.value + step + OFFERS.length) % OFFERS.length;
}

export function toggleOfferLayout(): void {
  offerLayout.value = offerLayout.value === 'count' ? 'spotlight' : 'count';
}
