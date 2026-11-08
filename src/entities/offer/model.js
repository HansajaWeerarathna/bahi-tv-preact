import { signal } from '@preact/signals';

export const OFFERS = [
  {
    id: 'offer-high-tea',
    title: { en: 'Afternoon tea', ar: 'شاي العصر' },
    category: { en: 'Dining', ar: 'مطاعم' },
    tagline: {
      en: 'Sandwiches, scones and pastries with a pot of tea',
      ar: 'شطائر وكعك وحلويات مع إبريق شاي',
    },
    description: {
      en: 'Finger sandwiches, scones with clotted cream and pastries from our kitchen, served with your choice of tea.',
      ar: 'شطائر صغيرة وكعك مع القشطة وحلويات من مطبخنا، مع الشاي الذي تختاره.',
    },
    timing: { en: 'Daily, 3:30 to 6:00 PM', ar: 'يومياً، من 3:30 إلى 6:00 مساءً' },
    location: { en: 'Lobby Cafe', ar: 'مقهى الردهة' },
    price: { en: 'AED 185 per guest', ar: 'د.إ 185 للضيف' },
  },
  {
    id: 'offer-excavation',
    title: { en: 'Heritage site tour', ar: 'جولة في المواقع الأثرية' },
    category: { en: 'Culture', ar: 'ثقافة' },
    tagline: {
      en: 'A guided morning at Bronze Age tombs near Ajman',
      ar: 'صباح مع مرشد عند مقابر العصر البرونزي قرب عجمان',
    },
    description: {
      en: 'A guide takes you to excavated stone tombs about 4,000 years old. Transport from the hotel is included.',
      ar: 'يرافقك مرشد إلى مقابر حجرية يعود عمرها إلى نحو 4000 عام. يشمل السعر المواصلات من الفندق.',
    },
    timing: { en: 'Tuesday and Friday, 8:30 AM', ar: 'الثلاثاء والجمعة، 8:30 صباحاً' },
    location: { en: 'Leaves from the main entrance', ar: 'تنطلق من المدخل الرئيسي' },
    price: { en: 'AED 320 per guest', ar: 'د.إ 320 للضيف' },
  },
  {
    id: 'offer-boat-rides',
    title: { en: 'Sunset boat trip', ar: 'رحلة بحرية عند الغروب' },
    category: { en: 'On the water', ar: 'في البحر' },
    tagline: {
      en: 'Up to four guests, soft drinks on board',
      ar: 'حتى أربعة ضيوف، مع مشروبات خفيفة',
    },
    description: {
      en: 'A private boat for up to four guests along the Ajman coast at sunset. Soft drinks and snacks are included.',
      ar: 'قارب خاص لحتى أربعة ضيوف على طول ساحل عجمان عند الغروب. تشمل الرحلة مشروبات خفيفة ووجبات صغيرة.',
    },
    timing: { en: 'Daily, 4:45 to 6:30 PM', ar: 'يومياً، من 4:45 إلى 6:30 مساءً' },
    location: { en: 'Hotel beach', ar: 'شاطئ الفندق' },
    price: { en: 'AED 750 per boat', ar: 'د.إ 750 للقارب' },
  },
  {
    id: 'offer-activities',
    title: { en: 'Daily activities', ar: 'الأنشطة اليومية' },
    category: { en: 'Wellness', ar: 'عافية' },
    tagline: {
      en: 'Beach yoga, paddleboarding and stargazing',
      ar: 'يوغا على الشاطئ وتجديف ومراقبة النجوم',
    },
    description: {
      en: 'Yoga on the beach in the morning, paddleboarding late morning and stargazing after dark. Free for hotel guests.',
      ar: 'يوغا على الشاطئ صباحاً، وتجديف قبل الظهر، ومراقبة النجوم بعد الغروب. مجانية لنزلاء الفندق.',
    },
    timing: { en: 'Daily, 7:00 AM to 8:00 PM', ar: 'يومياً، من 7:00 صباحاً إلى 8:00 مساءً' },
    location: { en: 'Hotel beach', ar: 'شاطئ الفندق' },
    price: { en: 'Free for hotel guests', ar: 'مجانية لنزلاء الفندق' },
  },
];

export const offers = signal(OFFERS);
