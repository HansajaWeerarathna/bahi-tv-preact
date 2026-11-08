import type { MenuItem } from './types';

export const MENU_ITEMS: readonly MenuItem[] = [
  {
    id: 'rs-1',
    name: { en: 'Sourdough bread and butter', ar: 'خبز العجين المخمر مع الزبدة' },
    prepMinutes: 20,
    priceAed: 25,
  },
  {
    id: 'rs-2',
    name: { en: 'Grilled sea bass, saffron broth', ar: 'قاروص مشوي بمرق الزعفران' },
    prepMinutes: 30,
    priceAed: 95,
  },
  {
    id: 'rs-3',
    name: { en: 'Mushroom risotto', ar: 'ريزوتو الفطر' },
    prepMinutes: 25,
    priceAed: 75,
  },
  {
    id: 'rs-4',
    name: { en: 'Chamomile tea', ar: 'شاي البابونج' },
    prepMinutes: 15,
    priceAed: 0,
  },
];
