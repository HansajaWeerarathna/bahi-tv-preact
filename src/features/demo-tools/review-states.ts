import { simulatedTime } from '@/entities/clock';
import { resetAlarms } from '@/entities/alarm';
import { DEFAULT_GUEST, guest, resetGuestData } from '@/entities/guest';
import { systemState } from '@/entities/session';
import { DEFAULT_MESSAGES, messages, type Message } from '@/entities/message';
import { highContrast, largerText } from '@/entities/preferences';
import { DEFAULT_WEATHER, weather } from '@/entities/weather';
import { language } from '@/shared/i18n';
import { resetDemoState, timeOn } from './demo-actions';

export type ReviewState = {
  number: number;
  label: string;
  apply: () => void;
};

const SAMPLE_DATE = '2026-11-03';
const CHECK_OUT_DATE = '2026-11-05';

const AIRPORT_CAR_MESSAGE: Message = {
  id: 'airport-car',
  sender: { en: 'Front desk', ar: 'الاستقبال' },
  time: '8:12 PM',
  isUnread: true,
  subject: {
    en: 'Airport car confirmed for tomorrow',
    ar: 'تم تأكيد سيارة المطار لغد',
  },
  body: {
    en: 'The private car to the international terminal is confirmed. Dial Ext. 9 for luggage help.',
    ar: 'تم تأكيد السيارة الخاصة إلى المطار الدولي. اتصل بالتحويلة 9 للمساعدة في الأمتعة.',
  },
};

// Zero guest data: what the room looks like with no guest in it.
function clearGuestData(): void {
  resetGuestData();
  messages.value = [];
  resetAlarms();
}

const WELCOME_MESSAGES = DEFAULT_MESSAGES.filter((message) => message.id === 'welcome');

function setEvening(): void {
  simulatedTime.value = timeOn(SAMPLE_DATE, 20, 41);
}

export const REVIEW_STATES: readonly ReviewState[] = [
  {
    number: 1,
    label: 'Default evening',
    apply: () => {
      simulatedTime.value = timeOn(SAMPLE_DATE, 20, 41);
    },
  },
  {
    number: 2,
    label: 'Morning greeting',
    apply: () => {
      simulatedTime.value = timeOn(SAMPLE_DATE, 8, 0);
    },
  },
  {
    number: 3,
    label: 'Afternoon, anniversary',
    apply: () => {
      simulatedTime.value = timeOn(SAMPLE_DATE, 14, 0);
      guest.value = {
        ...DEFAULT_GUEST,
        title: 'dr',
        firstName: 'Nadia',
        lastName: 'Perera',
        occasion: 'anniversary',
      };
    },
  },
  {
    number: 4,
    label: 'Unread messages',
    apply: () => {
      setEvening();
      messages.value = [AIRPORT_CAR_MESSAGE, ...WELCOME_MESSAGES];
    },
  },
  {
    number: 5,
    label: 'Check-out day',
    apply: () => {
      simulatedTime.value = timeOn(CHECK_OUT_DATE, 9, 0);
      guest.value = {
        ...DEFAULT_GUEST,
        title: 'ms',
        lastName: 'Fernando',
        checkOutDate: CHECK_OUT_DATE,
        checkOutTime: '11:00 AM',
      };
    },
  },
  {
    number: 6,
    label: 'Weather unavailable',
    apply: () => {
      setEvening();
      weather.value = { ...DEFAULT_WEATHER, isAvailable: false };
    },
  },
  {
    number: 7,
    label: 'Start-up loading',
    apply: () => {
      clearGuestData();
      systemState.value = 'loading';
    },
  },
  {
    number: 8,
    label: 'Between guests',
    apply: () => {
      clearGuestData();
      systemState.value = 'reset';
    },
  },
  {
    number: 9,
    label: 'High contrast',
    apply: () => {
      setEvening();
      highContrast.value = true;
    },
  },
  {
    number: 10,
    label: 'Larger text',
    apply: () => {
      setEvening();
      largerText.value = true;
    },
  },
  {
    number: 11,
    label: 'Arabic',
    apply: () => {
      setEvening();
      language.value = 'ar';
      guest.value = { ...DEFAULT_GUEST, title: 'mr', firstName: 'أحمد', lastName: 'الشامسي' };
    },
  },
];

export function applyReviewState(state: ReviewState): void {
  resetDemoState();
  state.apply();
}
