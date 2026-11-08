import { signal } from '@preact/signals';

export const DEFAULT_GUEST = {
  title: 'mr',
  firstName: '',
  lastName: 'Silva',
  roomNumber: '412',
  occasion: '',
  checkOutDate: '2026-11-05',
  checkOutTime: '12:00 PM',
  lateCheckOutTime: '2:00 PM',
  hasLateCheckOut: false,
};

export const guest = signal(DEFAULT_GUEST);
