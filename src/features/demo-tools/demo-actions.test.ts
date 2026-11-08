import { describe, expect, it } from 'vitest';
import type { Message } from '@/entities/message';
import { getCheckOutDayTime, getNewMessageToggle, timeOn } from './demo-actions';

const READ: Message = {
  id: 'welcome',
  sender: { en: 'Front desk', ar: 'الاستقبال' },
  time: '7:15 PM',
  isUnread: false,
  subject: { en: 'Welcome', ar: 'مرحباً' },
  body: { en: 'Welcome text', ar: 'نص الترحيب' },
};
const SPA: Message = { ...READ, id: 'pool-hours', isUnread: false };

describe('getNewMessageToggle', () => {
  it('makes the first message unread when none are unread', () => {
    const result = getNewMessageToggle([READ, SPA]);
    expect(result.messages.map((message) => message.isUnread)).toEqual([true, false]);
    expect(result.toast).toBe('Demo: new message');
  });

  it('marks every message read when some are unread', () => {
    const result = getNewMessageToggle([
      { ...READ, isUnread: true },
      { ...SPA, isUnread: true },
    ]);
    expect(result.messages.every((message) => !message.isUnread)).toBe(true);
    expect(result.toast).toBe('Demo: messages read');
  });
});

describe('getCheckOutDayTime', () => {
  it('moves the date to the check-out day and keeps the current time of day', () => {
    const current = timeOn('2026-11-03', 20, 41);
    expect(getCheckOutDayTime(current, '2026-11-05')).toEqual({
      year: 2026,
      month: 11,
      day: 5,
      hour: 20,
      minute: 41,
    });
  });
});
