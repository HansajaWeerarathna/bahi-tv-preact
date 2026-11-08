import { t } from '@/shared/i18n';
import type { Guest } from '../types';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
type GreetingGuest = Pick<Guest, 'title' | 'firstName' | 'lastName' | 'roomNumber'>;

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

export function buildGreetingOptions(guest: GreetingGuest, hour: number) {
  if (!guest.firstName && !guest.lastName) {
    return [t('greeting.welcomeRoom', { number: guest.roomNumber })];
  }

  const title = guest.title ? t(`guestTitle.${guest.title}`) : '';
  const fullName = [title, guest.firstName, guest.lastName].filter(Boolean).join(' ');
  const shortName = [title, guest.lastName || guest.firstName].filter(Boolean).join(' ');
  const salutation = t(`greeting.${getTimeOfDay(hour)}`);

  const options = [
    t('greeting.line', { salutation, name: fullName }),
    t('greeting.line', { salutation, name: shortName }),
    shortName,
  ];
  return [...new Set(options)];
}

export function getGreetingSubline(guest: Pick<Guest, 'occasion'>) {
  return guest.occasion ? t(`greeting.occasion.${guest.occasion}`) : t('greeting.subline');
}
