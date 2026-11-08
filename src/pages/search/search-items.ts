import { GUEST_REQUESTS } from '@/entities/guest-request';
import { MENU_ITEMS } from '@/entities/menu';
import { OFFERS } from '@/entities/offer';
import { ROUTES } from '@/shared/config';
import { tIn, type Localized, type TranslationKey } from '@/shared/i18n';

export type SearchItem = {
  id: string;
  title: Localized;
  sub: Localized | null;
  // Extra English words a guest might type, matched like the titles.
  keywords: string;
  path: string;
};

export const SEARCH_RESULT_LIMIT = 6;

function both(key: TranslationKey): Localized {
  return { en: tIn('en', key), ar: tIn('ar', key) };
}

function page(
  id: string,
  titleKey: TranslationKey,
  path: string,
  keywords: string,
  subKey: TranslationKey | null = null,
): SearchItem {
  return {
    id,
    title: both(titleKey),
    sub: subKey ? both(subKey) : null,
    keywords,
    path,
  };
}

// Pages and tiles. Titles are the names used on the home screen, so each place has one name.
const PAGE_ITEMS: readonly SearchItem[] = [
  page('tv', 'tiles.tv', ROUTES.tv, 'television channels movies guide', 'tiles.tvHint'),
  page(
    'room-service',
    'tiles.roomService',
    ROUTES.roomService,
    'food dining drinks breakfast menu restaurant amenities spa pool gym requests housekeeping towels pillows toiletries turn-down cleaning iron pharmacy adapter',
    'tiles.roomServiceHint',
  ),
  page(
    'things-to-do',
    'tiles.thingsToDo',
    ROUTES.thingsToDo,
    'offers activities experiences booking tour boat tea',
    'thingsToDoPage.subtitle',
  ),
  page('messages', 'messages.title', ROUTES.messages, 'inbox notifications'),
  page('wifi', 'wifiPage.title', ROUTES.wifi, 'wifi internet password network qr'),
  page('front-desk', 'frontDesk.title', ROUTES.frontDesk, 'reception contact call help'),
  page('check-out', 'checkOut.title', ROUTES.checkOut, 'bill invoice leave departure late'),
  page('stay', 'stayPage.title', ROUTES.stay, 'booking reservation room'),
  page('weather', 'weatherPage.title', ROUTES.weather, 'weather forecast temperature'),
  page('help', 'remoteHelp.title', ROUTES.remoteHelp, 'help faq support assistance remote'),
  page(
    'emergency',
    'emergency.title',
    ROUTES.emergency,
    'fire medical safety sos police ambulance',
  ),
  page('settings', 'settingsPage.title', ROUTES.settings, 'preferences language brightness'),
  page('cast', 'castPage.title', ROUTES.cast, 'screen mirror phone'),
  page('alarms', 'alarmsPage.title', ROUTES.alarms, 'wake clock reminder'),
  page(
    'room-controls',
    'roomControlsPage.title',
    ROUTES.roomControls,
    'lights curtains temperature do not disturb',
  ),
];

// Extra words guests might type for each request.
const REQUEST_KEYWORDS: Readonly<Record<string, string>> = {
  'rq-towels': 'towel bath',
  'rq-pillows': 'pillow',
  'rq-toiletries': 'toothbrush razor shampoo soap dental',
  'rq-turndown': 'turndown bed night',
  'rq-makeup': 'housekeeping clean cleaning tidy make up room',
  'rq-iron': 'iron ironing',
  'rq-pharmacy': 'medicine first aid plaster painkiller',
  'rq-adapter': 'plug adapter charger socket',
};

function priceText(priceAed: number, lang: 'en' | 'ar'): string {
  return priceAed > 0 ? `AED ${priceAed}` : tIn(lang, 'roomService.complimentary');
}

// Dishes, requests and offers: each opens its own page.
const ITEM_ENTRIES: readonly SearchItem[] = [
  ...GUEST_REQUESTS.map((request) => ({
    id: `request-${request.id}`,
    title: request.title,
    sub: request.detail,
    keywords: `request housekeeping ${REQUEST_KEYWORDS[request.id] ?? ''}`,
    path: ROUTES.roomServiceRequest.replace(':requestId', request.id),
  })),
  ...MENU_ITEMS.map((item) => ({
    id: `menu-${item.id}`,
    title: item.name,
    sub: {
      en: `Room service, ${priceText(item.priceAed, 'en')}`,
      ar: `خدمة الغرف، ${priceText(item.priceAed, 'ar')}`,
    },
    keywords: 'room service food order eat',
    path: ROUTES.roomServiceItem.replace(':itemId', item.id),
  })),
  ...OFFERS.map((offer) => ({
    id: `offer-${offer.id}`,
    title: offer.title,
    sub: offer.tagline,
    keywords: `offers activities ${offer.category.en}`,
    path: ROUTES.offer.replace(':offerId', offer.id),
  })),
];

const ALL_ITEMS: readonly SearchItem[] = [...ITEM_ENTRIES, ...PAGE_ITEMS];

function haystack(item: SearchItem): string {
  return [item.title.en, item.title.ar, item.sub?.en ?? '', item.sub?.ar ?? '', item.keywords]
    .join(' ')
    .toLowerCase();
}

// Empty query: the first pages, as "Popular". Otherwise every match, specific items first.
export function findSearchItems(query: string, limit = SEARCH_RESULT_LIMIT): SearchItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return PAGE_ITEMS.slice(0, limit);
  return ALL_ITEMS.filter((item) => haystack(item).includes(needle)).slice(0, limit);
}
