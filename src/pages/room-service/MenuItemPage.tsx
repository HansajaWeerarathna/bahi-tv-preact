import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { guest } from '@/entities/guest';
import { MENU_ITEMS } from '@/entities/menu';
import type { MenuItem } from '@/entities/menu';
import { addToOrder } from '@/features/order-food';
import { ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { clamp } from '@/shared/lib/clamp';
import {
  focusedId,
  setFocus,
  useFocusable,
  useInitialFocus,
  useRemoteKeyHandler,
} from '@/shared/remote-navigation';
import { ActionButton, NotFoundView, PageLayout, QuantityControl } from '@/shared/ui';
import { formatPrice } from './rows';
import { serviceFocusId, serviceTab } from './state';

const MAX_QTY = 9;
const QTY_ID = 'menu-qty';

type MenuItemViewProps = {
  item: MenuItem;
};

function MenuItemView({ item }: MenuItemViewProps) {
  const { route } = useLocation();
  const [qty, setQty] = useState(1);
  const roomNumber = guest.value.roomNumber;
  const minutes = t('roomService.minutes', { count: item.prepMinutes });
  const readyText =
    item.priceAed > 0
      ? t('roomService.itemReadyPaid', {
          time: minutes,
          price: formatPrice(item.priceAed),
          room: roomNumber,
        })
      : t('roomService.itemReadyFree', { time: minutes });

  const qtyControl = useFocusable<HTMLDivElement>({ id: QTY_ID, group: 'page-actions' });
  const add = useFocusable({
    id: 'menu-add',
    group: 'page-actions',
    onSelect: () => {
      addToOrder(item, qty);
      serviceTab.value = 0;
      serviceFocusId.value = 'rs-row-0';
      route(ROUTES.roomService);
    },
  });
  const cancel = useFocusable({
    id: 'menu-cancel',
    group: 'page-actions',
    onSelect: () => history.back(),
  });
  useInitialFocus(QTY_ID);

  useRemoteKeyHandler((action) => {
    if (focusedId.value !== QTY_ID) return false;
    if (action === 'left') setQty((value) => clamp(value - 1, 1, MAX_QTY));
    else if (action === 'right') setQty((value) => clamp(value + 1, 1, MAX_QTY));
    else if (action === 'down') setFocus('menu-add');
    else return false;
    return true;
  });

  return (
    <PageLayout title={pickText(item.name)}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        <p class="text-body leading-[1.48] text-cream-muted">{readyText}</p>
        <div class="mt-6">
          <QuantityControl
            focusProps={qtyControl.focusProps}
            label={t('roomService.quantity')}
            value={qty}
            total={formatPrice(item.priceAed * qty)}
          />
        </div>
        <p class="mt-6 text-caption leading-[normal] text-cream-subtle">
          {t('roomService.quantityHint')}
        </p>
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={add.focusProps}
            labelKey="roomService.addToOrder"
            variant="outline"
          />
          <ActionButton
            focusProps={cancel.focusProps}
            labelKey="roomService.cancel"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}

type MenuItemPageProps = {
  itemId?: string;
};

export function MenuItemPage({ itemId }: MenuItemPageProps) {
  const item = MENU_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return <NotFoundView />;
  return <MenuItemView item={item} />;
}
