import type { Localized } from '@/shared/i18n';

export type DiningVenue = { name: Localized; timing: Localized; price: Localized };
export type Amenity = { name: Localized; hours: Localized };

export const DINING_VENUES: readonly DiningVenue[] = [
  {
    name: { en: 'Arabesque Restaurant', ar: 'مطعم أرابيسك' },
    timing: {
      en: 'Breakfast, brunch, lunch & dinner · hours at front desk',
      ar: 'فطور وبرانش وغداء وعشاء · الساعات عند الاستقبال',
    },
    price: { en: 'International buffet', ar: 'بوفيه عالمي' },
  },
  {
    name: { en: 'Lobby Cafe', ar: 'مقهى الردهة' },
    timing: { en: 'Hours at front desk', ar: 'الساعات عند الاستقبال' },
    price: { en: 'Snacks & drinks', ar: 'وجبات خفيفة ومشروبات' },
  },
];

export const AMENITIES: readonly Amenity[] = [
  { name: { en: 'Spa', ar: 'السبا' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Fitness centre', ar: 'مركز اللياقة' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Swimming pool', ar: 'حمام السباحة' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Sauna & steam', ar: 'الساونا والبخار' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Kids club', ar: 'نادي الأطفال' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Business centre', ar: 'مركز الأعمال' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Beach access', ar: 'الوصول إلى الشاطئ' }, hours: { en: 'Daily', ar: 'يومياً' } },
  { name: { en: 'Library lounge', ar: 'صالة المكتبة' }, hours: { en: 'Daily', ar: 'يومياً' } },
];
