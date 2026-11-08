import type { Language, Localized } from '@/shared/i18n';

export type Offer = {
  id: string;
  title: Localized;
  category: Localized;
  tagline: Localized;
  description: Localized;
  timing: Localized;
  location: Localized;
  price: Localized;
  duration: Localized;
  includes: Record<Language, string[]>;
  image: string;
  photoCredit?: string;
};

export type OfferLayout = 'count' | 'spotlight';
