import type { Localized } from '@/shared/i18n';

export type Message = {
  id: string;
  sender: Localized;
  time: string;
  isUnread: boolean;
  subject: Localized;
  body: Localized;
};
