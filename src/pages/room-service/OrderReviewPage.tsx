import { useLocation } from 'preact-iso';
import { hotelTime } from '@/entities/clock';
import { guest } from '@/entities/guest';
import { addMessage } from '@/entities/message';
import { use12Hour } from '@/entities/preferences';
import {
  clearOrder,
  cycleDelivery,
  deliveryIndex,
  orderLines,
  orderTotal,
  placeOrder,
} from '@/features/order-food';
import { ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { formatClockTime } from '@/shared/lib/time';
import {
  focusedId,
  setFocus,
  useFocusable,
  useInitialFocus,
  useRemoteKeyHandler,
} from '@/shared/remote-navigation';
import { ActionButton, PageLayout } from '@/shared/ui';
import { buildOrderMessage } from './messages';
import { formatPrice } from './rows';
import { serviceFocusId, serviceTab } from './state';

const DELIVERY_LABELS = [
  'roomService.deliveryNow',
  'roomService.deliveryIn30',
  'roomService.deliveryIn60',
] as const;
const DELIVERY_FOCUS_ID = 'review-delivery';

export function OrderReviewPage() {
  const { route } = useLocation();
  const room = guest.value.roomNumber;
  const total = orderTotal.value;
  const deliveryLabel = DELIVERY_LABELS[deliveryIndex.value] ?? DELIVERY_LABELS[0];

  const delivery = useFocusable<HTMLButtonElement>({
    id: DELIVERY_FOCUS_ID,
    group: 'page-actions',
    onSelect: cycleDelivery,
  });
  const place = useFocusable({
    id: 'review-place',
    group: 'page-actions',
    onSelect: () => {
      // An empty cart (for example after Back from the done screen) cannot be placed.
      if (orderLines.value.length === 0) return;
      const time = formatClockTime(hotelTime.value, { language: 'en', use12Hour: use12Hour.value });
      const placed = placeOrder();
      addMessage(buildOrderMessage(placed, room, time));
      // Replace the review in history, so Back from the done screen never returns to it.
      route(ROUTES.roomServiceOrderDone, true);
    },
  });
  const clear = useFocusable({
    id: 'review-clear',
    group: 'page-actions',
    onSelect: () => {
      clearOrder();
      serviceTab.value = 0;
      serviceFocusId.value = 'rs-row-0';
      route(ROUTES.roomService);
    },
  });
  useInitialFocus(DELIVERY_FOCUS_ID);
  useRemoteKeyHandler((action) => {
    if (focusedId.value !== DELIVERY_FOCUS_ID || action !== 'down') return false;
    setFocus('review-place');
    return true;
  });

  return (
    <PageLayout title={t('roomService.orderReviewTitle')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        {orderLines.value.map((line) => (
          <div
            key={line.item.id}
            class="flex items-center gap-6 px-6 py-4 text-body leading-[normal] font-semibold"
          >
            <span class="font-normal text-cream-muted tabular-nums">{line.qty} ×</span>
            <span class="flex-1 font-normal">{pickText(line.item.name)}</span>
            <span>{formatPrice(line.qty * line.item.priceAed)}</span>
          </div>
        ))}
        <div class="mt-6 flex flex-col gap-[18px]">
          <button
            type="button"
            {...delivery.focusProps}
            class="tv-focus flex items-center justify-between gap-6 rounded-sm px-6 py-5 text-start"
          >
            <span class="flex flex-col gap-[11px]">
              <span class="text-body leading-[normal] font-semibold">
                {t('roomService.deliveryTime')}
              </span>
              <span class="text-caption leading-[1.35] text-cream-muted">
                {t('roomService.deliveryHint')}
              </span>
            </span>
            <span class="text-body leading-[normal] font-semibold text-cream-muted">
              {t(deliveryLabel)}
            </span>
          </button>
          <div class="flex items-center justify-between gap-6 px-6 py-4 text-body leading-[normal] font-semibold">
            <span>{t('roomService.total', { room })}</span>
            <span>{total > 0 ? formatPrice(total) : t('roomService.totalFree')}</span>
          </div>
        </div>
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={place.focusProps}
            labelKey="roomService.placeOrder"
            variant="outline"
          />
          <ActionButton
            focusProps={clear.focusProps}
            labelKey="roomService.clearOrder"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}
