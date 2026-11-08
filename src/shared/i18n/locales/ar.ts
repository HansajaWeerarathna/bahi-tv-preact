import type { Dictionary } from '../types';

export const ar: Dictionary = {
  hotel: {
    name: 'فندق قصر باهي عجمان',
    footerName: 'فندق ومساكن قصر باهي عجمان',
  },
  header: {
    room: 'الغرفة {number}',
    weatherUnavailable: 'الطقس غير متاح',
    frontDesk: 'الاتصال بالاستقبال',
    settings: 'الإعدادات',
    search: 'بحث',
  },
  greeting: {
    morning: 'صباح الخير',
    afternoon: 'طاب يومك',
    evening: 'مساء الخير',
    night: 'ليلة سعيدة',
    line: '{salutation}، {name}',
    welcomeRoom: 'مرحباً بك في الغرفة {number}',
    subline: 'نتمنى لك إقامة سعيدة',
    occasion: {
      anniversary: 'ذكرى زواج سعيدة',
      birthday: 'عيد ميلاد سعيد',
    },
  },
  guestTitle: {
    mr: 'السيد',
    ms: 'السيدة',
    dr: 'الدكتور',
  },
  notice: {
    oneMessage: 'رسالة جديدة من {sender}',
    manyMessages: 'لديك {count} رسائل جديدة',
    checkOutToday: 'المغادرة اليوم الساعة {time}. يمكنك طلب مغادرة متأخرة.',
    lateCheckOutConfirmed: 'تم تأكيد المغادرة المتأخرة حتى الساعة {time} اليوم.',
    action: 'موافق',
  },
  tiles: {
    frontDesk: 'الاستقبال',
    frontDeskHint: 'تحويلة {extension}',
    tv: 'التلفاز',
    tvHint: 'القنوات والتطبيقات',
    roomService: 'خدمة الغرف',
    roomServiceHint: 'الطعام والطلبات',
    thingsToDo: 'أنشطة وتجارب',
    thingsToDoHint: '{count} عروض',
    messages: 'الرسائل',
    wifi: 'واي فاي',
    cast: 'البث',
    alarm: 'المنبه',
    stay: 'إقامتك',
    roomControls: 'التحكم بالغرفة',
  },
  hints: {
    navigate: 'تنقل',
    select: 'موافق للاختيار',
    back: 'رجوع',
  },
  system: {
    loading: 'نجهّز غرفتك',
    reset: 'نجهّز الغرفة للضيف التالي',
  },
  placeholder: {
    comingNext: 'هذه الصفحة قادمة قريباً.',
    backHome: 'العودة إلى الرئيسية',
  },
};
