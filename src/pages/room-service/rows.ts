import { AMENITIES, DINING_VENUES } from '@/entities/guest-service';
import { GUEST_REQUESTS } from '@/entities/guest-request';
import { MENU_ITEMS } from '@/entities/menu';
import { orderItemCount, orderTotal } from '@/features/order-food';
import { sentAt } from '@/features/request-housekeeping';
import { ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';

export type ServiceRow = {
  title: string;
  sub: string;
  right: string;
  path?: string;
};

export const ROOM_SERVICE_TAB_COUNT = 4;

export function formatPrice(aed: number): string {
  return aed > 0 ? `AED ${aed}` : t('roomService.complimentary');
}

function menuRows(): ServiceRow[] {
  const count = orderItemCount.value;
  const orderRows: ServiceRow[] =
    count > 0
      ? [
          {
            title: t('roomService.yourOrder'),
            sub: t('roomService.orderSummary', {
              count,
              noun: t(count === 1 ? 'roomService.item' : 'roomService.items'),
            }),
            right: formatPrice(orderTotal.value),
            path: ROUTES.roomServiceOrder,
          },
        ]
      : [];
  const itemRows = MENU_ITEMS.map((item) => ({
    title: pickText(item.name),
    sub: t('roomService.minutes', { count: item.prepMinutes }),
    right: formatPrice(item.priceAed),
    path: ROUTES.roomServiceItem.replace(':itemId', item.id),
  }));
  return [...orderRows, ...itemRows];
}

function requestRows(): ServiceRow[] {
  return GUEST_REQUESTS.map((request) => {
    const sentTime = sentAt.value[request.id];
    return {
      title: pickText(request.title),
      sub: pickText(request.detail),
      right: sentTime ? t('roomService.requestedAt', { time: sentTime }) : '',
      path: ROUTES.roomServiceRequest.replace(':requestId', request.id),
    };
  });
}

export function buildServiceRows(tab: number): ServiceRow[] {
  if (tab === 0) return menuRows();
  if (tab === 1) return requestRows();
  if (tab === 2) {
    return DINING_VENUES.map((venue) => ({
      title: pickText(venue.name),
      sub: pickText(venue.timing),
      right: pickText(venue.price),
    }));
  }
  return AMENITIES.map((amenity) => ({
    title: pickText(amenity.name),
    sub: pickText(amenity.hours),
    right: '',
  }));
}
