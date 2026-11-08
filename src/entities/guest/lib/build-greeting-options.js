import { t } from '@/shared/i18n';

export function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

export function buildGreetingOptions(guest, hour) {
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

export function getGreetingSubline(guest) {
  return guest.occasion ? t(`greeting.occasion.${guest.occasion}`) : t('greeting.subline');
}
