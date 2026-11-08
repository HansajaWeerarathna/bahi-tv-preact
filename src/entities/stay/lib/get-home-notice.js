export function getHomeNotice({ unreadMessages, guest, todayIso }) {
  if (unreadMessages.length === 1) {
    return { kind: 'messages', textKey: 'notice.oneMessage', sender: unreadMessages[0].sender };
  }
  if (unreadMessages.length > 1) {
    return { kind: 'messages', textKey: 'notice.manyMessages', count: unreadMessages.length };
  }
  if (guest.checkOutDate === todayIso) {
    return guest.hasLateCheckOut
      ? { kind: 'checkOut', textKey: 'notice.lateCheckOutConfirmed', time: guest.lateCheckOutTime }
      : { kind: 'checkOut', textKey: 'notice.checkOutToday', time: guest.checkOutTime };
  }
  return null;
}
