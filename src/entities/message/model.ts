import { computed, signal } from '@preact/signals';
import type { Message } from './types';

export const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'welcome',
    sender: { en: 'Front desk', ar: 'الاستقبال' },
    time: '7:15 PM',
    isUnread: false,
    subject: { en: 'Welcome to Bahi Ajman Palace', ar: 'مرحباً بك في قصر باهي عجمان' },
    body: {
      en: 'If you need anything during your stay, press 9 on the bedside phone. We are here day and night.',
      ar: 'إذا احتجت أي شيء خلال إقامتك، اضغط 9 على هاتف الغرفة. نحن هنا ليلاً ونهاراً.',
    },
  },
  {
    id: 'pool-hours',
    sender: { en: 'Spa', ar: 'السبا' },
    time: '4:30 PM',
    isUnread: false,
    subject: { en: 'Pool open late tonight', ar: 'المسبح مفتوح حتى وقت متأخر الليلة' },
    body: {
      en: 'The outdoor pool and sauna are open until 10:30 PM tonight.',
      ar: 'المسبح الخارجي والساونا مفتوحان حتى الساعة 10:30 مساءً الليلة.',
    },
  },
];

export const messages = signal<Message[]>(DEFAULT_MESSAGES);
export const unreadMessages = computed(() => messages.value.filter((message) => message.isUnread));

export function markAsRead(id: string) {
  messages.value = messages.value.map((message) =>
    message.id === id ? { ...message, isUnread: false } : message,
  );
}

export function addMessage(message: Message): void {
  messages.value = [message, ...messages.value];
}
