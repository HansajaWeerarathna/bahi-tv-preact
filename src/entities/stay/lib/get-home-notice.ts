import type { Localized } from '@/shared/i18n';
import type { HomeNotice } from '../types';

type HomeNoticeInput = {
  unreadMessages: { sender: Localized }[];
  guest: {
    checkOutDate: string;
    checkOutTime: string;
    lateCheckOutTime: string;
    hasLateCheckOut: boolean;
  };
  todayIso: string;
};

export function getHomeNotice({
  unreadMessages,
  guest,
  todayIso,
}: HomeNoticeInput): HomeNotice | null {
  if (unreadMessages.length > 1) {
    return { kind: 'messages', textKey: 'notice.manyMessages', count: unreadMessages.length };
  }
  const [unreadMessage] = unreadMessages;
  if (unreadMessage) {
    return { kind: 'messages', textKey: 'notice.oneMessage', sender: unreadMessage.sender };
  }
  if (guest.checkOutDate === todayIso) {
    return guest.hasLateCheckOut
      ? { kind: 'checkOut', textKey: 'notice.lateCheckOutConfirmed', time: guest.lateCheckOutTime }
      : { kind: 'checkOut', textKey: 'notice.checkOutToday', time: guest.checkOutTime };
  }
  return null;
}
