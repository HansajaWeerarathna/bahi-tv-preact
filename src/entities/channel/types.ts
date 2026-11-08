import type { Localized } from '@/shared/i18n';

export type Channel = {
  number: string;
  name: string;
  category: Localized;
  now: Localized;
  next?: Localized;
  isApp?: boolean;
};
