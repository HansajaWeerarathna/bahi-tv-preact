import { useLocation } from 'preact-iso';
import { guest } from '@/entities/guest';
import { lastOrder } from '@/features/order-food';
import { HOTEL, ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, PageLayout } from '@/shared/ui';
import { formatPrice } from './rows';
import { serviceTab } from './state';

export function OrderDonePage() {
  const { route } = useLocation();
  const placed = lastOrder.value;
  const room = guest.value.roomNumber;
  const done = useFocusable({
    id: 'order-done',
    group: 'page-actions',
    onSelect: () => {
      serviceTab.value = 0;
      route(ROUTES.roomService);
    },
  });
  useInitialFocus('order-done');

  return (
    <PageLayout title={t('roomService.orderPlacedTitle')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        {placed && (
          <>
            <p class="text-title leading-[normal] font-medium">
              {t('roomService.orderArriving', { room, eta: placed.etaMin })}
            </p>
            <div class="mt-6 flex flex-col">
              {placed.lines.map((line) => (
                <div
                  key={line.item.id}
                  class="flex items-center gap-6 border-b border-line px-6 py-4 text-body leading-[normal]"
                >
                  <span class="text-cream-muted tabular-nums">{line.qty} ×</span>
                  <span>{pickText(line.item.name)}</span>
                </div>
              ))}
            </div>
            <p class="mt-6 text-body leading-[1.48] text-cream-muted">
              {placed.total > 0
                ? t('roomService.orderCharged', { price: formatPrice(placed.total) })
                : t('roomService.orderFree')}{' '}
              {t('roomService.orderFind', { extension: HOTEL.frontDeskExtension })}
            </p>
          </>
        )}
        <div class="mt-8 flex gap-6">
          <ActionButton focusProps={done.focusProps} labelKey="roomService.done" variant="gold" />
        </div>
      </div>
    </PageLayout>
  );
}
