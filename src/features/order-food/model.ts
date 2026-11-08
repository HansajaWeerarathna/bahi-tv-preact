import { computed, signal } from '@preact/signals';
import type { MenuItem } from '@/entities/menu';

export type OrderLine = {
  item: MenuItem;
  qty: number;
};

export type PlacedOrder = {
  lines: readonly OrderLine[];
  total: number;
  etaMin: number;
};

const MAX_QTY = 9;
const PREP_BUFFER_MIN = 10;
const DELIVERY_EXTRA_MIN = [0, 30, 60] as const;

export const DELIVERY_COUNT = DELIVERY_EXTRA_MIN.length;
export const orderLines = signal<readonly OrderLine[]>([]);
export const deliveryIndex = signal(0);
export const lastOrder = signal<PlacedOrder | null>(null);

export const orderItemCount = computed(() =>
  orderLines.value.reduce((sum, line) => sum + line.qty, 0),
);
export const orderTotal = computed(() =>
  orderLines.value.reduce((sum, line) => sum + line.qty * line.item.priceAed, 0),
);

export function addToOrder(item: MenuItem, qty: number): void {
  const exists = orderLines.value.some((line) => line.item.id === item.id);
  orderLines.value = exists
    ? orderLines.value.map((line) =>
        line.item.id === item.id ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) } : line,
      )
    : [...orderLines.value, { item, qty }];
}

export function cycleDelivery(): void {
  deliveryIndex.value = (deliveryIndex.value + 1) % DELIVERY_COUNT;
}

export function clearOrder(): void {
  orderLines.value = [];
  deliveryIndex.value = 0;
}

export function placeOrder(): PlacedOrder {
  const prepMin = Math.max(...orderLines.value.map((line) => line.item.prepMinutes));
  const etaMin = Math.max(prepMin + PREP_BUFFER_MIN, DELIVERY_EXTRA_MIN[deliveryIndex.value] ?? 0);
  const placed = { lines: orderLines.value, total: orderTotal.value, etaMin };
  lastOrder.value = placed;
  clearOrder();
  return placed;
}
