import { signal } from '@preact/signals';
import { hotelTime, simulatedTime } from '@/entities/clock';
import { DEFAULT_GUEST, guest } from '@/entities/guest';
import { DEFAULT_MESSAGES, messages, type Message } from '@/entities/message';
import { offerLayout, spotlightIndex, toggleOfferLayout } from '@/entities/offer';
import { highContrast, largerText, use12Hour } from '@/entities/preferences';
import { DEFAULT_WEATHER, weather } from '@/entities/weather';
import { language } from '@/shared/i18n';
import type { TimeParts } from '@/shared/lib/time';
import { showToast } from '@/shared/ui';

export const checkOutDayOn = signal(false);
export const legendOpen = signal(false);
export const reviewStatesOpen = signal(false);

let timeBeforeCheckOut: TimeParts | null = null;

export function timeOn(isoDate: string, hour: number, minute: number): TimeParts {
  const [year = 0, month = 1, day = 1] = isoDate.split('-').map(Number);
  return { year, month, day, hour, minute };
}

export function getNewMessageToggle(list: readonly Message[]): {
  messages: Message[];
  toast: string;
} {
  if (list.some((message) => message.isUnread)) {
    return {
      messages: list.map((message) => ({ ...message, isUnread: false })),
      toast: 'Demo: messages read',
    };
  }
  return {
    messages: list.map((message, index) =>
      index === 0 ? { ...message, isUnread: true } : message,
    ),
    toast: 'Demo: new message',
  };
}

export function getCheckOutDayTime(current: TimeParts, checkOutDate: string): TimeParts {
  return timeOn(checkOutDate, current.hour, current.minute);
}

export function toggleNewMessage(): void {
  const next = getNewMessageToggle(messages.value);
  messages.value = next.messages;
  showToast(next.toast);
}

export function toggleCheckOutDay(): void {
  if (checkOutDayOn.value) {
    simulatedTime.value = timeBeforeCheckOut;
    timeBeforeCheckOut = null;
    checkOutDayOn.value = false;
    showToast('Demo: check-out day off');
    return;
  }

  timeBeforeCheckOut = simulatedTime.value;
  simulatedTime.value = getCheckOutDayTime(hotelTime.value, guest.value.checkOutDate);
  guest.value = { ...guest.value, hasLateCheckOut: false };
  messages.value = messages.value.map((message) => ({ ...message, isUnread: false }));
  checkOutDayOn.value = true;
  showToast('Demo: check-out day on');
}

export function toggleOffers(): void {
  toggleOfferLayout();
  showToast(
    offerLayout.value === 'count'
      ? 'Offers: count on the Things to do tile'
      : 'Offers: spotlight with photo background',
  );
}

export function toggleLegend(): void {
  legendOpen.value = !legendOpen.value;
}

export function toggleReviewStates(): void {
  reviewStatesOpen.value = !reviewStatesOpen.value;
}

export function resetDemoState(): void {
  guest.value = DEFAULT_GUEST;
  messages.value = DEFAULT_MESSAGES;
  weather.value = DEFAULT_WEATHER;
  highContrast.value = false;
  largerText.value = false;
  use12Hour.value = true;
  language.value = 'en';
  simulatedTime.value = null;
  offerLayout.value = 'count';
  spotlightIndex.value = 0;
  checkOutDayOn.value = false;
  timeBeforeCheckOut = null;
}
