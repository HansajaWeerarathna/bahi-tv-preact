import { describe, expect, it } from 'vitest';
import { getHomeNotice } from './get-home-notice';

const SENDER = { en: 'Spa', ar: 'السبا' };
const UNREAD = { sender: SENDER };
const GUEST = {
  checkOutDate: '2026-11-05',
  checkOutTime: '12:00 PM',
  lateCheckOutTime: '2:00 PM',
  hasLateCheckOut: false,
};
const TODAY = '2026-11-05';

describe('getHomeNotice', () => {
  it('shows the sender of a single unread message', () => {
    expect(getHomeNotice({ unreadMessages: [UNREAD], guest: GUEST, todayIso: TODAY })).toEqual({
      kind: 'messages',
      textKey: 'notice.oneMessage',
      sender: SENDER,
    });
  });

  it('counts several unread messages', () => {
    const unreadMessages = [UNREAD, UNREAD];
    expect(getHomeNotice({ unreadMessages, guest: GUEST, todayIso: TODAY })).toEqual({
      kind: 'messages',
      textKey: 'notice.manyMessages',
      count: 2,
    });
  });

  it('prefers unread messages over the check-out reminder', () => {
    const notice = getHomeNotice({ unreadMessages: [UNREAD], guest: GUEST, todayIso: TODAY });
    expect(notice?.kind).toBe('messages');
  });

  it('reminds the guest on the check-out day', () => {
    expect(getHomeNotice({ unreadMessages: [], guest: GUEST, todayIso: TODAY })).toEqual({
      kind: 'checkOut',
      textKey: 'notice.checkOutToday',
      time: '12:00 PM',
    });
  });

  it('confirms a late check-out on the check-out day', () => {
    const guest = { ...GUEST, hasLateCheckOut: true };
    expect(getHomeNotice({ unreadMessages: [], guest, todayIso: TODAY })).toEqual({
      kind: 'checkOut',
      textKey: 'notice.lateCheckOutConfirmed',
      time: '2:00 PM',
    });
  });

  it('shows nothing on other days without messages', () => {
    expect(getHomeNotice({ unreadMessages: [], guest: GUEST, todayIso: '2026-11-04' })).toBeNull();
  });
});
