import type { Localized } from '@/shared/i18n';

export type HomeNotice =
  | { kind: 'messages'; textKey: 'notice.oneMessage'; sender: Localized }
  | { kind: 'messages'; textKey: 'notice.manyMessages'; count: number }
  | {
      kind: 'checkOut';
      textKey: 'notice.checkOutToday' | 'notice.lateCheckOutConfirmed';
      time: string;
    };
