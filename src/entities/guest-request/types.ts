import type { Localized } from '@/shared/i18n';

export type GuestRequest = {
  id: string;
  title: Localized;
  detail: Localized;
  maxQty: number;
  etaMin: number;
};
