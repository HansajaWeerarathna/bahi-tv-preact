import type { GuestRequest } from './types';

export const GUEST_REQUESTS: readonly GuestRequest[] = [
  {
    id: 'rq-towels',
    title: { en: 'Extra towels', ar: 'مناشف إضافية' },
    detail: { en: 'Bath and hand towels', ar: 'مناشف حمام ومناشف أيدٍ' },
    maxQty: 4,
    etaMin: 15,
  },
  {
    id: 'rq-pillows',
    title: { en: 'Extra pillows', ar: 'وسائد إضافية' },
    detail: { en: 'Soft, firm or hypoallergenic', ar: 'ناعمة أو متوسطة أو مضادة للحساسية' },
    maxQty: 4,
    etaMin: 15,
  },
  {
    id: 'rq-toiletries',
    title: { en: 'Toiletries', ar: 'أدوات العناية الشخصية' },
    detail: {
      en: 'Toothbrush, razor, shower cap and more',
      ar: 'فرشاة أسنان وشفرة وغطاء استحمام وغيرها',
    },
    maxQty: 1,
    etaMin: 15,
  },
  {
    id: 'rq-turndown',
    title: { en: 'Turn-down service', ar: 'خدمة تجهيز السرير' },
    detail: { en: 'Bed prepared for the night', ar: 'سرير مُعد لليلة' },
    maxQty: 1,
    etaMin: 30,
  },
  {
    id: 'rq-makeup',
    title: { en: 'Clean my room', ar: 'تنظيف غرفتي' },
    detail: { en: 'Full housekeeping visit', ar: 'زيارة تنظيف كاملة' },
    maxQty: 1,
    etaMin: 45,
  },
  {
    id: 'rq-iron',
    title: { en: 'Iron and ironing board', ar: 'مكواة ولوح كي' },
    detail: { en: 'Delivered to your room', ar: 'تُسلَّم إلى غرفتك' },
    maxQty: 1,
    etaMin: 20,
  },
  {
    id: 'rq-pharmacy',
    title: { en: 'Pharmacy items', ar: 'أدوية الصيدلية' },
    detail: { en: 'First aid, pain relief, dental kit', ar: 'إسعافات أولية ومسكنات وطقم أسنان' },
    maxQty: 1,
    etaMin: 20,
  },
  {
    id: 'rq-adapter',
    title: { en: 'Plug adapter', ar: 'محوّل كهرباء' },
    detail: { en: 'UK, EU and US plugs', ar: 'مقابس بريطانية وأوروبية وأمريكية' },
    maxQty: 2,
    etaMin: 15,
  },
];
