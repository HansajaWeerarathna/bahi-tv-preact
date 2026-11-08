import type { Localized } from '@/shared/i18n';

export type Offer = {
  id: string;
  title: Localized;
  category: Localized;
  tagline: Localized;
  description: Localized;
  timing: Localized;
  location: Localized;
  price: Localized;
};
