import type { Localized } from '@/shared/i18n';

export type MenuItem = {
  id: string;
  name: Localized;
  prepMinutes: number;
  priceAed: number;
};
