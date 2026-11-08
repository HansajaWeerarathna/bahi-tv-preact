import { signal } from '@preact/signals';
import type { Channel } from './types';

export const CHANNELS: readonly Channel[] = [
  {
    number: '01',
    name: 'Bahi Palace Cinema HD',
    category: { en: 'Feature Films', ar: 'أفلام' },
    now: { en: 'Midnight in Riviera', ar: 'منتصف الليل على الريفييرا' },
    next: { en: 'The Long Coast', ar: 'الساحل الطويل' },
  },
  {
    number: '02',
    name: 'World News Live',
    category: { en: 'International News', ar: 'أخبار دولية' },
    now: { en: 'Evening Global Briefing', ar: 'موجز عالمي مسائي' },
    next: { en: 'Business Today', ar: 'اقتصاد اليوم' },
  },
  {
    number: '03',
    name: 'Premier Sports 1',
    category: { en: 'Live Sports', ar: 'رياضة مباشرة' },
    now: { en: 'Continental Tennis Masters', ar: 'بطولة التنس القارية' },
    next: { en: 'Football Highlights', ar: 'ملخص كرة القدم' },
  },
  {
    number: '04',
    name: 'Nature & Earth 4K',
    category: { en: 'Documentary', ar: 'وثائقي' },
    now: { en: 'Coastal Sanctuaries of the Indian Ocean', ar: 'محميات ساحلية في المحيط الهندي' },
    next: { en: 'Desert Nights', ar: 'ليالي الصحراء' },
  },
  {
    number: '05',
    name: 'YouTube Lounge',
    category: { en: 'Streaming App', ar: 'تطبيق بث' },
    now: {
      en: 'Sign in with your account; it is removed at check-out',
      ar: 'سجّل الدخول بحسابك؛ يُحذف عند المغادرة',
    },
    isApp: true,
  },
];

export const watchingIndex = signal(0);
