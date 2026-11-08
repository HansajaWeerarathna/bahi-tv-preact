import { signal } from '@preact/signals';
import type { Guest } from './types';

export const DEFAULT_GUEST: Guest = {
  title: 'mr',
  firstName: '',
  lastName: 'Silva',
  roomNumber: '412',
  occasion: '',
  checkInDate: '2026-11-01',
  checkInTime: '3:00 PM',
  checkOutDate: '2026-11-05',
  checkOutTime: '12:00 PM',
  lateCheckOutTime: '2:00 PM',
  hasLateCheckOut: false,
};

export const guest = signal<Guest>(DEFAULT_GUEST);
